import { useNavigate } from 'react-router-dom';
import GlobalAIImage from '../assets/images/global-ai-network.jpg';
import InclusiveImage from '../assets/images/inclusive-communication.jpg';

export default function About() {
  const navigate = useNavigate();

  const openLinkedIn = () => {
    window.open('https://www.linkedin.com/company/luminixspace/', '_blank');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#000000', 
      color: '#ffffff',
      width: '100%',
      overflowX: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Viewport Meta for Mobile */}
      <style>
        {`
          @media (max-width: 768px) {
            body {
              margin: 0;
              padding: 0;
              width: 100%;
              overflow-x: hidden;
            }
            html {
              margin: 0;
              padding: 0;
              width: 100%;
              overflow-x: hidden;
            }
          }
        `}
      </style>

      {/* Navigation */}
      <nav style={{ 
        backgroundColor: '#000000', 
        borderBottom: '1px solid #D4AF37', 
        padding: '1rem 0',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{ 
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          width: '100%',
          boxSizing: 'border-box'
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

      {/* Main Content */}
      <div style={{ 
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '3rem 1rem',
        flex: '1',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          color: '#D4AF37', 
          textAlign: 'center', 
          marginBottom: '3rem',
          textShadow: '0 0 10px #D4AF37, 0 0 20px #D4AF37'
        }}>
          About Lauritalk 🌍
        </h1>

        {/* Lauritalk App with Professional Image Layout */}
        <div className="breathing-box" style={{ 
          backgroundColor: '#1a1a1a', 
          padding: '2.5rem', 
          borderRadius: '1rem',
          border: '2px solid #3B82F6',
          marginBottom: '2.5rem',
          transform: 'perspective(1000px) rotateX(1deg)',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#D4AF37', textAlign: 'center', textShadow: '0 0 8px #D4AF37' }}>
              🚀 What is Lauritalk?
            </h2>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ flex: '1', minWidth: '300px', width: '100%' }}>
                <img 
                  src={GlobalAIImage} 
                  alt="Global AI Translation Network"
                  style={{
                    width: '100%',
                    borderRadius: '0.5rem',
                    border: '2px solid #3B82F6',
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
                    maxWidth: '100%',
                    height: 'auto'
                  }}
                />
              </div>
              <div style={{ flex: '1', minWidth: '300px', width: '100%' }}>
                <p style={{ color: '#E5E7EB', lineHeight: '1.8', fontSize: '1.1rem' }}>
                  Lauritalk is an AI-powered, Web3 inclusive language translation platform designed to break communication barriers worldwide. 
                  Built with cutting-edge AI and inclusive communication technologies, we empower users to translate text, voice, gesture, 
                  and sign language seamlessly across <strong style={{color: '#228B22', textShadow: '0 0 5px #228B22'}}>120+ global and local languages</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Who We Are */}
        <div className="breathing-box" style={{ 
          backgroundColor: '#1a1a1a', 
          padding: '2.5rem', 
          borderRadius: '1rem',
          border: '2px solid #3B82F6',
          marginBottom: '2.5rem',
          textAlign: 'center',
          animationDelay: '0.5s',
          transform: 'perspective(1000px) rotateX(-1deg)',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#228B22', marginBottom: '1.5rem', textShadow: '0 0 8px #228B22' }}>
            🏢 Who We Are
          </h2>
          <p style={{ color: '#E5E7EB', lineHeight: '1.8', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto' }}>
            Lauritalk is a flagship product of <strong style={{color: '#D4AF37'}}>Luminix</strong>, a forward-thinking tech company focused on building 
            AI and Web3 solutions that address real-world challenges. Where innovation meets purpose! 🎯
          </p>
        </div>

        {/* Leadership */}
        <div className="breathing-box" style={{ 
          backgroundColor: '#1a1a1a', 
          padding: '2.5rem', 
          borderRadius: '1rem',
          border: '2px solid #3B82F6',
          marginBottom: '2.5rem',
          textAlign: 'center',
          animationDelay: '1s',
          transform: 'perspective(1000px) rotateX(1deg)',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#D4AF37', marginBottom: '1.5rem', textShadow: '0 0 8px #D4AF37' }}>
            👨‍💻 Our Leadership
          </h2>
          <p style={{ color: '#E5E7EB', lineHeight: '1.8', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto' }}>
            Led by <strong style={{color: '#228B22'}}>Ebong Eric E.</strong>, Lead Developer at Luminix, whose vision is to build technology that gives everyone a voice. 
            Merging AI, blockchain, and human-centered design to create breakthrough systems. 💡
          </p>
        </div>

        {/* What We Do with Professional Image Layout */}
        <div className="breathing-box" style={{ 
          backgroundColor: '#1a1a1a', 
          padding: '2.5rem', 
          borderRadius: '1rem',
          border: '2px solid #3B82F6',
          marginBottom: '2.5rem',
          animationDelay: '1.5s',
          transform: 'perspective(1000px) rotateX(-1deg)',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#228B22', textAlign: 'center', textShadow: '0 0 8px #228B22' }}>
              🌟 What Lauritalk Does
            </h2>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap-reverse' }}>
              <div style={{ flex: '1', minWidth: '300px', width: '100%' }}>
                <p style={{ color: '#E5E7EB', lineHeight: '1.8', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                  More than just translation—it's a complete communication ecosystem! 🎯
                </p>
                <ul style={{ color: '#E5E7EB', lineHeight: '1.8', fontSize: '1.1rem', paddingLeft: '1.5rem' }}>
                  <li>🌐 Translation of 120+ international languages</li>
                  <li>🔄 Local dialect ↔ International language translation</li>
                  <li>👋 Gesture-to-Voice/Text translation</li>
                  <li>🤟 Sign-Language-to-Voice/Text translation</li>
                  <li>🎯 Enhanced accessibility for impaired communities</li>
                </ul>
              </div>
              <div style={{ flex: '1', minWidth: '300px', width: '100%' }}>
                <img 
                  src={InclusiveImage} 
                  alt="Inclusive Communication & Accessibility Scene"
                  style={{
                    width: '100%',
                    borderRadius: '0.5rem',
                    border: '2px solid #228B22',
                    boxShadow: '0 0 20px rgba(34, 139, 34, 0.5)',
                    maxWidth: '100%',
                    height: 'auto'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Who We Serve */}
        <div className="breathing-box" style={{ 
          backgroundColor: '#1a1a1a', 
          padding: '2.5rem', 
          borderRadius: '1rem',
          border: '2px solid #3B82F6',
          marginBottom: '2.5rem',
          textAlign: 'center',
          animationDelay: '2s',
          transform: 'perspective(1000px) rotateX(1deg)',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#D4AF37', marginBottom: '1.5rem', textShadow: '0 0 8px #D4AF37' }}>
            👥 Who We Serve
          </h2>
          <p style={{ color: '#E5E7EB', lineHeight: '1.8', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto 1.5rem' }}>
            Designed for <strong style={{color: '#228B22'}}>everyone</strong>, especially:
          </p>
          <div style={{ display: 'inline-block', textAlign: 'left', maxWidth: '600px', width: '100%' }}>
            <ul style={{ color: '#E5E7EB', lineHeight: '1.8', fontSize: '1.1rem' }}>
              <li>✈️ International travelers & migrants</li>
              <li>🎓 International students</li>
              <li>👁️ Visually impaired individuals</li>
              <li>🗣️ Speech & hearing-impaired persons</li>
              <li>🏢 Businesses communicating across languages</li>
            </ul>
          </div>
          <p style={{ color: '#E5E7EB', lineHeight: '1.8', fontSize: '1.1rem', maxWidth: '800px', margin: '1.5rem auto 0' }}>
            Ensuring <strong style={{color: '#228B22', textShadow: '0 0 5px #228B22'}}>no one is left behind</strong>! 🌍
          </p>
        </div>

        {/* Web3 Integration */}
        <div className="breathing-box" style={{ 
          backgroundColor: '#1a1a1a', 
          padding: '2.5rem', 
          borderRadius: '1rem',
          border: '2px solid #3B82F6',
          marginBottom: '2.5rem',
          textAlign: 'center',
          animationDelay: '2.5s',
          transform: 'perspective(1000px) rotateX(-1deg)',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#228B22', marginBottom: '1.5rem', textShadow: '0 0 8px #228B22' }}>
            ⛓️ Web3 Power
          </h2>
          <p style={{ color: '#E5E7EB', lineHeight: '1.8', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto' }}>
            Lauritalk integrates Web3 for: <strong style={{color: '#D4AF37'}}>secure data interactions</strong>, 
            <strong style={{color: '#D4AF37'}}> privacy-driven communication</strong>, and <strong style={{color: '#D4AF37'}}>transparent AI systems</strong>. 
            Giving users more control and trust! 🔒
          </p>
        </div>

        {/* Vision & Contact */}
        <div className="breathing-box" style={{ 
          backgroundColor: '#1a1a1a', 
          padding: '2.5rem', 
          borderRadius: '1rem',
          border: '2px solid #3B82F6',
          textAlign: 'center',
          animationDelay: '3s',
          transform: 'perspective(1000px) rotateX(1deg)',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#D4AF37', marginBottom: '1.5rem', textShadow: '0 0 8px #D4AF37' }}>
            🎯 Our Vision & Contact
          </h2>
          <p style={{ color: '#E5E7EB', lineHeight: '1.8', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto 1.5rem' }}>
            To become the world's most <strong style={{color: '#228B22'}}>inclusive, intelligent, and human-centered communication platform</strong>— 
            empowering every person, everywhere, to connect without barriers. 🌈
          </p>
          <p style={{ color: '#E5E7EB', lineHeight: '1.8', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto' }}>
            <strong style={{color: '#D4AF37'}}>Join us</strong> as we redefine global communication and make the world more inclusive—one translation at a time! 🚀
          </p>
        </div>
      </div>

      {/* Professional Footer */}
      <footer style={{
        backgroundColor: '#000000',
        borderTop: '2px solid #D4AF37',
        padding: '2rem 1rem',
        marginTop: 'auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          {/* Company Info */}
          <div style={{ textAlign: 'center', width: '100%' }}>
            <h3 style={{ 
              color: '#D4AF37', 
              fontSize: '1.25rem', 
              fontWeight: 'bold',
              marginBottom: '0.5rem'
            }}>
              Web3 Translate by Luminix
            </h3>
            <p style={{ 
              color: '#9CA3AF', 
              fontSize: '0.9rem',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              Breaking language barriers with AI-powered, Web3-secure translation technology for a more connected world.
            </p>
          </div>

          {/* Social Links - Professional LinkedIn Icon */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <p style={{ color: '#E5E7EB', fontSize: '0.9rem', margin: 0 }}>
              Connect with us:
            </p>
            <button 
              onClick={openLinkedIn}
              style={{
                background: 'transparent',
                border: '1px solid #0A66C2',
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '6px',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                color: '#0A66C2'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#0A66C2';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#0A66C2';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {/* LinkedIn Icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19ZM18.5 18.5V13.2C18.5 12.3354 18.1565 11.5062 17.5452 10.8948C16.9338 10.2835 16.1046 9.94 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17C14.6813 12.17 15.0374 12.3175 15.2999 12.5801C15.5625 12.8426 15.71 13.1987 15.71 13.57V18.5H18.5ZM6.88 8.56C7.32556 8.56 7.75288 8.383 8.06794 8.06794C8.383 7.75288 8.56 7.32556 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19C6.43178 5.19 6.00193 5.36805 5.68499 5.68499C5.36805 6.00193 5.19 6.43178 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56ZM8.27 18.5V10.13H5.5V18.5H8.27Z" fill="currentColor"/>
              </svg>
            </button>
          </div>

          {/* Copyright */}
          <div style={{ textAlign: 'center', width: '100%' }}>
            <p style={{ 
              color: '#6B7280', 
              fontSize: '0.8rem',
              borderTop: '1px solid #374151',
              paddingTop: '1rem',
              width: '100%',
              margin: 0
            }}>
              © {new Date().getFullYear()} Luminix. All rights reserved. 
              Building the future of inclusive communication.
            </p>
          </div>
        </div>
      </footer>

      <style>
        {`
          .breathing-box {
            animation: breathing 3s ease-in-out infinite;
            box-shadow: 0 0 5px #3B82F6, 0 0 20px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4), inset 0 0 10px rgba(59, 130, 246, 0.2);
          }
          
          @keyframes breathing {
            0% {
              box-shadow: 0 0 5px #3B82F6, 0 0 20px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4), inset 0 0 10px rgba(59, 130, 246, 0.2);
            }
            50% {
              box-shadow: 0 0 15px #3B82F6, 0 0 30px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.6), inset 0 0 15px rgba(59, 130, 246, 0.3);
            }
            100% {
              box-shadow: 0 0 5px #3B82F6, 0 0 20px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4), inset 0 0 10px rgba(59, 130, 246, 0.2);
            }
          }

          /* Mobile-specific fixes */
          @media (max-width: 768px) {
            .breathing-box {
              padding: 1.5rem !important;
              margin-bottom: 1.5rem !important;
            }
            
            h1 {
              font-size: 2rem !important;
              margin-bottom: 2rem !important;
            }
            
            h2 {
              font-size: 1.5rem !important;
            }
            
            p, li {
              font-size: 1rem !important;
            }
          }
        `}
      </style>
    </div>
  );
}