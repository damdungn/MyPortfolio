// src/pages/Home.jsx
import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import '../styles/Home.css'
import avatar from '../../public/avatar.JPG'
import bg from '../../public/bg.webp'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] },
  },
}

function Reveal({ as: As = motion.div, delay = 0, className, children, style }) {
  return (
    <As
      className={className}
      style={style}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay }}
    >
      {children}
    </As>
  )
}

function WaveLayer({ layerClass, y }) {
  return (
    <motion.div className={`wave ${layerClass}`} style={{ y }}>
      <svg viewBox="0 0 1440 200" preserveAspectRatio="none">
        <path d="M0,80 C240,140 480,20 720,60 C960,100 1200,20 1440,70 L1440,200 L0,200 Z" />
      </svg>
    </motion.div>
  )
}

const EXPERIENCE = [
  { role: 'Co-op Research Assistant', org: 'SMART Mapping UA Lab', href: 'https://sites.google.com/ualberta.ca/smart-mapping/home', date: 'Sep. 2026 – Present' },
  { role: 'Machine Learning Fellow', org: 'AI4Good Lab', href: 'https://www.ai4goodlab.com', date: 'May 2026 – June 2026' },
  { role: 'Tutor', org: 'Student Union, UAlberta', href: 'https://www2.su.ualberta.ca/services/infolink/tutor/registry/', date: 'Jan. 2026 – Present' },
  { role: 'Teaching Assistant · CMPUT 204', org: 'University of Alberta', href: 'https://apps.ualberta.ca/catalogue/course/cmput/204', date: 'Jan. 2026 – Apr. 2026' },
  { role: 'Undergraduate Researcher', org: 'UR2PhD', href: 'https://cra.org/ur2phd/', date: 'Sep. 2025 – Dec. 2025' },
]

const SKILLS = ['JavaScript', 'React', 'Python', 'Git/Figma', 'SQL', 'HTML/CSS', 'C/C++', 'Java', 'AI/ML', 'Computer Vision']
const HOBBIES = ['Baking', 'Bubble Tea', 'Cooking', 'Reading', 'Painting', 'Crocheting', 'Gardening']

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

const DAISIES = [
  { left: 3, scale: 1, delay: 0 },
  { left: 12, scale: 0.7, delay: 0.4 },
  { left: 22, scale: 1.15, delay: 0.8 },
  { left: 33, scale: 0.6, delay: 0.2 },
  { left: 45, scale: 0.9, delay: 0.6 },
  { left: 56, scale: 1.1, delay: 0.1 },
  { left: 67, scale: 0.65, delay: 0.5 },
  { left: 78, scale: 1, delay: 0.3 },
  { left: 88, scale: 0.8, delay: 0.7 },
  { left: 96, scale: 0.55, delay: 0.9 },
]

// Sparse daisies scattered further back / higher up the scene for depth
const DAISY_SCATTER = [
  { top: 8, left: 6 }, { top: 14, left: 18 }, { top: 6, left: 30 },
  { top: 20, left: 42 }, { top: 10, left: 54 }, { top: 16, left: 66 },
  { top: 5, left: 78 }, { top: 22, left: 90 }, { top: 28, left: 12 },
  { top: 34, left: 24 }, { top: 26, left: 48 }, { top: 32, left: 60 },
  { top: 24, left: 72 }, { top: 38, left: 86 }, { top: 40, left: 4 },
  { top: 44, left: 36 }, { top: 46, left: 58 }, { top: 42, left: 94 },
  { top: 50, left: 16 }, { top: 52, left: 68 },
]

// Slow-drifting clouds for the beach scene
const CLOUDS = [
  { top: 10, left: 20, scale: 1, duration: 26, delay: 0 },
  { top: 18, left: 60, scale: 1.3, duration: 32, delay: 4 },
  { top: 6, left: 78, scale: 0.8, duration: 22, delay: 2 },
  { top: 26, left: 38, scale: 0.9, duration: 28, delay: 6 },
  { top: 14, left: 4, scale: 0.7, duration: 24, delay: 8 },
]

// Soft clouds drifting across the bunting sky (Skills section). `depth`
// 0 = far (small, faint, hazier) … 1 = near (large, crisp).
const BUNTING_CLOUDS = [
  { top: 4, left: 6, width: 300, depth: 0.9, duration: 34, delay: 0 },
  { top: 12, left: 62, width: 220, depth: 0.5, duration: 30, delay: 4 },
  { top: 36, left: 82, width: 260, depth: 0.7, duration: 28, delay: 2 },
  { top: 48, left: 30, width: 160, depth: 0.2, duration: 40, delay: 6 },
  { top: 66, left: 4, width: 240, depth: 0.6, duration: 32, delay: 3 },
  { top: 78, left: 66, width: 320, depth: 1, duration: 36, delay: 8 },
]

// Rainbow palette for the skill pennant flags, cycling in hue order
const SKILL_COLORS = ['#d9534f', '#e8963a', '#e0b473', '#f2d675', '#c8e88f', '#7dd6a0', '#6fb3e0', '#7b8fe0', '#b98fe0']

// Soft pastel palette for the hobby string-light bulbs
const HOBBY_COLORS = ['#f8e3a1', '#f9cfb2', '#f5c3da', '#d5edb1', '#c3e4f3', '#f4bdb6', '#dccdf2']

function hexToRgba(hex, alpha) {
  const n = parseInt(hex.slice(1), 16)
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`
}

// Tracks an element's rendered size so the garland can be laid out in real
// pixels — needed to tilt each flag to the string's actual slope.
function useElementSize(ref) {
  const [size, setSize] = useState({ width: 0, height: 0 })
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize(prev => (prev.width === width && prev.height === height ? prev : { width, height }))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref])
  return size
}

// The string is a quadratic bezier that sags a little between its two
// anchors. Items are spaced evenly by arc length along that same curve, and
// each gets the tangent angle so flags can sit flush on the string.
function buildGarland({ width, height }, line, count) {
  const p0 = { x: (line.x0 / 100) * width, y: (line.y0 / 100) * height }
  const p2 = { x: (line.x2 / 100) * width, y: (line.y2 / 100) * height }
  const p1 = { x: (p0.x + p2.x) / 2, y: (p0.y + p2.y) / 2 + (line.sag / 100) * height }

  const at = t => ({
    x: (1 - t) ** 2 * p0.x + 2 * (1 - t) * t * p1.x + t ** 2 * p2.x,
    y: (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * p1.y + t ** 2 * p2.y,
  })
  const slope = t => ({
    x: 2 * (1 - t) * (p1.x - p0.x) + 2 * t * (p2.x - p1.x),
    y: 2 * (1 - t) * (p1.y - p0.y) + 2 * t * (p2.y - p1.y),
  })

  const STEPS = 240
  const lengths = [0]
  for (let i = 1, prev = p0; i <= STEPS; i++) {
    const pt = at(i / STEPS)
    lengths.push(lengths[i - 1] + Math.hypot(pt.x - prev.x, pt.y - prev.y))
    prev = pt
  }
  const total = lengths[STEPS]
  const tAtLength = target => {
    const i = lengths.findIndex(l => l >= target)
    if (i <= 0) return 0
    return (i - 1 + (target - lengths[i - 1]) / (lengths[i] - lengths[i - 1])) / STEPS
  }

  const items = Array.from({ length: count }).map((_, i) => {
    const t = tAtLength((total * (i + 0.5)) / count)
    const d = slope(t)
    return { ...at(t), angle: (Math.atan2(d.y, d.x) * 180) / Math.PI }
  })

  return {
    path: `M ${p0.x} ${p0.y} Q ${p1.x} ${p1.y} ${p2.x} ${p2.y}`,
    spacing: total / count,
    items,
  }
}

// Anchor points (% of each garland's own box): low on the left, rising to
// the right, with a gentle sag in between.
const FLAG_LINE = { x0: 0, y0: 58, x2: 98, y2: 6, sag: 12 }
const BULB_LINE = { x0: 0, y0: 62, x2: 98, y2: 4, sag: 12 }

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useLayoutEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])
  return matches
}

function Garland({ className, line, count, children }) {
  const ref = useRef(null)
  const size = useElementSize(ref)
  const geo = size.width ? buildGarland(size, line, count) : null

  return (
    <div className={`garland ${className}`} ref={ref}>
      {geo && (
        <>
          {children(geo)}
          <svg className="garland-string" viewBox={`0 0 ${size.width} ${size.height}`}>
            <path d={geo.path} />
          </svg>
        </>
      )}
    </div>
  )
}

/* ============ 1. HERO — mushroom forest ============ */
function MushroomHero() {
  const ref = useRef(null)
  const { scrollYProgress: progress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const skyTop = useTransform(progress, [0, 1], ['#CFE8D8', '#15291C'])
  const skyBottom = useTransform(progress, [0, 1], ['#F3EFE0', '#0B1710'])
  const sky = useTransform([skyTop, skyBottom], ([t, b]) => `linear-gradient(180deg, ${t} 0%, ${b} 100%)`)

  const hillsFarY = useTransform(progress, [0, 1], [0, -15])
  const hillsMidY = useTransform(progress, [0, 1], [0, -30])
  const hillsNearY = useTransform(progress, [0, 1], [0, -50])
  const treesY = useTransform(progress, [0, 1], [0, -70])
  const fogX = useTransform(progress, [0, 1], [0, 50])
  const mushroomsY = useTransform(progress, [0, 1], [0, -140])
  const textOpacity = useTransform(progress, [0, 0.6], [1, 0])

  const scrollToAbout = (e) => {
    e.preventDefault()
    document.getElementById('about-me')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="scene mushroom-scene" ref={ref}>
      <motion.div className="scene-sky" style={{ background: sky }} />

      <motion.div className="hills far" style={{ y: hillsFarY }}>
        <svg viewBox="0 0 1440 300" preserveAspectRatio="none">
          <path d="M0,200 C260,120 520,230 780,160 C1040,100 1260,190 1440,150 L1440,300 L0,300 Z" />
        </svg>
      </motion.div>

      <motion.div className="hills mid" style={{ y: hillsMidY }}>
        <svg viewBox="0 0 1440 300" preserveAspectRatio="none">
          <path d="M0,220 C300,140 500,240 760,180 C1000,130 1200,220 1440,170 L1440,300 L0,300 Z" />
        </svg>
      </motion.div>

      <motion.div className="hills near" style={{ y: hillsNearY }}>
        <svg viewBox="0 0 1440 300" preserveAspectRatio="none">
          <path d="M0,180 C300,80 500,220 760,140 C1000,70 1200,180 1440,120 L1440,300 L0,300 Z" />
        </svg>
      </motion.div>

      <motion.div className="treeline" style={{ y: treesY }}>
        {Array.from({ length: 16 }).map((_, i) => (
          <span key={i} className="tree" style={{ left: `${i * 6.6}%`, height: 60 + (i % 3) * 22 }} />
        ))}
      </motion.div>

      <motion.div className="fog" style={{ x: fogX }} />

      <motion.div className="mushroom-row" style={{ y: mushroomsY }}>
        {MUSHROOMS.map((m, i) => (
          <div key={i} className={`mushroom ${m.type}`} style={{ left: `${m.left}%`, transform: `scale(${m.scale})` }}>
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
      </motion.div>

      <motion.div className="scene-content" style={{ opacity: textOpacity }}>
        <motion.h1
          className="hero-name"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
        >
          DAM DUNG NGUYEN MONG
        </motion.h1>
        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.2, 0.7, 0.2, 1] }}
        >
          COMPUTING SCIENCE STUDENT FROM EDMONTON, CANADA
        </motion.p>
        <motion.a
          href="#about-me"
          className="hero-scroll"
          onClick={scrollToAbout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          ↓
        </motion.a>
      </motion.div>
    </section>
  )
}

/* ============ 2. ABOUT ME — waterfall & mountains ============ */
function WaterfallAbout() {
  const ref = useRef(null)
  const { scrollYProgress: progress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const skyTop = useTransform(progress, [0, 1], ['#CFE3F0', '#2B3A52'])
  const skyBottom = useTransform(progress, [0, 1], ['#EDEAF5', '#131C2B'])
  const sky = useTransform([skyTop, skyBottom], ([t, b]) => `linear-gradient(180deg, ${t} 0%, ${b} 100%)`)

  const farY = useTransform(progress, [0, 1], [0, -20])
  const midY = useTransform(progress, [0, 1], [0, -50])
  const nearY = useTransform(progress, [0, 1], [0, -90])
  const mistOpacity = useTransform(progress, [0, 0.7], [0.6, 0.15])
  const fogX = useTransform(progress, [0, 1], [0, 40])

  return (
    <section className="scene waterfall-scene" ref={ref} id="about-me">
      <motion.div className="scene-sky" style={{ background: sky }} />

      <motion.div className="mountain far" style={{ y: farY }}>
        <svg viewBox="0 0 1440 260" preserveAspectRatio="none">
          <polygon points="0,260 0,140 240,60 480,160 760,40 1040,150 1280,70 1440,140 1440,260" />
        </svg>
      </motion.div>
      <motion.div className="mountain mid" style={{ y: midY }}>
        <svg viewBox="0 0 1440 220" preserveAspectRatio="none">
          <polygon points="0,220 0,120 300,40 600,130 900,30 1200,120 1440,60 1440,220" />
        </svg>
      </motion.div>

      {/* Three waterfalls: bigger, lighter one in the middle, darker narrower ones on each side */}
      <div className="waterfalls">
        <div className="waterfall waterfall-side waterfall-left">
          <div className="waterfall-flow" />
          <motion.div className="waterfall-mist" style={{ opacity: mistOpacity }} />
        </div>
        <div className="waterfall waterfall-center">
          <div className="waterfall-flow" />
          <motion.div className="waterfall-mist" style={{ opacity: mistOpacity }} />
        </div>
        <div className="waterfall waterfall-side waterfall-right">
          <div className="waterfall-flow" />
          <motion.div className="waterfall-mist" style={{ opacity: mistOpacity }} />
        </div>
      </div>

      <motion.div className="fog" style={{ x: fogX }} />

      <motion.div className="mountain near" style={{ y: nearY }}>
        <svg viewBox="0 0 1440 160" preserveAspectRatio="none">
          <polygon points="0,160 0,90 260,20 640,110 1000,10 1440,90 1440,160" />
        </svg>
      </motion.div>

      {/* Story on the left, fun facts on the right, waterfall visible between them */}
      <div className="waterfall-panels">
        <Reveal className="panel story-panel">
          <img src={avatar} alt="Dam Dung Nguyen Mong" className="story-avatar" />
          <div className="story-text">
            <h2>MY STORY</h2>
            <p>
              Hello, I'm a 4-th year Computing Science student at the University of Alberta from Edmonton, Canada.
              I'm interested in Computer Visions, Machine Learning, and Software Development. I am passionate about integrating AI into multiple applications to create innovative and impactful solutions. My strength lies in problem-solving skills, math reasoning, data analysis and quick learning.
              Currently looking for exciting opportunities.
            </p>
            <Link to="/resume" className="btn-resume">
              VIEW RESUME
            </Link>
          </div>
        </Reveal>

        <Reveal className="panel funfact-panel" delay={0.1}>
          <h2>LITTLE FUN FACTS</h2>
          <p>
            I am belong to a minority group called the Tay, which is the second largest ethnic group in Vietnam. My hometown is a small mountainous province called Cao Bang, which is famous for its stunning landscapes and rich cultural heritage.
          </p>
          <img src={bg} alt="Dam Dung Nguyen Mong" className="story-bg" />
        </Reveal>
      </div>
    </section>
  )
}

/* ============ 3. EXPERIENCE & EDUCATION — daisy meadow ============ */
function DaisyExperience() {
  const ref = useRef(null)
  const { scrollYProgress: progress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const skyTop = useTransform(progress, [0, 1], ['#F3F7D8', '#E9E0A8'])
  const skyBottom = useTransform(progress, [0, 1], ['#DCEFC4', '#B7DD8E'])
  const sky = useTransform([skyTop, skyBottom], ([t, b]) => `linear-gradient(180deg, ${t} 0%, ${b} 100%)`)

  const groundY = useTransform(progress, [0, 1], [0, -40])
  const daisyY = useTransform(progress, [0, 1], [0, -90])

  return (
    <section className="scene daisy-scene" ref={ref} id="experience">
      <motion.div className="scene-sky" style={{ background: sky }} />

      {/* Sparse daisies scattered across the whole background for depth */}
      <div className="daisy-scatter">
        {DAISY_SCATTER.map((d, i) => (
          <span key={i} className="daisy-mini" style={{ top: `${d.top}%`, left: `${d.left}%` }} />
        ))}
      </div>

      <motion.div className="meadow-ground" style={{ y: groundY }}>
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path d="M0,120 C300,60 700,140 1000,80 C1200,50 1340,100 1440,90 L1440,200 L0,200 Z" />
        </svg>
      </motion.div>

      <motion.div className="daisy-row" style={{ y: daisyY }}>
        {DAISIES.map((d, i) => (
          <div key={i} className="daisy" style={{ left: `${d.left}%`, transform: `scale(${d.scale})` }}>
            <div className="daisy-sway" style={{ animationDelay: `${d.delay}s` }}>
              <div className="petals">
                {Array.from({ length: 8 }).map((_, p) => (
                  <span key={p} className="petal" style={{ transform: `rotate(${p * 45}deg)` }} />
                ))}
              </div>
              <div className="center" />
              <div className="stalk" />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Experience on the left, Education on the right */}
      <div className="exp-edu-row">
        <Reveal className="panel exp-panel">
          <h2>Experience</h2>
          <ul className="exp-list">
            {EXPERIENCE.map((exp, i) => (
              <motion.li
                key={exp.role}
                className="exp-item"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.08 }}
              >
                <span className="daisy-bullet" />
                <div>
                  <span className="exp-role">{exp.role}</span>
                  <div className="exp-meta">
                    <a href={exp.href} target="_blank" rel="noopener" className="exp-org">
                      {exp.org}
                    </a>
                    <span className="exp-date">{exp.date}</span>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="panel edu-panel" delay={0.1}>
          <h2>Education</h2>
          <table className="edu-table">
            <tbody>
              <tr><td>University</td><td>University of Alberta</td></tr>
              <tr><td>Degree</td><td>Bachelor of Science in Computing Science</td></tr>
              <tr><td>Graduation</td><td>December 2027</td></tr>
              <tr><td>GPA</td><td>3.8 /4.0</td></tr>
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  )
}

/* ============ 4. PERSONAL INFO & SOCIALS — beach ============ */
function BeachContact() {
  const ref = useRef(null)
  const { scrollYProgress: progress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const skyTop = useTransform(progress, [0, 1], ['#A6E3F5', '#3E7C93'])
  const skyBottom = useTransform(progress, [0, 1], ['#EAF8F0', '#DCEFE9'])
  const sky = useTransform([skyTop, skyBottom], ([t, b]) => `linear-gradient(180deg, ${t} 0%, ${b} 100%)`)

  const sunY = useTransform(progress, [0, 1], [0, -100])
  const sunOpacity = useTransform(progress, [0, 0.7], [1, 0.3])
  const waveFarY = useTransform(progress, [0, 1], [0, -20])
  const waveMidY = useTransform(progress, [0, 1], [0, -50])
  const waveNearY = useTransform(progress, [0, 1], [0, -90])
  const cloudsOpacity = useTransform(progress, [0, 0.7], [1, 0.4])

  return (
    <section className="scene beach-scene" ref={ref} id="contact">
      <motion.div className="scene-sky" style={{ background: sky }} />
      <motion.div className="beach-sun" style={{ y: sunY, opacity: sunOpacity }} />

      <motion.div className="cloud-layer" style={{ opacity: cloudsOpacity }}>
        {CLOUDS.map((c, i) => (
          <span
            key={i}
            className="cloud"
            style={{
              top: `${c.top}%`,
              left: `${c.left}%`,
              '--cloud-scale': c.scale,
              animationDuration: `${c.duration}s`,
              animationDelay: `${c.delay}s`,
            }}
          />
        ))}
      </motion.div>

      <WaveLayer layerClass="wave-far" y={waveFarY} />
      <WaveLayer layerClass="wave-mid" y={waveMidY} />
      <WaveLayer layerClass="wave-near" y={waveNearY} />

      <Reveal className="panel info-panel">
        <h2>PERSONAL INFORMATION</h2>
        <table>
          <tbody>
            <tr><td>Name</td><td>Dam Dung Nguyen Mong</td></tr>
            <tr><td>Age</td><td>21 Years Old</td></tr>
            <tr><td>Phone</td><td>+1 587 974 7782</td></tr>
            <tr><td>Email</td><td>damdungnguyenmong@gmail.com</td></tr>
            <tr><td>Location</td><td>Edmonton, Canada</td></tr>
          </tbody>
        </table>

        <div className="socials">
          <a href="https://github.com/damdungn" target="_blank" rel="noopener">GitHub</a>
          <a href="https://www.linkedin.com/in/dam-dung-nguyen-mong-b88952358/" target="_blank" rel="noopener">LinkedIn</a>
          <a href="mailto:damdungnguyenmong@gmail.com">Email</a>
          <a href="https://devpost.com/damdungn656" target="_blank" rel="noopener">DevPost</a>
        </div>
      </Reveal>
    </section>
  )
}

/* ============ 5. SKILLS & BEYOND CODE — bunting flags & string lights ============ */
function SkillsBunting() {
  const ref = useRef(null)
  const { scrollYProgress: progress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const skyTop = useTransform(progress, [0, 1], ['#9fd2f2', '#86c2ea'])
  const skyMid = useTransform(progress, [0, 1], ['#cbe7f8', '#b9ddf4'])
  const skyBottom = useTransform(progress, [0, 1], ['#f5fafe', '#e4f1fa'])
  const sky = useTransform(
    [skyTop, skyMid, skyBottom],
    ([t, m, b]) => `linear-gradient(180deg, ${t} 0%, ${m} 48%, ${b} 100%)`
  )
  const cloudsOpacity = useTransform(progress, [0, 0.7], [1, 0.6])
  const cloudsY = useTransform(progress, [0, 1], [0, -60])

  // Ten pennants won't fit legibly on one phone-width string, so split them
  // across two strings there.
  const narrow = useMediaQuery('(max-width: 600px)')
  const half = Math.ceil(SKILLS.length / 2)
  const flagRows = narrow
    ? [
        { skills: SKILLS.slice(0, half), offset: 0 },
        { skills: SKILLS.slice(half), offset: half },
      ]
    : [{ skills: SKILLS, offset: 0 }]

  return (
    <section className="scene bunting-scene" ref={ref} id="skills">
      <motion.div className="scene-sky" style={{ background: sky }} />
      <div className="bunting-haze" />

      <motion.div className="cloud-layer" style={{ opacity: cloudsOpacity, y: cloudsY }}>
        {BUNTING_CLOUDS.map((c, i) => (
          <span
            key={i}
            className="soft-cloud"
            style={{
              top: `${c.top}%`,
              left: `${c.left}%`,
              width: c.width,
              opacity: 0.55 + c.depth * 0.45,
              filter: `blur(${(1 - c.depth) * 3 + 2.5}px)`,
              animationDuration: `${c.duration}s`,
              animationDelay: `-${c.delay}s`,
            }}
          >
            <i className="puff puff-base" />
            <i className="puff puff-1" />
            <i className="puff puff-2" />
            <i className="puff puff-3" />
          </span>
        ))}
      </motion.div>

      <h2 className="bunting-heading">SKILLS</h2>

      {flagRows.map(({ skills, offset }, row) => (
        <Garland key={row} className="flag-garland" line={FLAG_LINE} count={skills.length}>
          {geo => {
            const w = Math.max(40, Math.min(100, geo.spacing * 0.9))
            return skills.map((s, j) => {
              const i = offset + j
              const p = geo.items[j]
              return (
                <div
                  key={s}
                  className="flag-slot"
                  style={{ left: p.x, top: p.y, width: w, transform: `translateX(-50%) rotate(${p.angle}deg)` }}
                >
                  <motion.div
                    className="flag-drop"
                    style={{ originY: 0 }}
                    initial={{ opacity: 0, scaleY: 0 }}
                    whileInView={{ opacity: 1, scaleY: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ delay: j * 0.06, type: 'spring', stiffness: 160, damping: 14 }}
                  >
                    <div
                      className="flag"
                      style={{
                        '--flag-color': SKILL_COLORS[i % SKILL_COLORS.length],
                        height: w * 1.08,
                        fontSize: Math.max(8, Math.min(12.5, w / 7.6)),
                        animationDelay: `${-(i % 5) * 0.6}s`,
                      }}
                    >
                      <span className="flag-label">{s}</span>
                    </div>
                  </motion.div>
                </div>
              )
            })
          }}
        </Garland>
      ))}

      <h2 className="bunting-heading hobbies-heading">BEYOND CODE</h2>

      <Garland className="bulb-garland" line={BULB_LINE} count={HOBBIES.length}>
        {geo => {
          const size = Math.max(46, Math.min(94, geo.spacing * 0.8))
          return HOBBIES.map((h, i) => {
            const p = geo.items[i]
            const color = HOBBY_COLORS[i % HOBBY_COLORS.length]
            return (
              <div
                key={h}
                className="bulb-slot"
                style={{
                  left: p.x,
                  top: p.y,
                  '--bulb-size': `${size}px`,
                  '--bulb-color': color,
                  '--bulb-halo': hexToRgba(color, 0.45),
                }}
              >
                <motion.div
                  className="bulb-drop"
                  style={{ originY: 0 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: i * 0.07, type: 'spring', stiffness: 200, damping: 15 }}
                >
                  <span className="bulb-halo" style={{ animationDelay: `${-(i % 4) * 0.9}s` }} />
                  <span className="bulb-wire" />
                  <span className="bulb-socket" />
                  <div className="bulb" style={{ animationDelay: `${-(i % 4) * 0.9}s` }}>
                    <span className="bulb-label" style={{ fontSize: Math.max(9, Math.min(13, size / 7.2)) }}>
                      {h}
                    </span>
                  </div>
                </motion.div>
              </div>
            )
          })
        }}
      </Garland>
    </section>
  )
}

export default function Home() {
  return (
    <main className="home">
      <MushroomHero />
      <WaterfallAbout />
      <DaisyExperience />
      <BeachContact />
      <SkillsBunting />
    </main>
  )
}
