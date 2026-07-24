// src/pages/Projects.jsx
import { motion } from 'framer-motion'
import '../styles/Projects.css'
import llm from '../../logos/llm.png'
import snow from '../../logos/snow.png'
import calobro from '../../logos/calobro.png'
import flag from '../../logos/flagrant.jpg'
import neuro from '../../logos/neuro-dash.jpg'
import chicks from '../../logos/chicks-events.jpeg'
import logos from '../../logos/logo-removebg.png'

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

// ✏️ Replace with your actual projects
const SECTIONS = [
  {
    id: 'programs',
    label: 'Programs',
    projects: [
      {
        title: 'FEEDS: Forecasting Engine for Estimating Demand and Supply',
        description: 'An early warning AI system to predict supply and demand for food bank resources based on historical data and external factors such as weather and economic indicators, enabling proactive actions to mitigate shortages in supplies and staffing.',
        logo: logos,
        year: '2026',
        team: '5 people',
        skills: ['Python', 'Prophet', 'AI', 'ML', 'Random Forest', 'Data Analysis', 'React', 'FastAPI'],
        programs: ['AI4Good Lab'],
        results: 'Winning the Accelerator Award at AI4Good Lab 2026',
        links: [
          { label: 'GitHub', url: 'https://github.com/damdungn/FoodBank_e3' },
          { label: 'Link to App', url: 'https://feeds4good.vercel.app/' },
        ],
      },
      {
        title: 'Evaluating LLM Performance on the Correction of Syntactic & Semantic SQL Errors in the Spider Dataset.',
        description: 'Benchmarked GPT-4 and Llama 3 on auto-correcting SQL queries, comparing accuracy across error categories.',
        logo: llm,
        year: '2025',
        team: 'Team of 2 supervised by Professor Barbosa',
        skills: ['Python', 'OpenAI API', 'SQLite', 'Data Analysis', 'Data Processing', 'Llama 3'],
        programs: ['UR2PhD'],
        results: 'Submitted to UR2PhD symposium',
        links: [
        ],
      },
    ],
  },
  {
    id: 'coursework',
    label: 'Coursework',
    projects: [
      {
        title: 'ChicksEvents',
        courseName: 'CMPUT 301: Introduction to Software Engineering',
        description: 'An Android mobile app that enables fair, accessible sign-ups for high-demand community events using a lottery-based waiting list system and integrating Firebase for real-time data, QR code event entry, and geolocation verification.',
        logo: chicks,
        year: '2025',
        team: 'Team of 6',
        skills: ['Java', 'Figma', 'GitHub', 'Agile Development', 'UI/UX Design', 'Firebase', 'Android Studio'],
        links: [
          { label: 'GitHub', url: 'https://github.com/CMPUT301F25chicks/chicks-events' },
        ],
      },
      {
        title: 'SnowSocial',
        courseName: 'CMPUT 404: Web Applications and Architecture',
        description: 'A web application for social networking where users across multiple independent servers can create, share, like, comment on, and manage posts while synchronizing social interactions through federated node-to-node communication.',
        logo: snow,
        year: '2026',
        team: 'Team of 6',
        skills: ['API', 'Django', 'GitHub', 'Heroku', 'Authentication', 'Firebase', 'Css', 'HTML', 'JavaScript'],
        links: [
          { label: 'Link to App', url: 'https://cmput404-snow-b049950835e2.herokuapp.com/read/' },
        ],
      },
    ],
  },
  {
    id: 'hackathons',
    label: 'Hackathons',
    projects: [
      {
        title: 'CaloBro',
        hackathonName: 'HackEd 2026',
        description: 'An AI-powered nutrition platform to estimate macros and calories with gamified streaks, and help users build sustainable eating habits. Built in 48 hours.',
        logo: calobro,
        year: '2026',
        team: '4 people',
        skills: ['React/FastAPI', 'Tailwind CSS', 'OpenAI API', 'GitHub', 'USDA API', 'Discord OAuth2', 'Vercel', 'SQLite / PostgreSQL', 'Chart.js'],
        links: [
          { label: 'Devpost', url: 'https://devpost.com/software/calobro' },
          { label: 'GitHub', url: 'https://github.com/friedchickenblob/baby_CaloBro' },
          { label: 'Link to App', url: 'https://calobroski.vercel.app' },
        ],
      },
      {
        title: 'NeuroDash',
        hackathonName: 'NatHack 2025',
        description: 'A EEG-based system that enhances pediatric measurement accuracy by translating the patient\'s(children\'s) focus into a real-time signal with iteractive gaplay. Built in 64 hours.',
        logo: neuro,
        year: '2025',
        team: '6 people',
        skills: ['OpenBCI Ganglion EEG', 'Python/Pygame', 'Signal Processing', 'Rapid Prototyping', "Raspberry Pi", 'NumPy/SciPy', 'GitHub'],
        links: [
          { label: 'Devpost', url: 'https://devpost.com/software/neurodrive-awgdio' },
          { label: 'GitHub', url: 'https://github.com/9juanjuan7/neuro-dash' },
        ],
      },
      {
        title: 'Flagrant',
        hackathonName: 'Sillycon Valley 2026',
        description: 'A tongue-in-cheek AI-powered dating assistant built for Valentine’s Day with features like Compatibility Check and Red Flag Detector. Built in 48 hours.',
        logo: flag,
        year: '2026',
        team: '3 people',
        skills: ['React/FastAPI', 'Tailwind CSS', 'OpenAI API', 'GitHub', 'Vite', 'Python', 'UI/UX Design'],
        links: [
          { label: 'Devpost', url: 'https://devpost.com/software/flagrant' },
          { label: 'GitHub', url: 'https://github.com/NataliiaLysenko/Flagrant' },
          { label: 'Link to App', url: 'https://flagrant.vercel.app' },
        ],
      },
    ],
  },
]

/* Fixed background — same waterfall/mountain language as Home.css's
   About Me scene, but it never scrolls away: it just sits behind the
   content for the whole page. Waterfall lives on the right this time. */
function ProjectsBackground() {
  return (
    <div className="proj-bg">
      <div className="proj-sky" />

      <div className="proj-mountain far">
        <svg viewBox="0 0 1440 260" preserveAspectRatio="none">
          <polygon points="0,260 0,140 240,60 480,160 760,40 1040,150 1280,70 1440,140 1440,260" />
        </svg>
      </div>
      <div className="proj-mountain mid">
        <svg viewBox="0 0 1440 220" preserveAspectRatio="none">
          <polygon points="0,220 0,120 300,40 600,130 900,30 1200,120 1440,60 1440,220" />
        </svg>
      </div>

      <div className="proj-fog" />

      <div className="proj-waterfall">
        <div className="proj-waterfall-flow" />
        <div className="proj-waterfall-mist" />
      </div>

      <div className="proj-mountain near">
        <svg viewBox="0 0 1440 160" preserveAspectRatio="none">
          <polygon points="0,160 0,90 260,20 640,110 1000,10 1440,90 1440,160" />
        </svg>
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <>
      <ProjectsBackground />

      <main className="projects-page">
        <Reveal className="projects-header">
          <p className="section-label">Work</p>
          <h1>Projects</h1>
          <p className="projects-subtitle">
            {SECTIONS.map((s) => s.label).join(' · ')}
          </p>
        </Reveal>

        {SECTIONS.map((section) => (
          <section key={section.id} className="projects-section">
            <Reveal as="h2" className="projects-section-title">
              {section.label}
            </Reveal>
            <div className="projects-grid">
              {section.projects.map((project, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <ProjectCard project={project} sectionId={section.id} />
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </main>
    </>
  )
}

function ProjectCard({ project, sectionId }) {
  return (
    <div className="project-card">

      {/* LEFT — logo with hover overlay */}
      <div className="card-logo-wrap">
        {project.logo
          ? <img src={project.logo} alt={project.title} className="card-logo" />
          : <div className="card-logo-fallback">{project.title[0]}</div>
        }
        <div className="card-overlay">
          <span className="card-arrow">›</span>
          <div className="card-links">
            {project.links.map(link => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener"
                className="card-link"
                onClick={e => e.stopPropagation()}
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT — section-specific layout */}
      <div className="card-details">
        {sectionId === 'programs'   && <ProgramCardBody   project={project} />}
        {sectionId === 'hackathons' && <HackathonCardBody project={project} />}
        {sectionId === 'coursework' && <CourseworkCardBody project={project} />}
      </div>

    </div>
  )
}

/* ── Programs: program badge(s) → title + description → year / results / team ── */
function ProgramCardBody({ project }) {
  return (
    <>
      {project.programs?.length > 0 && (
        <div className="card-programs">
          {project.programs.map(p => (
            <span key={p} className="program-badge">{p}</span>
          ))}
        </div>
      )}

      <div>
        <h3 className="card-title">{project.title}</h3>
        {project.description && (
          <p className="card-description">{project.description}</p>
        )}
      </div>

      <div className="card-meta">
        <MetaItem label="Year">{project.year}</MetaItem>
        <MetaItem label="Results">{project.results}</MetaItem>
        <MetaItem label="Team">{project.team}</MetaItem>
      </div>

      {project.skills?.length > 0 && (
        <div className="card-skills">
          {project.skills.map(skill => (
            <span key={skill} className="skill-tag">{skill}</span>
          ))}
        </div>
      )}
    </>
  )
}

/* ── Hackathons: event name → title + description → year / team ── */
function HackathonCardBody({ project }) {
  return (
    <>
      {project.hackathonName && (
        <div className="card-event-name">{project.hackathonName}</div>
      )}

      <div>
        <h3 className="card-title">{project.title}</h3>
        {project.description && (
          <p className="card-description">{project.description}</p>
        )}
      </div>

      <div className="card-meta">
        <MetaItem label="Year">{project.year}</MetaItem>
        <MetaItem label="Team">{project.team}</MetaItem>
        {project.results && <MetaItem label="Award">{project.results}</MetaItem>}
      </div>

      {project.skills?.length > 0 && (
        <div className="card-skills">
          {project.skills.map(skill => (
            <span key={skill} className="skill-tag">{skill}</span>
          ))}
        </div>
      )}
    </>
  )
}

/* ── Coursework: course name → title + description → team ── */
function CourseworkCardBody({ project }) {
  return (
    <>
      {project.courseName && (
        <div className="card-course-name">{project.courseName}</div>
      )}

      <div>
        <h3 className="card-title">{project.title}</h3>
        {project.description && (
          <p className="card-description">{project.description}</p>
        )}
      </div>

      <div className="card-meta">
        <MetaItem label="Year">{project.year}</MetaItem>
        <MetaItem label="Team">{project.team}</MetaItem>
      </div>

      {project.skills?.length > 0 && (
        <div className="card-skills">
          {project.skills.map(skill => (
            <span key={skill} className="skill-tag">{skill}</span>
          ))}
        </div>
      )}
    </>
  )
}

/* ── Shared helper ── */
function MetaItem({ label, children }) {
  if (!children) return null
  return (
    <span className="meta-item">
      <span className="meta-label">{label}</span>
      {children}
    </span>
  )
}
