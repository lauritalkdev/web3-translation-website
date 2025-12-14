import { useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import { useNavigate } from 'react-router-dom';

interface UserProfileForm {
  displayName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  country: string;
  language: string;
  notifications: boolean;
}

export default function UserProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  // Initialize form data directly based on user
  const getUserDisplayName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    if (user?.user_metadata?.name) {
      return user.user_metadata.name;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return '';
  };

  const [formData, setFormData] = useState<UserProfileForm>({
    displayName: getUserDisplayName(),
    email: user?.email || '',
    phoneNumber: '',
    dateOfBirth: '',
    country: '',
    language: 'en',
    notifications: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = async () => {
    // Here you would typically update the user profile via Supabase
    console.log('Saving profile:', formData);
    setIsEditing(false);
    // Show success message
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setFormData({
      displayName: getUserDisplayName(),
      email: user?.email || '',
      phoneNumber: '',
      dateOfBirth: '',
      country: '',
      language: 'en',
      notifications: true,
    });
    setIsEditing(false);
  };

  const getUserInitial = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name.charAt(0).toUpperCase();
    }
    if (user?.user_metadata?.name) {
      return user.user_metadata.name.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  const getDisplayNameForHeader = () => {
    const displayName = getUserDisplayName();
    return displayName || (user?.email?.split('@')[0] || 'User');
  };

  // List of countries for the dropdown
  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Japan',
    'China', 'India', 'Brazil', 'Mexico', 'Spain', 'Italy', 'South Korea', 'Russia',
    'South Africa', 'Nigeria', 'Kenya', 'Ghana', 'Egypt', 'Morocco', 'Ethiopia',
    'Uganda', 'Tanzania', 'Rwanda', 'Senegal', 'Ivory Coast', 'Cameroon', 'Algeria',
    'Tunisia', 'Other'
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #0f0f23 50%, #1a1a2e 100%)',
      color: '#ffffff',
      padding: '1rem',
      overflowX: 'hidden',
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'rgba(0, 0, 0, 0.7)',
        borderRadius: '1rem',
        padding: '1.5rem',
        border: '2px solid #D4AF37',
        boxShadow: '0 0 30px rgba(212, 175, 55, 0.3)',
        overflow: 'hidden',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <h1 style={{ 
            fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
            fontWeight: 'bold', 
            color: '#D4AF37',
            textShadow: '0 0 10px #D4AF37',
            wordBreak: 'break-word',
          }}>
            👤 User Profile
          </h1>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              background: 'transparent',
              border: '1px solid #228B22',
              color: '#228B22',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#228B22';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#228B22';
            }}
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Profile Card */}
        <div style={{
          background: 'rgba(26, 26, 46, 0.8)',
          borderRadius: '1rem',
          padding: '1.5rem',
          marginBottom: '2rem',
          border: '1px solid #3B82F6',
          overflow: 'hidden',
          width: '100%',
        }}>
          {/* User Avatar */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '2rem', 
            gap: '1.5rem',
            flexWrap: 'wrap',
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #D4AF37 0%, #228B22 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#000',
              fontWeight: 'bold',
              fontSize: '2rem',
              boxShadow: '0 0 20px rgba(212, 175, 55, 0.5)',
              flexShrink: 0,
            }}>
              {getUserInitial()}
            </div>
            <div style={{
              flex: 1,
              minWidth: 0, // This prevents flex child from overflowing
            }}>
              <h2 style={{ 
                fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', 
                marginBottom: '0.5rem', 
                color: '#D4AF37',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
              }}>
                {getDisplayNameForHeader()}
              </h2>
              <p style={{ 
                color: '#9CA3AF',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                fontSize: 'clamp(0.875rem, 2vw, 1rem)',
              }}>
                {user?.email}
              </p>
              {formData.country && (
                <p style={{ 
                  color: '#3B82F6', 
                  fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', 
                  marginTop: '0.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  wordBreak: 'break-word',
                  flexWrap: 'wrap',
                }}>
                  <span>🌍</span> {formData.country}
                </p>
              )}
            </div>
          </div>

          {/* Edit Button */}
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #228B22 100%)',
                color: '#000',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontWeight: 'bold',
                marginBottom: '2rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 0 15px rgba(212, 175, 55, 0.5)',
                width: '100%',
                maxWidth: '200px',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 0 25px rgba(212, 175, 55, 0.7)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(212, 175, 55, 0.5)';
              }}
            >
              ✏️ Edit Profile
            </button>
          )}

          {/* Profile Form */}
          {isEditing ? (
            <div>
              <h3 style={{ 
                fontSize: 'clamp(1.1rem, 3vw, 1.25rem)', 
                marginBottom: '1.5rem', 
                color: '#3B82F6',
                wordBreak: 'break-word',
              }}>
                Edit Profile Information
              </h3>
              
              <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#E5E7EB' }}>
                    Display Name
                  </label>
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: '1px solid #D4AF37',
                      borderRadius: '0.5rem',
                      color: '#ffffff',
                      fontSize: '1rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#E5E7EB' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid #6B7280',
                      borderRadius: '0.5rem',
                      color: '#9CA3AF',
                      fontSize: '1rem',
                      cursor: 'not-allowed',
                      boxSizing: 'border-box',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                    title={formData.email}
                  />
                  <p style={{ fontSize: 'clamp(0.75rem, 2vw, 0.8rem)', color: '#9CA3AF', marginTop: '0.25rem' }}>
                    Email cannot be changed for security reasons
                  </p>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#E5E7EB' }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="+1234567890"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: '1px solid #3B82F6',
                      borderRadius: '0.5rem',
                      color: '#ffffff',
                      fontSize: '1rem',
                      boxSizing: 'border-box',
                    }}
                  />
                  <p style={{ fontSize: 'clamp(0.75rem, 2vw, 0.8rem)', color: '#9CA3AF', marginTop: '0.25rem' }}>
                    Include country code (e.g., +1 for US, +44 for UK)
                  </p>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#E5E7EB' }}>
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: '1px solid #EC4899',
                      borderRadius: '0.5rem',
                      color: '#ffffff',
                      fontSize: '1rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#E5E7EB' }}>
                    Country
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: '1px solid #3B82F6',
                      borderRadius: '0.5rem',
                      color: '#ffffff',
                      fontSize: '1rem',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="">Select your country</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#E5E7EB' }}>
                    Preferred Language
                  </label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: '1px solid #8B5CF6',
                      borderRadius: '0.5rem',
                      color: '#ffffff',
                      fontSize: '1rem',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="zh">Chinese</option>
                    <option value="ja">Japanese</option>
                    <option value="ar">Arabic</option>
                    <option value="pt">Portuguese</option>
                    <option value="ru">Russian</option>
                    <option value="hi">Hindi</option>
                  </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input
                    type="checkbox"
                    name="notifications"
                    checked={formData.notifications}
                    onChange={handleInputChange}
                    style={{
                      width: '18px',
                      height: '18px',
                      flexShrink: 0,
                    }}
                  />
                  <label style={{ color: '#E5E7EB', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
                    Receive email notifications
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={handleSave}
                  style={{
                    background: '#228B22',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    flex: '1 1 200px',
                    transition: 'all 0.3s ease',
                    minWidth: '140px',
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#1E7A1E';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = '#228B22';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  💾 Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  style={{
                    background: 'transparent',
                    color: '#EF4444',
                    border: '1px solid #EF4444',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    flex: '1 1 200px',
                    transition: 'all 0.3s ease',
                    minWidth: '140px',
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          ) : (
            /* Read-only View */
            <div>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div>
                  <label style={{ color: '#9CA3AF', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>Display Name</label>
                  <p style={{ 
                    color: '#E5E7EB', 
                    fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                  }}>
                    {formData.displayName || 'Not set'}
                  </p>
                </div>
                <div>
                  <label style={{ color: '#9CA3AF', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>Email</label>
                  <p style={{ 
                    color: '#E5E7EB', 
                    fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {formData.email}
                  </p>
                </div>
                <div>
                  <label style={{ color: '#9CA3AF', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>Phone Number</label>
                  <p style={{ 
                    color: '#E5E7EB', 
                    fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                    wordBreak: 'break-word',
                  }}>
                    {formData.phoneNumber || 'Not set'}
                  </p>
                </div>
                <div>
                  <label style={{ color: '#9CA3AF', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>Date of Birth</label>
                  <p style={{ 
                    color: '#E5E7EB', 
                    fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                    wordBreak: 'break-word',
                  }}>
                    {formData.dateOfBirth ? new Date(formData.dateOfBirth).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'Not set'}
                  </p>
                </div>
                <div>
                  <label style={{ color: '#9CA3AF', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>Country</label>
                  <p style={{ 
                    color: '#E5E7EB', 
                    fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                    wordBreak: 'break-word',
                  }}>
                    {formData.country || 'Not set'}
                  </p>
                </div>
                <div>
                  <label style={{ color: '#9CA3AF', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>Preferred Language</label>
                  <p style={{ 
                    color: '#E5E7EB', 
                    fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                    wordBreak: 'break-word',
                  }}>
                    {formData.language === 'en' ? 'English' :
                     formData.language === 'es' ? 'Spanish' :
                     formData.language === 'fr' ? 'French' :
                     formData.language === 'de' ? 'German' :
                     formData.language === 'zh' ? 'Chinese' :
                     formData.language === 'ja' ? 'Japanese' :
                     formData.language === 'ar' ? 'Arabic' :
                     formData.language === 'pt' ? 'Portuguese' :
                     formData.language === 'ru' ? 'Russian' :
                     formData.language === 'hi' ? 'Hindi' : formData.language}
                  </p>
                </div>
                <div>
                  <label style={{ color: '#9CA3AF', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>Notifications</label>
                  <p style={{ 
                    color: '#E5E7EB', 
                    fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                    wordBreak: 'break-word',
                  }}>
                    {formData.notifications ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}