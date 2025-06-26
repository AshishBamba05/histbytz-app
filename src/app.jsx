import HistBytz from './HistBytz';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    document.body.style.backgroundColor = '#000000';
    document.body.style.margin = 0;
    document.body.style.fontFamily = 'Segoe UI, sans-serif';
    document.body.style.color = '#f0f0f0';
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flexGrow: 1, padding: '2rem' }}>
        <HistBytz />
      </div>
      <footer style={{
        textAlign: 'center',
        padding: '1rem 0',
        borderTop: '1px solid #1e293b',
        fontSize: '0.9rem',
        color: '#94a3b8',
      }}>
        Creator: Ashish V Bamba
      </footer>
    </div>
  );
}
