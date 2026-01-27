import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

// Plan UUID mapping
const PLAN_UUID_MAP: Record<string, string> = {
  'monthly': '22d2d899-cee8-4d2f-9efe-b772ee52c491',
  '6month': '90fe86c2-edc3-45cc-a406-b0f0cb32aaa8',
  'annual': '0a9757d0-f722-41bb-95e4-6a0a3ae39a2c'
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  // Test endpoint
  if (req.method === 'GET') {
    return new Response(JSON.stringify({
      message: "Webhook endpoint is working!",
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  // Create Supabase client INSIDE the handler (not at top level)
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  try {
    const payload = await req.json();
    console.log('💰 NOWPayments Webhook Received:', JSON.stringify(payload, null, 2));

    // Only process finished payments
    if (payload.payment_status === 'finished') {
      console.log('🎯 Processing successful payment:', payload.payment_id);
      
      // Extract user_id from the order_id (format: "sub_USERID_TIMESTAMP")
      const orderId = payload.order_id;
      const userId = orderId ? orderId.split('_')[1] : null;
      
      if (!userId) {
        console.error('❌ Could not extract user_id from order_id:', orderId);
        return new Response(JSON.stringify({
          received: true,
          error: "Invalid order_id"
        }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // 1. Update the payment record in database
      const { error: paymentError } = await supabaseClient.from('payments').update({
        status: 'finished',
        actually_paid: payload.actually_paid,
        outcome_amount: payload.outcome_amount,
        outcome_currency: payload.outcome_currency,
        hash: payload.payment_extra_ids?.[0] || null,
        is_deposit_completed: true,
        updated_at: new Date().toISOString()
      }).eq('nowpayments_payment_id', String(payload.payment_id));

      if (paymentError) {
        console.error('❌ Error updating payment:', paymentError);
      } else {
        console.log('✅ Payment record updated');
      }

      // 2. Determine plan and set subscription period
      const priceAmount = Number(payload.price_amount);
      let planKey = 'monthly';
      let daysToAdd = 30;
      
      if (priceAmount === 60) {
        planKey = 'annual';
        daysToAdd = 365;
      } else if (priceAmount === 40) {
        planKey = '6month';
        daysToAdd = 180;
      }
      
      const planUuid = PLAN_UUID_MAP[planKey];
      const periodEnd = new Date();
      periodEnd.setDate(periodEnd.getDate() + daysToAdd);

      // 3. Create or update user subscription
      const { error: subError } = await supabaseClient.from('subscriptions').upsert({
        user_id: userId,
        plan_id: planUuid,
        status: 'active',
        current_period_start: new Date().toISOString(),
        current_period_end: periodEnd.toISOString(),
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
      });

      if (subError) {
        console.error('❌ Error creating subscription:', subError);
      } else {
        console.log('✅ Subscription created/updated');
      }

      // 4. Update user profile to premium
      const { error: profileError } = await supabaseClient.from('profiles').update({
        account_tier: 'premium',
        updated_at: new Date().toISOString()
      }).eq('id', userId);

      if (profileError) {
        console.error('❌ Error updating profile:', profileError);
      } else {
        console.log('✅ Profile updated to premium');
      }

      console.log(`✅ ${planKey} subscription activated for user:`, userId);
    } else {
      console.log(`ℹ️ Payment ${payload.payment_id} status: ${payload.payment_status}`);
    }

    return new Response(JSON.stringify({
      received: true,
      message: "Webhook processed successfully",
      payment_id: payload.payment_id,
      status: payload.payment_status
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(JSON.stringify({
      error: "Invalid webhook payload",
      details: String(error)
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});