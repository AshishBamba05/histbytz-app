// src/App.jsx
import EraView from './EraView';
import JeffersonBot from './JeffersonBot';

export default function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <EraView />
      </div>
      <div style={{ flex: 1, borderTop: '2px solid #333', padding: '1em', overflowY: 'auto' }}>
        <JeffersonBot />
      </div>
    </div>
  );
}
