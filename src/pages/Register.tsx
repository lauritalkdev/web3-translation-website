import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Register() {
  const navigate = useNavigate();
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert('Account created! Please check your email for verification.');
      navigate('/login');
    }
    setLoading(false);
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
              style={{ color: '#ffffff', background: 'none', border: 'none', cursor: 'pointer' }}
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
          border: '1px solid #D4AF37'
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
                  boxSizing: 'border-box'
                }}
                placeholder="Enter your full name"
                required
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
                  boxSizing: 'border-box'
                }}
                placeholder="Enter your email"
                required
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
                  boxSizing: 'border-box'
                }}
                required
              >
                <option value="">Select your country</option>
                
                {/* Africa */}
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

                {/* Asia */}
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

                {/* Europe */}
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

                {/* North America */}
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

                {/* South America */}
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

                {/* Oceania */}
                <optgroup label="🌏 Oceania">
                  <option value="Australia">Australia</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="Fiji">Fiji</option>
                  <option value="Papua New Guinea">Papua New Guinea</option>
                  <option value="Samoa">Samoa</option>
                  <option value="Tonga">Tonga</option>
                </optgroup>

                {/* Other */}
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
                    boxSizing: 'border-box'
                  }}
                  placeholder="Create a password"
                  required
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
                    height: '1.5rem'
                  }}
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
                    boxSizing: 'border-box'
                  }}
                  placeholder="Confirm your password"
                  required
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
                    height: '1.5rem'
                  }}
                >
                  {showConfirmPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Referral Code */}
            <div>
              <label style={{ display: 'block', color: '#ffffff', marginBottom: '0.5rem', fontWeight: '500' }}>
                Referral Code (Optional)
              </label>
              <input 
                type="text" 
                name="referralCode"
                value={formData.referralCode}
                onChange={handleChange}
                style={{ 
                  width: '100%', 
                  padding: '0.75rem 1rem', 
                  backgroundColor: '#2d2d2d', 
                  border: '1px solid #444444', 
                  borderRadius: '0.375rem', 
                  color: '#ffffff',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
                placeholder="Enter referral code if any"
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={loading}
              style={{ 
                width: '100%', 
                backgroundColor: loading ? '#666666' : '#228B22', 
                color: '#ffffff', 
                padding: '0.875rem', 
                borderRadius: '0.375rem', 
                border: 'none', 
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '1rem',
                marginTop: '1rem'
              }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
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
                fontWeight: 'bold'
              }}
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}