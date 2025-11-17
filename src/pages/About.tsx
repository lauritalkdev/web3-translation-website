import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();

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
        padding: '3rem 1rem'
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

        {/* Lauritalk App */}
        <div style={{ 
          backgroundColor: '#1a1a1a', 
          padding: '2.5rem', 
          borderRadius: '1rem',
          border: '2px solid #3B82F6',
          marginBottom: '2.5rem',
          textAlign: 'center',
          boxShadow: '0 0 15px #3B82F6, 0 0 30px rgba(59, 130, 246, 0.3), inset 0 0 15px rgba(59, 130, 246, 0.1)',
          transform: 'perspective(1000px) rotateX(1deg)'
        }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#D4AF37', marginBottom: '1.5rem', textShadow: '0 0 8px #D4AF37' }}>
            🚀 What is Lauritalk?
          </h2>
          <p style={{ color: '#E5E7EB', lineHeight: '1.8', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto' }}>
            Lauritalk is an AI-powered, Web3-enabled language translation platform designed to break communication barriers worldwide. 
            Built with cutting-edge AI and inclusive communication technologies, we empower users to translate text, voice, gesture, 
            and sign language seamlessly across <strong style={{color: '#228B22', textShadow: '0 0 5px #228B22'}}>120+ global and local languages</strong>.
          </p>
        </div>

        {/* Who We Are */}
        <div style={{ 
          backgroundColor: '#1a1a1a', 
          padding: '2.5rem', 
          borderRadius: '1rem',
          border: '2px solid #3B82F6',
          marginBottom: '2.5rem',
          textAlign: 'center',
          boxShadow: '0 0 15px #3B82F6, 0 0 30px rgba(59, 130, 246, 0.3), inset 0 0 15px rgba(59, 130, 246, 0.1)',
          transform: 'perspective(1000px) rotateX(-1deg)'
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
        <div style={{ 
          backgroundColor: '#1a1a1a', 
          padding: '2.5rem', 
          borderRadius: '1rem',
          border: '2px solid #3B82F6',
          marginBottom: '2.5rem',
          textAlign: 'center',
          boxShadow: '0 0 15px #3B82F6, 0 0 30px rgba(59, 130, 246, 0.3), inset 0 0 15px rgba(59, 130, 246, 0.1)',
          transform: 'perspective(1000px) rotateX(1deg)'
        }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#D4AF37', marginBottom: '1.5rem', textShadow: '0 0 8px #D4AF37' }}>
            👨‍💻 Our Leadership
          </h2>
          <p style={{ color: '#E5E7EB', lineHeight: '1.8', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto' }}>
            Led by <strong style={{color: '#228B22'}}>Ebong Eric E.</strong>, Lead Developer at Luminix, whose vision is to build technology that gives everyone a voice. 
            Merging AI, blockchain, and human-centered design to create breakthrough systems. 💡
          </p>
        </div>

        {/* What We Do */}
        <div style={{ 
          backgroundColor: '#1a1a1a', 
          padding: '2.5rem', 
          borderRadius: '1rem',
          border: '2px solid #3B82F6',
          marginBottom: '2.5rem',
          textAlign: 'center',
          boxShadow: '0 0 15px #3B82F6, 0 0 30px rgba(59, 130, 246, 0.3), inset 0 0 15px rgba(59, 130, 246, 0.1)',
          transform: 'perspective(1000px) rotateX(-1deg)'
        }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#228B22', marginBottom: '1.5rem', textShadow: '0 0 8px #228B22' }}>
            🌟 What Lauritalk Does
          </h2>
          <p style={{ color: '#E5E7EB', lineHeight: '1.8', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto 1.5rem' }}>
            More than just translation—it's a complete communication ecosystem! 🎯
          </p>
          <div style={{ display: 'inline-block', textAlign: 'left', maxWidth: '600px' }}>
            <ul style={{ color: '#E5E7EB', lineHeight: '1.8', fontSize: '1.1rem' }}>
              <li>🌐 Translation of 120+ international languages</li>
              <li>🔄 Local dialect ↔ International language translation</li>
              <li>👋 Gesture-to-Voice/Text translation</li>
              <li>🤟 Sign-Language-to-Voice/Text translation</li>
              <li>🎯 Enhanced accessibility for impaired communities</li>
            </ul>
          </div>
        </div>

        {/* Who We Serve */}
        <div style={{ 
          backgroundColor: '#1a1a1a', 
          padding: '2.5rem', 
          borderRadius: '1rem',
          border: '2px solid #3B82F6',
          marginBottom: '2.5rem',
          textAlign: 'center',
          boxShadow: '0 0 15px #3B82F6, 0 0 30px rgba(59, 130, 246, 0.3), inset 0 0 15px rgba(59, 130, 246, 0.1)',
          transform: 'perspective(1000px) rotateX(1deg)'
        }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#D4AF37', marginBottom: '1.5rem', textShadow: '0 0 8px #D4AF37' }}>
            👥 Who We Serve
          </h2>
          <p style={{ color: '#E5E7EB', lineHeight: '1.8', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto 1.5rem' }}>
            Designed for <strong style={{color: '#228B22'}}>everyone</strong>, especially:
          </p>
          <div style={{ display: 'inline-block', textAlign: 'left', maxWidth: '600px' }}>
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
        <div style={{ 
          backgroundColor: '#1a1a1a', 
          padding: '2.5rem', 
          borderRadius: '1rem',
          border: '2px solid #3B82F6',
          marginBottom: '2.5rem',
          textAlign: 'center',
          boxShadow: '0 0 15px #3B82F6, 0 0 30px rgba(59, 130, 246, 0.3), inset 0 0 15px rgba(59, 130, 246, 0.1)',
          transform: 'perspective(1000px) rotateX(-1deg)'
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
        <div style={{ 
          backgroundColor: '#1a1a1a', 
          padding: '2.5rem', 
          borderRadius: '1rem',
          border: '2px solid #3B82F6',
          textAlign: 'center',
          boxShadow: '0 0 15px #3B82F6, 0 0 30px rgba(59, 130, 246, 0.3), inset 0 0 15px rgba(59, 130, 246, 0.1)',
          transform: 'perspective(1000px) rotateX(1deg)'
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
    </div>
  );
}