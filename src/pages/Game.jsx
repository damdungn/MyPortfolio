// src/pages/Game.jsx
import { motion } from 'framer-motion'
import '../styles/Game.css'
import Runner from '../games/Runner/Runner'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] },
  },
}

function Reveal({ as: As = motion.div, delay = 0, className, children }) {
  return (
    <As
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
    >
      {children}
    </As>
  )
}

// Same mushroom field as the Home hero
const MUSHROOMS = [
  { left: 4, scale: 1.1, type: 'fly-agaric' },
  { left: 14, scale: 0.7, type: 'brown' },
  { left: 24, scale: 0.5, type: 'brown' },
  { left: 36, scale: 1.3, type: 'fly-agaric' },
  { left: 50, scale: 0.6, type: 'tan' },
  { left: 62, scale: 0.9, type: 'brown' },
  { left: 74, scale: 1.2, type: 'fly-agaric' },
  { left: 84, scale: 0.55, type: 'tan' },
  { left: 93, scale: 0.8, type: 'brown' },
]

// ✏️ Replace with your games as you implement them
const GAMES = [
  {
    title: 'Forest Run',
    description: 'An endless runner inspired by the Chrome offline dino game.',
    component: Runner,
  },
  { title: 'Coming soon', description: 'A game I like, reimplemented.' },
]

export function MushroomBackground() {
  return (
    <div className="game-bg">
      <div className="game-sky" />

      <div className="game-hills far">
        <svg viewBox="0 0 1440 300" preserveAspectRatio="none">
          <path d="M0,200 C260,120 520,230 780,160 C1040,100 1260,190 1440,150 L1440,300 L0,300 Z" />
        </svg>
      </div>
      <div className="game-hills mid">
        <svg viewBox="0 0 1440 300" preserveAspectRatio="none">
          <path d="M0,220 C300,140 500,240 760,180 C1000,130 1200,220 1440,170 L1440,300 L0,300 Z" />
        </svg>
      </div>
      <div className="game-hills near">
        <svg viewBox="0 0 1440 300" preserveAspectRatio="none">
          <path d="M0,180 C300,80 500,220 760,140 C1000,70 1200,180 1440,120 L1440,300 L0,300 Z" />
        </svg>
      </div>

      <div className="game-treeline">
        {Array.from({ length: 16 }).map((_, i) => (
          <span key={i} className="game-tree" style={{ left: `${i * 6.6}%`, height: 60 + (i % 3) * 22 }} />
        ))}
      </div>

      <div className="game-fog" />

      <div className="game-mushroom-row">
        {MUSHROOMS.map((m, i) => (
          <div key={i} className={`game-mushroom ${m.type}`} style={{ left: `${m.left}%`, transform: `scale(${m.scale})` }}>
            <div className="cap">
              {m.type === 'fly-agaric' && (
                <>
                  <span className="dot d1" />
                  <span className="dot d2" />
                  <span className="dot d3" />
                </>
              )}
            </div>
            <div className="stem" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Game() {
  return (
    <>
      <MushroomBackground />

      <main className="game-page">
        <Reveal className="game-header">
          <p className="game-section-label">Play</p>
          <h1>Game</h1>
          <p className="game-subtitle">Game(s) that I like and reimplement them!</p>
        </Reveal>

        <div className="game-list">
          {GAMES.map((game, i) => {
            const GameComponent = game.component
            return (
              <Reveal key={i} delay={i * 0.08} className={`game-block${GameComponent ? ' game-block--playable' : ''}`}>
                {game.title && <h3 className="game-title">{game.title}</h3>}
                {game.description && <p className="game-description">{game.description}</p>}
                {GameComponent && <GameComponent />}
              </Reveal>
            )
          })}
        </div>
      </main>
    </>
  )
}
