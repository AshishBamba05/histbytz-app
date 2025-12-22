import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import './index.css';

export default function EraView() {
  const [dateInput, setDateInput] = useState('');
  const [keywordInput, setKeywordInput] = useState('');
  const [narratives, setNarratives] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [suggestion, setSuggestion] = useState(null);
  const [loading, setLoading] = useState(false);

  const [allEvents, setAllEvents] = useState([]);
  const [bootError, setBootError] = useState(null);

  const isISODate = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s);

  const normalizeEvent = (e) => ({
    title: e.title,
    narrative: e.narrative,
    image: e.image,
    kind: e.kind,
    date: e.date,
    start: e.start,
    end: e.end,
    id: e.id,
    _id: e._id,
  });

  useEffect(() => {
    const boot = async () => {
      setBootError(null);
      try {
        const res = await fetch('/api/events');
        if (!res.ok) throw new Error(`GET /api/events failed: ${res.status}`);
        const data = await res.json();
        setAllEvents(Array.isArray(data) ? data.map(normalizeEvent) : []);
      } catch (err) {
        console.error(err);
        setBootError('Failed to load events from server.');
        setAllEvents([]);
      }
    };
    boot();
  }, []);

  const allNarratives = useMemo(() => allEvents, [allEvents]);

  const filterByDate = (isoDate) => {
    const d = new Date(isoDate);
    if (Number.isNaN(d.getTime())) return [];

    const matches = [];

    for (const e of allEvents) {
      if (e.kind === 'specific' && e.date === isoDate) {
        matches.push(e);
      }
      if (e.kind === 'general' && e.start && e.end) {
        const start = new Date(e.start);
        const end = new Date(e.end);
        if (!Number.isNaN(start.getTime()) && !Number.isNaN(end.getTime())) {
          if (d >= start && d <= end) matches.push(e);
        }
      }
    }

    return matches;
  };

  const handleSubmit = async (e, qOverride) => {
    e?.preventDefault?.();
    setHasSearched(true);
    setSuggestion(null);
    setLoading(true);

    try {
      const date = dateInput.trim();
      const q = (qOverride ?? keywordInput).trim();

      // 1) If user provided a valid date, do date match first
      if (isISODate(date)) {
        const matches = filterByDate(date);
        if (matches.length > 0) {
          setNarratives(matches);
          return;
        }
      }

      // 2) If no keyword, clear results
      if (!q) {
        setNarratives([]);
        return;
      }

      // 3) Backend fuzzy search
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      if (!res.ok) throw new Error(`GET /api/search failed: ${res.status}`);
      const data = await res.json();

      if (data.results?.length) {
        setNarratives(data.results.map(normalizeEvent));
        setSuggestion(null);
      } else if (data.suggestion) {
        setNarratives([]);
        setSuggestion(data.suggestion);
      } else {
        setNarratives([]);
        setSuggestion(null);
      }
    } catch (err) {
      console.error('Search error:', err);
      setNarratives([]);
      setSuggestion(null);
    } finally {
      setLoading(false);
    }
  };

  const acceptSuggestion = async () => {
    if (!suggestion) return;
    setKeywordInput(suggestion);
    await handleSubmit(null, suggestion);
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

      {bootError && <p>{bootError}</p>}
      {loading && <p>Searching…</p>}

{suggestion && !loading && (
  <div className="suggestion-card">
    <span className="suggestion-label">Did you mean</span>
    <button
      type="button"
      onClick={acceptSuggestion}
      className="suggestion-word"
    >
      {suggestion}
    </button>
    <span className="suggestion-q">?</span>
  </div>
)}




      {displayList.length > 0 ? (
        displayList.map((narrative, idx) => (
          <motion.div
            key={narrative._id || narrative.id || idx}
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
        hasSearched &&
        !loading &&
        !suggestion && (
          <div className="no-data">
            <h2>No Data Found</h2>
            <p>Sorry, we don't have a POV story for this date or topic yet.</p>
          </div>
        )
      )}
    </div>
  );
}
