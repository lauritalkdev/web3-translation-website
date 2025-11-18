import { supabase } from '../lib/supabase';

export const nowpaymentsService = {
  async createPayment(planId: string, currency: string) {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError) {
      throw new Error(`Authentication error: ${authError.message}`);
    }
    
    if (!user) {
      throw new Error('User must be logged in to make payment');
    }

    console.log('Calling Edge Function with:', { planId, userId: user.id, currency });

    // Use the Supabase client to invoke the function without manually setting the header
    const { data, error } = await supabase.functions.invoke('create-payment', {
      body: {
        plan_id: planId,
        user_id: user.id,
        payment_currency: currency
      }
    });

    console.log('Edge Function response:', { data, error });

    if (error) {
      throw new Error(`Edge Function error: ${error.message}`);
    }

    return data;
  }
};