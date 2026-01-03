export default function Privacy() {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#000000', 
        color: '#ffffff',
        padding: '2rem 1rem'
      }}>
        <div style={{ 
          maxWidth: '800px', 
          margin: '0 auto',
          padding: '2rem',
          backgroundColor: '#1a1a1a',
          borderRadius: '0.5rem',
          border: '1px solid #D4AF37',
          lineHeight: '1.6',
          fontSize: '0.95rem'
        }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            color: '#D4AF37',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            Privacy Policy
          </h1>
          
          <p style={{ 
            textAlign: 'center', 
            color: '#9CA3AF',
            marginBottom: '2rem',
            fontStyle: 'italic'
          }}>
            Effective Date: [December, 2025]
          </p>
  
          <p style={{ marginBottom: '1.5rem' }}>
            Luminix ("we", "us", or "our") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, disclose, and protect information when you use Lauritalk, including our mobile applications, website, and related services (collectively, the "Services").
          </p>
          
          <p style={{ marginBottom: '2rem' }}>
            <strong>By using the Services, you agree to the collection and use of information in accordance with this Privacy Policy.</strong>
          </p>
  
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#D4AF37', fontSize: '1.5rem', marginBottom: '1rem' }}>1. COMPANY INFORMATION</h2>
            <p><strong>Company Name:</strong> Luminix</p>
            <p><strong>Country of Registration:</strong> Cameroon</p>
            <p><strong>Business Address:</strong> Buea, Cameroon</p>
            <p><strong>Product:</strong> Lauritalk</p>
            <p><strong>Contact Emails:</strong></p>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li>contact@lauritalk.com</li>
              <li>contact@luminix.com</li>
            </ul>
          </div>
  
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#D4AF37', fontSize: '1.5rem', marginBottom: '1rem' }}>2. INFORMATION WE COLLECT</h2>
            <p style={{ marginBottom: '1rem' }}>We collect the following categories of information:</p>
            
            <p style={{ marginBottom: '1rem' }}><strong>a. Account Information</strong></p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li>Email address</li>
              <li>Wallet address</li>
              <li>Account identifiers</li>
              <li>Login metadata</li>
            </ul>
  
            <p style={{ marginBottom: '1rem' }}><strong>b. User-Generated Content</strong></p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li>Text entered for translation</li>
              <li>Chat messages submitted for translation</li>
              <li>Queries submitted to the AI chatbot</li>
            </ul>
            <p style={{ marginBottom: '1rem' }}>User-generated content may be temporarily stored and logged for system operation, analytics, and AI improvement.</p>
  
            <p style={{ marginBottom: '1rem' }}><strong>c. Voice Data</strong></p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li>Voice inputs used for voice-to-text or voice-to-voice translation</li>
            </ul>
            <p style={{ marginBottom: '1rem' }}>Voice recordings are:</p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li>Processed temporarily</li>
              <li>Not permanently stored</li>
              <li>Deleted after processing unless required for system diagnostics</li>
            </ul>
  
            <p style={{ marginBottom: '1rem' }}><strong>d. Usage & Technical Data</strong></p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li>Device type and operating system</li>
              <li>App version</li>
              <li>IP address</li>
              <li>Language preferences</li>
              <li>Usage patterns and interaction logs</li>
            </ul>
  
            <p style={{ marginBottom: '1rem' }}><strong>e. Payment & Subscription Data</strong></p>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li>Subscription status</li>
              <li>Payment confirmation (crypto transaction references only)</li>
            </ul>
            <p style={{ marginTop: '0.5rem' }}>We do not store private keys or sensitive crypto wallet credentials.</p>
          </div>
  
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#D4AF37', fontSize: '1.5rem', marginBottom: '1rem' }}>3. HOW WE USE YOUR INFORMATION</h2>
            <p style={{ marginBottom: '1rem' }}>We use collected information to:</p>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li>Provide and maintain the Services</li>
              <li>Process translations, voice inputs, and chatbot interactions</li>
              <li>Manage user accounts and authentication</li>
              <li>Administer subscriptions and premium access</li>
              <li>Calculate word-based rewards and payouts</li>
              <li>Detect fraud, abuse, or prohibited activity</li>
              <li>Improve AI models and system performance</li>
              <li>Communicate updates, notices, and service-related information</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>
  
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#D4AF37', fontSize: '1.5rem', marginBottom: '1rem' }}>4. AI & AUTOMATED PROCESSING</h2>
            <p style={{ marginBottom: '1rem' }}>Lauritalk uses artificial intelligence and automated systems to:</p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li>Generate translations</li>
              <li>Process voice data</li>
              <li>Respond via chatbot features</li>
            </ul>
            <p style={{ marginBottom: '1rem' }}>These systems:</p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li>Do not guarantee accuracy</li>
              <li>May learn from anonymized or aggregated usage data</li>
              <li>Do not make legal, medical, or governmental decisions</li>
            </ul>
          </div>
  
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#D4AF37', fontSize: '1.5rem', marginBottom: '1rem' }}>5. THIRD-PARTY SERVICES</h2>
            <p style={{ marginBottom: '1rem' }}>We may use trusted third-party service providers for:</p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li>AI processing</li>
              <li>Cloud infrastructure</li>
              <li>Analytics</li>
              <li>Payment verification</li>
            </ul>
            <p>These providers are authorized to process data only as necessary to provide their services to us and are subject to confidentiality obligations.</p>
          </div>
  
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#D4AF37', fontSize: '1.5rem', marginBottom: '1rem' }}>6. DATA RETENTION</h2>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li>Account data is retained while your account remains active</li>
              <li>User-generated text may be retained temporarily for system improvement</li>
              <li>Voice data is deleted after processing</li>
              <li>Reward and transaction records are retained for auditing and compliance</li>
            </ul>
            <p>We may retain certain data longer where required by law or for legitimate business purposes.</p>
          </div>
  
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#D4AF37', fontSize: '1.5rem', marginBottom: '1rem' }}>7. DATA SHARING & DISCLOSURE</h2>
            <p style={{ marginBottom: '1rem' }}>We do not sell your personal data.</p>
            <p style={{ marginBottom: '1rem' }}>We may share data:</p>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li>With service providers under contractual safeguards</li>
              <li>To comply with legal obligations</li>
              <li>To protect the rights, safety, and integrity of Luminix and users</li>
              <li>In connection with a merger, acquisition, or restructuring</li>
            </ul>
          </div>
  
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#D4AF37', fontSize: '1.5rem', marginBottom: '1rem' }}>8. INTERNATIONAL DATA TRANSFERS</h2>
            <p>Your data may be processed or stored on servers located outside Cameroon, depending on infrastructure and service providers.</p>
            <p>By using the Services, you consent to such transfers, subject to appropriate security measures.</p>
          </div>
  
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#D4AF37', fontSize: '1.5rem', marginBottom: '1rem' }}>9. USER RESPONSIBILITIES</h2>
            <p style={{ marginBottom: '1rem' }}>You are responsible for:</p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li>Ensuring the legality of content you submit</li>
              <li>Avoiding the upload or translation of sensitive personal data</li>
              <li>Maintaining the confidentiality of your account credentials</li>
            </ul>
            <p>Luminix is not responsible for content voluntarily shared by users.</p>
          </div>
  
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#D4AF37', fontSize: '1.5rem', marginBottom: '1rem' }}>10. CHILDREN'S PRIVACY</h2>
            <p style={{ marginBottom: '1rem' }}>Lauritalk is available to users 6 years and above.</p>
            <p style={{ marginBottom: '1rem' }}>We do not knowingly collect unnecessary personal data from children.</p>
            <p>If a parent or guardian believes a child has provided personal data improperly, they may contact us for review or deletion.</p>
          </div>
  
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#D4AF37', fontSize: '1.5rem', marginBottom: '1rem' }}>11. SECURITY MEASURES</h2>
            <p style={{ marginBottom: '1rem' }}>We implement reasonable technical and organizational safeguards to protect data, including:</p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li>Secure servers</li>
              <li>Access controls</li>
              <li>Encrypted communications where applicable</li>
            </ul>
            <p>However, no system is 100% secure, and we cannot guarantee absolute security.</p>
          </div>
  
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#D4AF37', fontSize: '1.5rem', marginBottom: '1rem' }}>12. ACCOUNT TERMINATION & DATA LOSS</h2>
            <p style={{ marginBottom: '1rem' }}>If your account is suspended or terminated:</p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li>Access to Services will cease</li>
              <li>Unpaid rewards and active subscriptions are forfeited</li>
              <li>Certain data may be permanently deleted</li>
            </ul>
            <p>This action is irreversible.</p>
          </div>
  
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#D4AF37', fontSize: '1.5rem', marginBottom: '1rem' }}>13. YOUR RIGHTS</h2>
            <p style={{ marginBottom: '1rem' }}>Depending on applicable laws, you may have the right to:</p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your account</li>
              <li>Withdraw consent where applicable</li>
            </ul>
            <p>Requests may be subject to verification and legal limitations.</p>
          </div>
  
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#D4AF37', fontSize: '1.5rem', marginBottom: '1rem' }}>14. LIMITATION OF LIABILITY</h2>
            <p style={{ marginBottom: '1rem' }}>Luminix shall not be liable for:</p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li>Decisions made based on translated content</li>
              <li>Data loss due to user actions</li>
              <li>Unauthorized access beyond reasonable control</li>
            </ul>
            <p>Use of the Services is at your own risk.</p>
          </div>
  
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#D4AF37', fontSize: '1.5rem', marginBottom: '1rem' }}>15. GOVERNING LAW</h2>
            <p>This Privacy Policy shall be governed by and interpreted in accordance with the laws of the Republic of Cameroon.</p>
          </div>
  
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#D4AF37', fontSize: '1.5rem', marginBottom: '1rem' }}>16. CHANGES TO THIS PRIVACY POLICY</h2>
            <p style={{ marginBottom: '1rem' }}>We may update this Privacy Policy at any time.</p>
            <p style={{ marginBottom: '1rem' }}>Users will be notified via:</p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li>In-app notifications</li>
              <li>Email</li>
              <li>Website notices</li>
            </ul>
            <p>Continued use of the Services constitutes acceptance of the updated policy.</p>
          </div>
  
          <div>
            <h2 style={{ color: '#D4AF37', fontSize: '1.5rem', marginBottom: '1rem' }}>17. CONTACT US</h2>
            <p style={{ marginBottom: '1rem' }}>For privacy-related questions or requests, contact:</p>
            <p style={{ marginBottom: '0.5rem' }}>📧 contact@lauritalk.com</p>
            <p>📧 contact@luminix.space</p>
          </div>
        </div>
      </div>
    );
  }