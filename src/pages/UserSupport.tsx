import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';

interface SupportTicket {
  id: string;
  subject: string;
  message: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
  category: string;
}

type TicketStatus = 'open' | 'in-progress' | 'resolved' | 'closed';
type TicketCategory = 'technical' | 'payment' | 'account' | 'feature' | 'bug' | 'other';

export default function UserSupport() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'new' | 'history'>('new');
  const [formData, setFormData] = useState({
    subject: '',
    category: 'technical' as TicketCategory,
    message: '',
  });

  // Mock data - replace with actual data from your backend
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: '1',
      subject: 'Translation accuracy issue',
      message: 'I noticed some inaccuracies in the French translations...',
      status: 'resolved',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-12',
      category: 'technical',
    },
    {
      id: '2',
      subject: 'Payment not received',
      message: 'I haven\'t received my payout from last week...',
      status: 'in-progress',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
      category: 'payment',
    },
    {
      id: '3',
      subject: 'Account upgrade question',
      message: 'I want to upgrade to Pro but have some questions...',
      status: 'open',
      createdAt: '2024-01-18',
      updatedAt: '2024-01-18',
      category: 'account',
    },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.subject.trim() || !formData.message.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    // Here you would typically call your backend API
    console.log('Submitting support ticket:', formData);
    
    // Add new ticket to list
    const newTicket: SupportTicket = {
      id: Date.now().toString(),
      subject: formData.subject,
      message: formData.message,
      status: 'open',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      category: formData.category,
    };
    
    setTickets([newTicket, ...tickets]);
    
    // Reset form
    setFormData({
      subject: '',
      category: 'technical',
      message: '',
    });
    
    // Switch to history tab
    setActiveTab('history');
    
    alert('Support ticket submitted successfully! Our team will respond within 24 hours.');
  };

  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case 'open': return '#3B82F6';
      case 'in-progress': return '#F59E0B';
      case 'resolved': return '#10B981';
      case 'closed': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: TicketStatus) => {
    switch (status) {
      case 'open': return '📥';
      case 'in-progress': return '🔄';
      case 'resolved': return '✅';
      case 'closed': return '🔒';
      default: return '📄';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical': return '🛠️';
      case 'payment': return '💰';
      case 'account': return '👤';
      case 'feature': return '💡';
      case 'bug': return '🐛';
      default: return '❓';
    }
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
    return 'User';
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #0f0f23 50%, #1a1a2e 100%)',
      color: '#ffffff',
      padding: '2rem 1rem',
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        background: 'rgba(0, 0, 0, 0.7)',
        borderRadius: '1rem',
        padding: '2rem',
        border: '2px solid #D4AF37',
        boxShadow: '0 0 30px rgba(212, 175, 55, 0.3)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            color: '#D4AF37',
            textShadow: '0 0 10px #D4AF37'
          }}>
            💬 Support Center
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

        {/* User Info */}
        <div style={{
          background: 'rgba(26, 26, 46, 0.8)',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          marginBottom: '2rem',
          border: '1px solid #3B82F6',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #D4AF37 0%, #228B22 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#000',
              fontWeight: 'bold',
              fontSize: '1.25rem',
            }}>
              {getUserInitial()}
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', color: '#E5E7EB' }}>
                {getUserDisplayName()}
              </h3>
              <p style={{ color: '#9CA3AF', fontSize: '0.9rem' }}>{user?.email}</p>
            </div>
          </div>
          <div style={{ color: '#9CA3AF', fontSize: '0.9rem' }}>
            Our support team typically responds within 24 hours. For urgent issues, please check our FAQ below.
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid #374151' }}>
          <button
            onClick={() => setActiveTab('new')}
            style={{
              padding: '0.75rem 1.5rem',
              background: activeTab === 'new' ? '#3B82F6' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'new' ? '2px solid #3B82F6' : 'none',
              color: activeTab === 'new' ? '#ffffff' : '#9CA3AF',
              cursor: 'pointer',
              fontWeight: activeTab === 'new' ? 'bold' : 'normal',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
            }}
          >
            📝 New Ticket
          </button>
          <button
            onClick={() => setActiveTab('history')}
            style={{
              padding: '0.75rem 1.5rem',
              background: activeTab === 'history' ? '#3B82F6' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'history' ? '2px solid #3B82F6' : 'none',
              color: activeTab === 'history' ? '#ffffff' : '#9CA3AF',
              cursor: 'pointer',
              fontWeight: activeTab === 'history' ? 'bold' : 'normal',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
            }}
          >
            📋 Ticket History
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'new' ? (
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#3B82F6' }}>
              Create New Support Ticket
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#E5E7EB' }}>
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Brief description of your issue"
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid #D4AF37',
                    borderRadius: '0.5rem',
                    color: '#ffffff',
                    fontSize: '1rem',
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#E5E7EB' }}>
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid #228B22',
                    borderRadius: '0.5rem',
                    color: '#ffffff',
                    fontSize: '1rem',
                  }}
                >
                  <option value="technical">🛠️ Technical Issue</option>
                  <option value="payment">💰 Payment & Payouts</option>
                  <option value="account">👤 Account & Profile</option>
                  <option value="feature">💡 Feature Request</option>
                  <option value="bug">🐛 Bug Report</option>
                  <option value="other">❓ Other</option>
                </select>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#E5E7EB' }}>
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Please provide detailed information about your issue..."
                  required
                  rows={8}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid #3B82F6',
                    borderRadius: '0.5rem',
                    color: '#ffffff',
                    fontSize: '1rem',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #228B22 0%, #3B82F6 100%)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(34, 139, 34, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                📤 Submit Support Ticket
              </button>
            </form>

            {/* FAQ Section */}
            <div style={{
              marginTop: '3rem',
              padding: '1.5rem',
              background: 'rgba(26, 26, 46, 0.8)',
              borderRadius: '0.75rem',
              border: '1px solid #228B22',
            }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#228B22' }}>
                ❓ Frequently Asked Questions
              </h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div>
                  <div style={{ fontWeight: 'bold', color: '#D4AF37', marginBottom: '0.25rem' }}>
                    Q: How long does it take to receive payouts?
                  </div>
                  <div style={{ color: '#9CA3AF', fontSize: '0.9rem' }}>
                    A: Payouts are processed within 1-5 business days depending on the method.
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', color: '#D4AF37', marginBottom: '0.25rem' }}>
                    Q: Can I translate offline?
                  </div>
                  <div style={{ color: '#9CA3AF', fontSize: '0.9rem' }}>
                    A: Currently, real-time translation requires an internet connection.
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', color: '#D4AF37', marginBottom: '0.25rem' }}>
                    Q: How do I upgrade to Pro?
                  </div>
                  <div style={{ color: '#9CA3AF', fontSize: '0.9rem' }}>
                    A: Go to Dashboard → Billing → Upgrade to Pro Account.
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#D4AF37' }}>
              Your Support Tickets
            </h2>
            
            {tickets.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#9CA3AF' }}>
                No support tickets yet. Create your first ticket above!
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    style={{
                      background: 'rgba(26, 26, 46, 0.8)',
                      borderRadius: '0.75rem',
                      padding: '1.5rem',
                      border: '1px solid #374151',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = '#3B82F6';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = '#374151';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    onClick={() => {
                      // Here you would typically navigate to ticket details
                      alert(`Ticket Details:\n\nSubject: ${ticket.subject}\nStatus: ${ticket.status}\nCreated: ${ticket.createdAt}\n\nMessage: ${ticket.message}`);
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                          <span style={{ fontSize: '1.25rem' }}>{getCategoryIcon(ticket.category)}</span>
                          <h3 style={{ fontSize: '1.1rem', color: '#E5E7EB', fontWeight: '500' }}>
                            {ticket.subject}
                          </h3>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <span style={{
                            padding: '0.25rem 0.75rem',
                            borderRadius: '1rem',
                            background: getStatusColor(ticket.status as TicketStatus) + '20',
                            color: getStatusColor(ticket.status as TicketStatus),
                            fontSize: '0.85rem',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                          }}>
                            {getStatusIcon(ticket.status as TicketStatus)} {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                          </span>
                          <span style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>
                            Created: {ticket.createdAt}
                          </span>
                        </div>
                      </div>
                      <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>
                        Last updated: {ticket.updatedAt}
                      </div>
                    </div>
                    <p style={{
                      color: '#9CA3AF',
                      fontSize: '0.9rem',
                      lineHeight: '1.5',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {ticket.message}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Contact Information */}
            <div style={{
              marginTop: '2rem',
              padding: '1.5rem',
              background: 'rgba(26, 26, 46, 0.8)',
              borderRadius: '0.75rem',
              border: '1px solid #3B82F6',
            }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#3B82F6' }}>
                📞 Additional Contact Methods
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <div style={{ fontWeight: 'bold', color: '#D4AF37' }}>Email</div>
                  <div style={{ color: '#9CA3AF', fontSize: '0.9rem' }}>support@web3translate.com</div>
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', color: '#D4AF37' }}>Response Time</div>
                  <div style={{ color: '#9CA3AF', fontSize: '0.9rem' }}>24-48 hours</div>
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', color: '#D4AF37' }}>Office Hours</div>
                  <div style={{ color: '#9CA3AF', fontSize: '0.9rem' }}>Mon-Fri, 9AM-6PM EST</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}