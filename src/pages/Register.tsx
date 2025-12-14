import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    referralCode: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);

  // Auto-copy referral code from URL
  useEffect(() => {
    // Get referral code from URL query parameters
    const searchParams = new URLSearchParams(location.search);
    const refCode = searchParams.get('ref');
    
    if (refCode) {
      console.log('🔗 Referral code detected in URL:', refCode);
      setFormData(prev => ({
        ...prev,
        referralCode: refCode
      }));
    }
  }, [location.search]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long!');
      setLoading(false);
      return;
    }

    if (!agreedToTerms || !agreedToPrivacy) {
      alert('Please agree to the Terms and Conditions and Privacy Policy to continue.');
      setLoading(false);
      return;
    }

    try {
      console.log('🚀 ===== REGISTRATION START =====');
      console.log('📋 Form data:', {
        email: formData.email,
        fullName: formData.fullName,
        country: formData.country,
        referralCode: formData.referralCode,
        hasReferralCode: !!formData.referralCode
      });

      // STEP 1: Create auth user with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName.trim(),
            country: formData.country
          }
        }
      });

      console.log('📨 Supabase auth response:', { 
        data: data ? 'Received' : 'No data',
        error: error ? error.message : 'No error',
        userId: data?.user?.id
      });

      if (error) {
        console.error('❌ Registration error details:', error);
        alert(`Registration failed: ${error.message}`);
        setLoading(false);
        return;
      }

      if (!data.user) {
        alert('Registration failed. Please try again.');
        setLoading(false);
        return;
      }

      console.log('✅ Auth user created:', data.user?.id);

      // STEP 2: Process referral code if provided
      if (formData.referralCode.trim()) {
        console.log('🔗 Processing referral code:', formData.referralCode);
        
        // Wait a moment for profile to be created by trigger
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        try {
          const { data: referralData, error: referralError } = await supabase
            .rpc('process_referral_code', {
              p_user_id: data.user.id,
              p_referral_code: formData.referralCode.trim()
            });

          if (referralError) {
            console.error('❌ Referral error:', referralError);
            console.log('⚠️ Referral processing failed, but account created successfully');
          } else {
            console.log('✅ Referral processed:', referralData);
          }
        } catch (refErr) {
          console.error('❌ Referral processing error:', refErr);
          // Don't fail registration, just log the error
        }
      } else {
        console.log('ℹ️ No referral code provided');
      }

      console.log('🎉 ===== REGISTRATION COMPLETE =====');

      // STEP 3: Show success and redirect
      alert('✅ Account created successfully! Please check your email for verification.');
      navigate('/login');

    } catch (err) {
      console.error('💥 Unexpected error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      alert(`Error: ${errorMessage}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#000000', 
      color: '#ffffff',
      width: '100%',
      overflowX: 'hidden'
    }}>
      {/* Navigation */}
      <nav style={{ 
        backgroundColor: '#000000', 
        borderBottom: '1px solid #D4AF37', 
        padding: '1rem 0',
        width: '100%'
      }}>
        <div style={{ 
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
        }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#D4AF37' }}>Web3 Translate</h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              onClick={() => navigate('/')}
              style={{ 
                color: '#ffffff', 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                padding: '0.5rem 1rem',
                fontSize: '1rem'
              }}
            >
              Home
            </button>
          </div>
        </div>
      </nav>

      <div style={{ 
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ 
          maxWidth: '500px', 
          width: '100%', 
          backgroundColor: '#1a1a1a', 
          padding: '2.5rem', 
          borderRadius: '0.5rem',
          border: '1px solid #D4AF37',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
        }}>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            color: '#D4AF37', 
            textAlign: 'center', 
            marginBottom: '2rem' 
          }}>
            Create Account
          </h2>
          
          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Full Name */}
            <div>
              <label style={{ display: 'block', color: '#ffffff', marginBottom: '0.5rem', fontWeight: '500' }}>
                Full Name *
              </label>
              <input 
                type="text" 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                style={{ 
                  width: '100%', 
                  padding: '0.75rem 1rem', 
                  backgroundColor: '#2d2d2d', 
                  border: '1px solid #444444', 
                  borderRadius: '0.375rem', 
                  color: '#ffffff',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s'
                }}
                placeholder="Enter your full name"
                required
                onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                onBlur={(e) => e.target.style.borderColor = '#444444'}
              />
            </div>

            {/* Email */}
            <div>
              <label style={{ display: 'block', color: '#ffffff', marginBottom: '0.5rem', fontWeight: '500' }}>
                Email Address *
              </label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{ 
                  width: '100%', 
                  padding: '0.75rem 1rem', 
                  backgroundColor: '#2d2d2d', 
                  border: '1px solid #444444', 
                  borderRadius: '0.375rem', 
                  color: '#ffffff',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s'
                }}
                placeholder="Enter your email"
                required
                onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                onBlur={(e) => e.target.style.borderColor = '#444444'}
              />
            </div>

            {/* Country */}
            <div>
              <label style={{ display: 'block', color: '#ffffff', marginBottom: '0.5rem', fontWeight: '500' }}>
                Country *
              </label>
              <select 
                name="country"
                value={formData.country}
                onChange={handleChange}
                style={{ 
                  width: '100%', 
                  padding: '0.75rem 1rem', 
                  backgroundColor: '#2d2d2d', 
                  border: '1px solid #444444', 
                  borderRadius: '0.375rem', 
                  color: '#ffffff',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s',
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23D4AF37' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '16px'
                }}
                required
                onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                onBlur={(e) => e.target.style.borderColor = '#444444'}
              >
                <option value="">Select your country</option>
                <optgroup label="🌍 Africa">
                  <option value="Cameroon">Cameroon</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Kenya">Kenya</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Egypt">Egypt</option>
                  <option value="Ethiopia">Ethiopia</option>
                  <option value="Tanzania">Tanzania</option>
                  <option value="Uganda">Uganda</option>
                  <option value="Rwanda">Rwanda</option>
                  <option value="Senegal">Senegal</option>
                  <option value="Ivory Coast">Ivory Coast</option>
                  <option value="Morocco">Morocco</option>
                  <option value="Algeria">Algeria</option>
                  <option value="Tunisia">Tunisia</option>
                </optgroup>
                <optgroup label="🌏 Asia">
                  <option value="China">China</option>
                  <option value="India">India</option>
                  <option value="Japan">Japan</option>
                  <option value="South Korea">South Korea</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="Thailand">Thailand</option>
                  <option value="Vietnam">Vietnam</option>
                  <option value="Philippines">Philippines</option>
                  <option value="Indonesia">Indonesia</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                </optgroup>
                <optgroup label="🌍 Europe">
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Italy">Italy</option>
                  <option value="Spain">Spain</option>
                  <option value="Portugal">Portugal</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="Belgium">Belgium</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="Sweden">Sweden</option>
                  <option value="Norway">Norway</option>
                  <option value="Denmark">Denmark</option>
                  <option value="Finland">Finland</option>
                  <option value="Poland">Poland</option>
                  <option value="Ukraine">Ukraine</option>
                </optgroup>
                <optgroup label="🌎 North America">
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Costa Rica">Costa Rica</option>
                  <option value="Panama">Panama</option>
                  <option value="Jamaica">Jamaica</option>
                  <option value="Dominican Republic">Dominican Republic</option>
                  <option value="Guatemala">Guatemala</option>
                  <option value="Honduras">Honduras</option>
                  <option value="El Salvador">El Salvador</option>
                </optgroup>
                <optgroup label="🌎 South America">
                  <option value="Brazil">Brazil</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Peru">Peru</option>
                  <option value="Chile">Chile</option>
                  <option value="Ecuador">Ecuador</option>
                  <option value="Venezuela">Venezuela</option>
                  <option value="Bolivia">Bolivia</option>
                  <option value="Paraguay">Paraguay</option>
                  <option value="Uruguay">Uruguay</option>
                </optgroup>
                <optgroup label="🌏 Oceania">
                  <option value="Australia">Australia</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="Fiji">Fiji</option>
                  <option value="Papua New Guinea">Papua New Guinea</option>
                  <option value="Samoa">Samoa</option>
                  <option value="Tonga">Tonga</option>
                </optgroup>
                <option value="Other">Other (Not Listed)</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label style={{ display: 'block', color: '#ffffff', marginBottom: '0.5rem', fontWeight: '500' }}>
                Password *
              </label>
              <div style={{ position: 'relative', width: '100%' }}>
                <input 
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem 3rem 0.75rem 1rem', 
                    backgroundColor: '#2d2d2d', 
                    border: '1px solid #444444', 
                    borderRadius: '0.375rem', 
                    color: '#ffffff',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.3s'
                  }}
                  placeholder="Create a password (min. 6 characters)"
                  required
                  minLength={6}
                  onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                  onBlur={(e) => e.target.style.borderColor = '#444444'}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#D4AF37',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    padding: '0',
                    width: '1.5rem',
                    height: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label style={{ display: 'block', color: '#ffffff', marginBottom: '0.5rem', fontWeight: '500' }}>
                Confirm Password *
              </label>
              <div style={{ position: 'relative', width: '100%' }}>
                <input 
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem 3rem 0.75rem 1rem', 
                    backgroundColor: '#2d2d2d', 
                    border: '1px solid #444444', 
                    borderRadius: '0.375rem', 
                    color: '#ffffff',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.3s'
                  }}
                  placeholder="Confirm your password"
                  required
                  minLength={6}
                  onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                  onBlur={(e) => e.target.style.borderColor = '#444444'}
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#D4AF37',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    padding: '0',
                    width: '1.5rem',
                    height: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Referral Code */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label style={{ color: '#ffffff', fontWeight: '500' }}>
                  Referral Code {formData.referralCode && '(Auto-filled)'}
                </label>
                {formData.referralCode && (
                  <span style={{ 
                    fontSize: '0.875rem', 
                    color: '#22C55E',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem'
                  }}>
                    ✓ From referral link
                  </span>
                )}
              </div>
              <input 
                type="text" 
                name="referralCode"
                value={formData.referralCode}
                onChange={handleChange}
                style={{ 
                  width: '100%', 
                  padding: '0.75rem 1rem', 
                  backgroundColor: '#2d2d2d', 
                  border: formData.referralCode ? '1px solid #22C55E' : '1px solid #444444', 
                  borderRadius: '0.375rem', 
                  color: '#ffffff',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s'
                }}
                placeholder="Will auto-fill from referral link"
                readOnly={!!formData.referralCode}
                onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                onBlur={(e) => e.target.style.borderColor = formData.referralCode ? '#22C55E' : '#444444'}
              />
              {formData.referralCode && (
                <p style={{ fontSize: '0.875rem', color: '#9CA3AF', marginTop: '0.25rem' }}>
                  Using referral code: <strong>{formData.referralCode}</strong>
                </p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer',
                    marginTop: '0.125rem',
                    accentColor: '#D4AF37'
                  }}
                  required
                />
                <label 
                  htmlFor="terms" 
                  style={{ 
                    color: '#ffffff', 
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                    cursor: 'pointer'
                  }}
                >
                  I agree to the{' '}
                  <a 
                    href="/terms" 
                    target="_blank"
                    style={{ 
                      color: '#D4AF37', 
                      textDecoration: 'underline',
                      fontWeight: '500'
                    }}
                  >
                    Terms and Conditions
                  </a>
                  {' *'}
                </label>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <input
                  type="checkbox"
                  id="privacy"
                  checked={agreedToPrivacy}
                  onChange={(e) => setAgreedToPrivacy(e.target.checked)}
                  style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer',
                    marginTop: '0.125rem',
                    accentColor: '#D4AF37'
                  }}
                  required
                />
                <label 
                  htmlFor="privacy" 
                  style={{ 
                    color: '#ffffff', 
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                    cursor: 'pointer'
                  }}
                >
                  I acknowledge the{' '}
                  <a 
                    href="/privacy" 
                    target="_blank"
                    style={{ 
                      color: '#D4AF37', 
                      textDecoration: 'underline',
                      fontWeight: '500'
                    }}
                  >
                    Privacy Policy
                  </a>
                  {' *'}
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={loading || !agreedToTerms || !agreedToPrivacy}
              style={{ 
                width: '100%', 
                background: (loading || !agreedToTerms || !agreedToPrivacy) ? 'linear-gradient(135deg, #666666 0%, #555555 100%)' : 'linear-gradient(135deg, #228B22 0%, #1B6B1B 100%)', 
                color: '#ffffff', 
                padding: '0.875rem', 
                borderRadius: '0.375rem', 
                border: 'none', 
                fontWeight: 'bold',
                cursor: (loading || !agreedToTerms || !agreedToPrivacy) ? 'not-allowed' : 'pointer',
                fontSize: '1rem',
                marginTop: '1rem',
                transition: 'all 0.3s ease',
                opacity: (loading || !agreedToTerms || !agreedToPrivacy) ? 0.7 : 1
              }}
              onMouseOver={(e) => {
                if (!loading && agreedToTerms && agreedToPrivacy) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(34, 139, 34, 0.4)';
                }
              }}
              onMouseOut={(e) => {
                if (!loading && agreedToTerms && agreedToPrivacy) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <div style={{ 
                    width: '16px', 
                    height: '16px', 
                    border: '2px solid #ffffff', 
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  Creating Account...
                </span>
              ) : 'Create Account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', color: '#9CA3AF', marginTop: '2rem' }}>
            Already have an account?{' '}
            <button 
              onClick={() => navigate('/login')}
              style={{ 
                color: '#D4AF37', 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                fontWeight: 'bold',
                textDecoration: 'underline',
                fontSize: '1rem'
              }}
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>

      {/* Add CSS for spinner animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}