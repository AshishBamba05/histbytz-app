import HistBytz from './HistBytz';
import { useEffect } from 'react';

const bgStyle = {
  position: 'fixed',
  inset: 0,
  zIndex: -1,             // keep it behind everything
  pointerEvents: 'none',  // don't block clicks/scroll
};

const appShellStyle = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  zIndex: 0,              // create a stacking context above bg
};

const mainStyle = { flexGrow: 1, padding: '2rem' };

const footerStyle = {
  textAlign: 'center',
  padding: '1rem 0',
  background: 'linear-gradient(180deg, rgba(30,41,59,0.85), rgba(0,0,0,0.95))',
  borderTop: '1px solid rgba(255,255,255,0.2)',
  fontSize: '0.9rem',
  color: '#ffffff',
  textShadow: '0 0 5px rgba(255,255,255,0.3)',
  animation: 'fadeIn 1.5s ease-in',
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  zIndex: 10,
};

const linkStyle = {
  color: '#00aced',
  margin: '0 10px',
  textDecoration: 'underline',
  transition: 'color 0.3s ease',
};

const linkHoverStyle = {
  color: '#00aced', // light blue on hover
};



export default function App() {
  useEffect(() => {
    document.body.style.backgroundColor = '#000000';
    document.body.style.margin = 0;
    document.body.style.fontFamily = 'Segoe UI, sans-serif';
    document.body.style.color = '#f0f0f0';
  }, []);

  return (
    <>
      <div className="slideshow-background" style={bgStyle} />
      <div style={appShellStyle}>
        <div style={mainStyle}>
          <HistBytz />
        </div>
        <footer style={footerStyle}>
  Creator: Ashish V Bamba | 
  <a href="mailto:ashishvbamba@gmail.com" style={linkStyle}>Email</a> | 
  <a href="https://github.com/AshishBamba05" style={linkStyle}>GitHub</a> | 
  <a href="https://linkedin.com/in/ashishbamba" style={linkStyle}>LinkedIn</a>
</footer>

      </div>
    </>
  );
}
