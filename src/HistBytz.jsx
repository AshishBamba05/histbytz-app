import { useState } from 'react';
import { motion } from 'framer-motion';
import './index.css';
import { specificEvents, generalPeriods } from './data/events';

export default function EraView() {
  const [dateInput, setDateInput] = useState('');
  const [keywordInput, setKeywordInput] = useState('');
  const [narratives, setNarratives] = useState([]);   // what you render
  const [hasSearched, setHasSearched] = useState(false);
  const [suggestion, setSuggestion] = useState(null); // "Did you mean …?"
  const [loading, setLoading] = useState(false);

  // Optional: show everything by default
  const allNarratives = [
    ...Object.values(specificEvents),
    ...generalPeriods.map(p => ({ title: p.title, narrative: p.narrative, image: p.image }))
  ];

const isISODate = s => /^\d{4}-\d{2}-\d{2}$/.test(s);

// put these in HistBytz.jsx (replace your current versions)

const handleSubmit = async (e, qOverride) => {
  e?.preventDefault?.();
  setHasSearched(true);
  setSuggestion(null);
  setLoading(true);

  try {
    // 1) Local date match
    const matches = [];
    if (isISODate(dateInput)) {
      for (const [date, event] of Object.entries(specificEvents)) {
        if (date === dateInput) matches.push(event);
      }
      const d = new Date(dateInput);
      for (const p of generalPeriods) {
        if (d >= new Date(p.start) && d <= new Date(p.end)) {
          matches.push({ title: p.title, narrative: p.narrative, image: p.image });
        }
      }
      if (matches.length > 0) {
        setNarratives(matches);
        setLoading(false);
        return;
      }
    }

    // 2) Backend fuzzy search
    const q = (qOverride ?? keywordInput).trim();
    if (!q) {
      setNarratives([]);
      setLoading(false);
      return;
    }

    // replace the existing fetch line
    const res = await fetch(`/search?q=${encodeURIComponent(q)}`);

    const data = await res.json();

    if (data.results?.length) {
      setNarratives(data.results);
      setSuggestion(null);
    } else if (data.suggestion) {
      setNarratives([]);
      setSuggestion(data.suggestion);
    } else {
      setNarratives([]);
      setSuggestion(null);
    }
  } catch (err) {
    console.error("Search error:", err);
    setNarratives([]);
    setSuggestion(null);
  } finally {
    setLoading(false);
  }
};

const acceptSuggestion = async () => {
  if (!suggestion) return;
  setKeywordInput(suggestion);          // update the input box
  await handleSubmit(null, suggestion); // search with the suggestion now
};


  const displayList = hasSearched ? narratives : allNarratives;

  return (
    <div className="container">
      <div className="header" style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 className="flag-text">HistBytz</h1>
        <p className="small-flag">
          Every era has a story—step into it. <br />
          Search a date. Enter the scene.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="search-bar" style={{ marginBottom: 16 }}>
        <input
          type="date"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
          style={{ marginRight: 10, padding: '0.5em', width: 200 }}
        />
        <input
          type="text"
          placeholder="Search topic (e.g., Lincoln, WW2)"
          value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}
          style={{ marginRight: 10, padding: '0.5em', width: 300 }}
        />
        <button type="submit">See Scene</button>
      </form>

      {loading && <p>Searching…</p>}

      {suggestion && !loading && (
  <p style={{ marginBottom: 12, color: '#fff' }}>
    Did you mean{' '}
    <button
      type="button"
      onClick={acceptSuggestion}
      style={{
        color: '#93c5fd',       // visible on dark bg
        fontWeight: 700,
        textDecoration: 'underline',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        appearance: 'none',
      }}
    >
      {suggestion}
    </button>
    ?
  </p>
)}


      {displayList.length > 0 ? (
        displayList.map((narrative, idx) => (
          <motion.div
            key={idx}
            className="story-card"
            style={{
              backgroundColor: '#1e293b',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              marginBottom: '1.5rem',
              transition: 'transform 0.2s ease',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
          >
            <h2>{narrative.title}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {narrative.image && (
                <img
                  src={narrative.image}
                  alt={narrative.title}
                  style={{
                    maxWidth: '250px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    flexShrink: 0,
                  }}
                />
              )}
              <p style={{ flex: 1 }}>{narrative.narrative}</p>
            </div>
          </motion.div>
        ))
      ) : (
        hasSearched && !loading && !suggestion && (
          <div className="no-data">
            <h2>No Data Found</h2>
            <p>Sorry, we don't have a POV story for this date or topic yet.</p>
          </div>
        )
      )}
    </div>
  );
}
