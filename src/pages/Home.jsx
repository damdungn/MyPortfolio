// src/pages/Home.jsx
import { useRef } from 'react'
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
  { role: 'Research Alumni', org: 'AI4Good Lab', href: 'https://www.ai4goodlab.com', date: 'May 2026 – Present' },
  { role: 'Tutor', org: 'Student Union, UAlberta', href: 'https://www2.su.ualberta.ca/services/infolink/tutor/registry/', date: 'Jan 2026 – Present' },
  { role: 'Teaching Assistant · CMPUT 204', org: 'University of Alberta', href: 'https://apps.ualberta.ca/catalogue/course/cmput/204', date: 'Jan 2026 – Apr 2026' },
  { role: 'Researcher', org: 'UR2PhD', href: 'https://cra.org/ur2phd/', date: 'Sep 2025 – Dec 2025' },
  { role: 'Volunteer Member', org: 'ISVS, UAlberta', href: 'https://www.ualberta.ca/en/international/international-student-services/index.html', date: 'Aug 2025 – Present' },
]

const SKILLS = ['JavaScript', 'React', 'Python', 'Node.js', 'Git', 'SQL', 'HTML', 'CSS', 'C', 'Java', 'Machine Learning', 'Computer Vision', 'Data Analysis', 'Problem Solving']
const HOBBIES = ['Baking', 'Bubble Tea', 'Cooking', 'Reading', 'Painting', 'Crocheting', 'Gardening']

// Apple colors cycle through red/orange/green/yellow, like the reference art
const APPLE_COLORS = ['#d1382a', '#e8963a', '#8bb84a', '#e0453a', '#f2c94c', '#7cb342']

// Distributes apples across the canopy using a golden-angle spiral, which
// gives an organic, non-overlapping scatter for any number of skills.
function buildAppleLayout(count) {
  const positions = []
  const golden = 137.508 * (Math.PI / 180)
  for (let i = 0; i < count; i++) {
    const t = (i + 0.3) / count
    const radius = Math.sqrt(t)
    const angle = i * golden
    const left = 50 + radius * 45 * Math.cos(angle)
    const top = 33 + radius * 28 * Math.sin(angle)
    positions.push({
      left,
      top,
      rotate: (i % 2 === 0 ? -1 : 1) * (6 + (i % 4) * 3),
      size: 0.86 + ((i * 50) % 30) / 100,
      swayDuration: 3 + (i % 3) * 0.6,
      swayDelay: (i * 0.18) % 2.4,
    })
  }
  return positions
}

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

// Places same-size circles around an ellipse's perimeter, giving a scalloped
// "cloud" outline. Combined with a solid base ellipse underneath (so the
// middle isn't hollow) this reproduces the two-tone lobed tree look.
function buildCloudLobes({ cx, cy, rx, ry, count, size, rotationOffset = 0 }) {
  const lobes = []
  for (let i = 0; i < count; i++) {
    const angle = rotationOffset + (i / count) * Math.PI * 2
    lobes.push({
      left: cx + rx * Math.cos(angle),
      top: cy + ry * Math.sin(angle),
      size,
    })
  }
  return lobes
}

const CANOPY_LAYERS = [
  {
    color: '#3f7a34',
    base: { left: 42, top: 44, width: '70%', height: '68%' },
    lobes: buildCloudLobes({ cx: 42, cy: 40, rx: 24, ry: 22, count: 9, size: 150 }),
  },
  {
    color: '#528e37',
    base: { left: 58, top: 56, width: '70%', height: '68%' },
    lobes: buildCloudLobes({ cx: 55, cy: 58, rx: 28, ry: 24, count: 11, size: 170, rotationOffset: 0.3 }),
  },
  {
    color: '#5aa736',
    base: { left: 53, top: 56, width: '40%', height: '50%' },
    lobes: buildCloudLobes({ cx: 50, cy: 54, rx: 28, ry: 24, count: 11, size: 170, rotationOffset: 0.3 }),
  },
]

// 8-point "burst" star used for the beyond-code flowers on the grass
function starClipPath(points = 8, outerR = 50, innerR = 32) {
  const coords = []
  const step = Math.PI / points
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR
    const angle = i * step - Math.PI / 2
    const x = 50 + r * Math.cos(angle)
    const y = 50 + r * Math.sin(angle)
    coords.push(`${x.toFixed(1)}% ${y.toFixed(1)}%`)
  }
  return `polygon(${coords.join(', ')})`
}
const STAR_CLIP = starClipPath()

function buildStarLayout(count) {
  const positions = []
  for (let i = 0; i < count; i++) {
    const left = 8 + (84 * i) / Math.max(count - 1, 1)
    positions.push({
      left,
      bottom: i % 2 === 0 ? 0 : 34,
      rotate: (i % 2 === 0 ? -1 : 1) * (4 + (i % 3) * 3),
      scale: 0.9 + ((i * 41) % 22) / 100,
    })
  }
  return positions
}

// A gentle wavy "vine" doodle connecting the flower centers, like the
// connecting lines in the reference art
function buildVinePath(positions) {
  if (positions.length < 2) return ''
  const pts = positions.map((p) => ({ x: p.left, y: 82 - (p.bottom / 34) * 18 }))
  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1]
    const curr = pts[i]
    const midX = (prev.x + curr.x) / 2
    const midY = (prev.y + curr.y) / 2 + 8
    d += ` Q ${midX} ${midY} ${curr.x} ${curr.y}`
  }
  return d
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
              <tr><td>Graduation</td><td>May 2027</td></tr>
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

/* ============ 5. SKILLS & BEYOND CODE — apple tree on grass ============ */
function AppleTree() {
  const ref = useRef(null)
  const { scrollYProgress: progress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const skyTop = useTransform(progress, [0, 1], ['#CDE8F0', '#7FB8C9'])
  const skyBottom = useTransform(progress, [0, 1], ['#F3EFD8', '#DDE7B0'])
  const sky = useTransform([skyTop, skyBottom], ([t, b]) => `linear-gradient(180deg, ${t} 0%, ${b} 100%)`)

  const applePositions = buildAppleLayout(SKILLS.length)
  const starPositions = buildStarLayout(HOBBIES.length)
  const vinePath = buildVinePath(starPositions)

  return (
    <section className="scene tree-scene" ref={ref} id="skills">
      <motion.div className="scene-sky" style={{ background: sky }} />

      <h2 className="tree-heading">SKILLS</h2>

      <div className="tree-wrap">
        <div className="tree-trunk" />

        {/* Two overlapping scalloped-cloud layers give the two-tone lobed canopy */}
        <div className="tree-canopy">
          {CANOPY_LAYERS.map((layer, li) => (
            <div key={li} className="canopy-layer">
              <div
                className="canopy-base"
                style={{
                  left: `${layer.base.left}%`,
                  top: `${layer.base.top}%`,
                  width: layer.base.width,
                  height: layer.base.height,
                  background: layer.color,
                }}
              />
              {layer.lobes.map((lobe, i) => (
                <span
                  key={i}
                  className="foliage-blob"
                  style={{
                    left: `${lobe.left}%`,
                    top: `${lobe.top}%`,
                    width: lobe.size,
                    height: lobe.size,
                    marginLeft: -lobe.size / 2,
                    marginTop: -lobe.size / 2,
                    background: layer.color,
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Apples pop in on scroll, then keep a gentle continuous sway */}
        {SKILLS.map((s, i) => {
          const pos = applePositions[i]
          return (
            <motion.div
              key={s}
              className="apple-slot"
              style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: pos.size }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.05, type: 'spring', stiffness: 170, damping: 14 }}
            >
              <div
                className="apple"
                style={{
                  background: APPLE_COLORS[i % APPLE_COLORS.length],
                  animationDuration: `${pos.swayDuration}s`,
                  animationDelay: `${pos.swayDelay}s`,
                }}
              >
                <span className="apple-stem" />
                <span className="apple-leaf" />
                <span className="apple-label">{s}</span>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Flat grass strip the tree stands on, with big star bursts spelling out hobbies */}
      <div className="grass-ground">
        <h2 className="tree-heading grass-heading">BEYOND CODE</h2>

        <div className="star-field">
          <svg className="vine-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d={vinePath} />
          </svg>

          {HOBBIES.map((h, i) => {
            const pos = starPositions[i]
            return (
              <motion.div
                key={h}
                className="hobby-star"
                style={{
                  left: `${pos.left}%`,
                  bottom: pos.bottom,
                  clipPath: STAR_CLIP,
                  transform: `translateX(-50%) rotate(${pos.rotate}deg) scale(${pos.scale})`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: pos.scale }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: i * 0.08, type: 'spring', stiffness: 180, damping: 14 }}
              >
                <span className="hobby-label">{h}</span>
              </motion.div>
            )
          })}
        </div>
      </div>
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
      <AppleTree />
    </main>
  )
}
