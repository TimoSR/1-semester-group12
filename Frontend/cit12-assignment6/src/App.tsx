import React, { useEffect, useState, useMemo } from 'react';
import './index.css';
import { searchPersons } from './api/tmdb';
import { PersonCard } from './components/PersonCard';
import type { TmdbPerson } from './types/tmdb';

const QUERY = 'spielberg';

export const App: React.FC = () => {
  const [persons, setPersons] = useState<TmdbPerson[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadPersons() {
      setLoading(true);
      setError(null);

      try {
        const results = await searchPersons(QUERY);
        if (!cancelled) {
          setPersons(results);
          setSelectedIndex(0);
          console.log('TMDB person search results:', results);
        }
      } catch (err) {
        if (!cancelled) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('Unknown error while searching for persons.');
          }
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadPersons();
    return () => { cancelled = true; };
  }, []);

  const hasPersons = persons.length > 0;
  const currentPerson = hasPersons ? persons[selectedIndex] : null;

  const canGoPrev = selectedIndex > 0;
  const canGoNext = selectedIndex < persons.length - 1;

  const handlePrev = () => {
    if (canGoPrev) {
      setSelectedIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      setSelectedIndex((prev) => prev + 1);
    }
  };

  const handleJumpTo = (index: number) => {
    if (index >= 0 && index < persons.length) {
      setSelectedIndex(index);
    }
  };

  // ------------------------------------------------------------
  // ADVANCED PAGINATION LOGIC → 1 ... 4 5 6 7 8 ... 20
  // ------------------------------------------------------------

  const pagination = useMemo(() => {
    const total = persons.length;
    const current = selectedIndex + 1;

    if (total <= 10) {
      return [...Array(total)].map((_, i) => i + 1);
    }

    const pages: (number | 'ellipsis')[] = [];
    const add = (n: number | 'ellipsis') => pages.push(n);

    add(1);

    if (current > 4) add('ellipsis');

    const start = Math.max(2, current - 2);
    const end = Math.min(total - 1, current + 2);

    for (let p = start; p <= end; p++) {
      add(p);
    }

    if (current < total - 3) add('ellipsis');

    add(total);

    return pages;
  }, [persons.length, selectedIndex]);

  // ------------------------------------------------------------

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>TMDB Person Browser</h1>
        <p className="app-subtitle">
          Query: <code>{QUERY}</code>
        </p>
      </header>

      {loading && <p className="info">Loading persons…</p>}
      {error && <p className="error">Error: {error}</p>}

      {!loading && !error && !hasPersons && (
        <p className="info">No persons found for this query.</p>
      )}

      {!loading && !error && hasPersons && currentPerson && (
        <>
          <section className="navigation">
            <div className="nav-buttons">
              <button onClick={handlePrev} disabled={!canGoPrev}>
                ◀ Previous
              </button>
              <span className="nav-status">
                {selectedIndex + 1} / {persons.length}
              </span>
              <button onClick={handleNext} disabled={!canGoNext}>
                Next ▶
              </button>
            </div>

            {/* ----------------- COMPRESSED PAGINATION ----------------- */}
            <div className="nav-indices">
              {pagination.map((entry, i) => {
                if (entry === 'ellipsis') {
                  return (
                    <span key={`ellipsis-${i}`} className="ellipsis">
                      ...
                    </span>
                  );
                }

                const index = entry - 1;
                const isActive = index === selectedIndex;

                return (
                  <button
                    key={`page-${entry}`}
                    className={isActive ? 'index-button active' : 'index-button'}
                    onClick={() => handleJumpTo(index)}
                  >
                    {entry}
                  </button>
                );
              })}
            </div>
            {/* ---------------------------------------------------------- */}
          </section>

          <main>
            <PersonCard person={currentPerson} />
          </main>
        </>
      )}
    </div>
  );
};