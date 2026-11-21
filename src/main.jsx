import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Volume2, VolumeX, Sparkles, ArrowUpRight, ArrowLeft } from 'lucide-react';
import './styles.css';

const photos = [
  { file: 'photo-1.jpeg', note: 'one of my favourite days', className: 'photo-one' },
  { file: 'photo-2.jpeg', note: 'this little moment', className: 'photo-two' },
  { file: 'photo-3.jpeg', note: 'you + me', className: 'photo-three' },
  { file: 'photo-4.jpeg', note: 'a day worth keeping', className: 'photo-four' },
  { file: 'photo-5.jpeg', note: 'my favourite company', className: 'photo-five' },
  { file: 'photo-6.jpeg', note: 'another memory', className: 'photo-six' },
  { file: 'photo-7.jpg', note: 'just us', className: 'photo-seven' },
  { file: 'photo-8.jpg', note: 'always this', className: 'photo-eight' },
];


function useAmbientSound() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = async () => {
    try {
      if (!audioRef.current) {
        const AudioContext =
          window.AudioContext || window.webkitAudioContext;

        if (!AudioContext) {
          alert("Your browser does not support audio playback.");
          return;
        }

        const ctx = new AudioContext();

        const master = ctx.createGain();
        master.gain.value = 0;
        master.connect(ctx.destination);

        const notes = [110, 164.81, 220];

        const oscillators = notes.map((frequency, index) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = index === 0 ? "sine" : "triangle";
          osc.frequency.value = frequency;

          gain.gain.value = [0.12, 0.08, 0.06][index];

          osc.connect(gain);
          gain.connect(master);

          osc.start();

          return { osc, gain };
        });

        audioRef.current = {
          ctx,
          master,
          oscillators
        };
      }

      const { ctx, master } = audioRef.current;

      if (ctx.state !== "running") {
        await ctx.resume();
      }

      const next = !playing;

      master.gain.cancelScheduledValues(ctx.currentTime);

      master.gain.setTargetAtTime(
        next ? 0.65 : 0,
        ctx.currentTime,
        0.5
      );

      setPlaying(next);

    } catch (error) {
      console.error("Audio playback error:", error);
      alert("Unable to play audio. Please check your browser settings.");
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.oscillators.forEach(({ osc }) => {
          try {
            osc.stop();
          } catch (error) {
            // Oscillator may already be stopped.
          }
        });

        audioRef.current.ctx.close();
      }
    };
  }, []);

  return { playing, toggle };
}


function PhotoCard({ photo, index }) {
  const [loaded, setLoaded] = useState(true);
  return (
    <figure className={`photo-card ${photo.className}`} style={{ '--delay': `${index * 50}ms` }}>
      {loaded ? (
        <img src={`/photos/${photo.file}`} alt="A favourite memory together" onError={() => setLoaded(false)} />
      ) : (
        <div className="photo-placeholder">
          <span className="placeholder-star">✳</span>
          <span>Add your photo</span>
        </div>
      )}
      <figcaption>{photo.note}</figcaption>
    </figure>
  );
}

function App() {
  const [revealed, setRevealed] = useState(false);
  const [showGalaxyInfo, setShowGalaxyInfo] = useState(false);
  const [hubbleLoaded, setHubbleLoaded] = useState(true);
  const { playing, toggle } = useAmbientSound();

  const reveal = () => {
    setRevealed(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className={revealed ? 'app is-revealed' : 'app'}>
      {!revealed ? (
        <section className="memory-screen" aria-label="A collection of memories">
          <div className="grain" />
          <header className="topline"><span>MADE WITH LOVE</span><span>JUST FOR YOU <span className="tiny-heart">♥</span></span></header>
          <div className="intro-copy">
            <p className="eyebrow"><Sparkles size={13} strokeWidth={1.5} /> A LITTLE COLLECTION OF US</p>
            <h1>Some of my favourite<br /><em>moments have you in them.</em></h1>
            <p className="subcopy">A few memories, a little surprise, and one very special person.</p>
          </div>
          <div className="photo-field">
            {photos.map((photo, index) => <PhotoCard key={photo.file} photo={photo} index={index} />)}
            <span className="orbit orbit-a" /><span className="orbit orbit-b" />
          </div>
          <div className="surprise-area">
            <p>THERE'S ONE MORE THING I WANT YOU TO SEE</p>
            <button className="reveal-button" onClick={reveal}>Touch me to see the surprise <ArrowUpRight size={16} /></button>
            <span className="button-hint">go on, it's for you</span>
          </div>
          <footer className="footer-note">A LITTLE UNIVERSE OF OUR OWN <span>✦</span></footer>
        </section>
      ) : (
        <section className="cosmos-screen" aria-label="Birthday surprise">
          <button
            className="back-button"
            onClick={() => {
              setRevealed(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label="Go back to photo memories"
          >
            <ArrowLeft size={17} />
            <span>BACK TO OUR MEMORIES</span>
          </button>
          <div className="cosmic-glow" />
          <div className="stars" aria-hidden="true">
            {Array.from({ length: 65 }, (_, i) => <i key={i} style={{ '--x': `${(i * 37 + 11) % 100}%`, '--y': `${(i * 61 + 7) % 100}%`, '--d': `${(i % 5) * 0.7}s`, '--s': `${(i % 3) + 1}px` }} />)}
          </div>

          <div className="cosmos-content">
            <div className="cosmos-layout">

              {/* Left side - Birthday message */}
              <div className="birthday-message">
                <p className="cosmos-eyebrow">
                  SOMEWHERE IN THIS INFINITE UNIVERSE
                </p>

                <span className="little-star">✦</span>

                <h2>
                  You make my<br />
                  <em>little universe</em><br />
                  beautiful.
                </h2>

                <p>Happy Birthday, baby✧</p>
                <button
                  className="galaxy-info-button"
                  onClick={() => setShowGalaxyInfo(true)}
                >
                  wondering what this is? <span>↗</span>
                </button>
              </div>

              {/* Right side - Hubble image */}
              <div className="birthday-visual">
                <div className="hubble-frame">
                  {hubbleLoaded && (
                    <img
                      className="hubble-image"
                      src="/hubble.jpeg"
                      alt="Purple cosmic image from the Hubble Space Telescope"
                      onError={() => setHubbleLoaded(false)}
                    />
                  )}

                  {!hubbleLoaded && (
                    <div className="hubble-fallback">
                      Please check public/hubble.jpeg
                    </div>
                  )}

                  <div className="image-vignette" />
                </div>
              </div>

            </div>
          </div>


          {showGalaxyInfo && (
            <div
              className="galaxy-overlay"
              onClick={() => setShowGalaxyInfo(false)}
            >
              <div
                className="galaxy-info"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="galaxy-close"
                  onClick={() => setShowGalaxyInfo(false)}
                  aria-label="Close galaxy information"
                >
                  ×
                </button>

                <span className="info-eyebrow">
                  A SPECIAL COSMIC DISCOVERY
                </span>

                <h2>
                  This is what NASA's<br />
                  <em>Hubble saw...</em>
                </h2>

                <p className="galaxy-date-line">
                  On your birthday. ♡
                </p>

                <h2>
                  Meet <em>Abell 1795.</em>
                </h2>

                <p className="galaxy-description">
                  This isn't just a pretty picture of space.
                  It's a glimpse into a galaxy cluster,
                  hundreds of millions of light-years away.
                </p>

                <div className="galaxy-divider" />

                <h3>A universe full of wonders.</h3>

                <p>
                  At the heart of Abell 1795 lies a remarkable
                  cosmic phenomenon — a filament of cooling gas
                  stretching approximately 200,000 light-years.
                </p>

                <p>
                  As a massive galaxy moves through the
                  surrounding hot gas, its gravity creates
                  something like a cosmic wake.
                </p>

                <p>
                  The gas in this filament is around 30 million
                  degrees, cooler than the surrounding gas,
                  which reaches roughly 50 million degrees.
                </p>

                <div className="galaxy-fact">
                  <span>200,000</span>
                  <small>LIGHT-YEARS OF COSMIC FILAMENT</small>
                </div>

                <p className="galaxy-ending">
                  Somewhere, in all that vastness,
                  there's still so much left to discover.
                  <br />
                  <em>And you're my favourite discovery. ♡</em>
                </p>

                <span className="info-credit">
                  THE STORY OF ABELL 1795 · NASA / CHANDRA
                </span>
              </div>
            </div>
          )}


          <button className="sound-toggle" onClick={toggle} aria-label={playing ? 'Turn ambient sound off' : 'Turn ambient sound on'}>
            {playing ? <Volume2 size={17} /> : <VolumeX size={17} />}
            <span>{playing ? 'SOUND ON' : 'SOUND OFF'}</span>
          </button>
          <div className="cosmos-footer">WITH ALL MY LOVE <span>♥</span></div>
        </section>
      )}
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
