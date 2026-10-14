// src/pages/Experience.jsx
import '../styles/Experience.css'
import avatar from '../../public/exp.png'

const ACADEMIC = [
  {
    role: 'Co-op Research Assistant',
    org: 'SMART Mapping UA Lab',
    url: 'https://sites.google.com/ualberta.ca/smart-mapping/home',
    date: 'September 2026 – Present',
    details: [
      'Support the processing and segmentation of large-scale mobile LiDAR point clouds to extract critical urban infrastructure features, including sidewalks, curb ramps, and roadway assets, for municipal accessibility models.',
      'Perform data annotation and quality checks on 3D spatial data pipelines, and build object detection workflows that combine 2D imagery with 3D point clouds to improve semantic segmentation.',
    ],
  },
  {
    role: 'Machine Learning Fellow',
    org: 'AI4Good Lab',
    url: 'https://www.ai4goodlab.com',
    date: 'May 2026 – June 2026',
    details: [
      'Selected for a competitive AI/ML training program supported by Amii and Mila under mentorship from industry AI researchers.',
      'Developed FEEDS, a supply and demand forecasting platform for multiple food banks across Alberta in a 5-person interdisciplinary team using a Kanban workflow; collected and cleaned 3–15 years of historical data alongside economic and calendar signals for model training.',
      'Compared Prophet, Random Forest, and baseline forecasting models, achieving cross-validated MAPE of 13.8%–17.7%; delivered a full-stack web application with a React dashboard and Python/FastAPI backend, incorporating accessible UI design and anonymized data handling.',
      'Won the Accelerator Award, given to top AI prototypes that show exceptional scalability, social impact, and pitch quality.'
    ],
  },
  {
    role: 'Teaching Assistant — CMPUT 204',
    org: 'University of Alberta',
    url: 'https://apps.ualberta.ca/catalogue/course/cmput/204',
    date: 'Jan. 2026 – Apr. 2026',
    details: [
      'Led weekly lab sections for students in Algorithms I.',
      'Designed practice problems, graded assignments, and held weekly office hours.',
      'Received positive feedback for clear explanations of complexity analysis and proofs.',
    ],
  },
  {
    role: 'Undergraduate Researcher',
    org: 'UR2PhD',
    url: 'https://cra.org/ur2phd/',
    date: 'Sep. 2025 – Dec. 2025',
    details: [
      'Built a Python evaluation framework in a 2-person Agile team to benchmark GPT-4 and LLaMA on 3,000+ Spider SQL tasks by injecting controlled syntactic and semantic errors to test model self-correction.',
      'Found a consistent 6–9 point accuracy gap between syntactic correction (85%–87%) and semantic correction (76%–81%), showing that LLMs recover surface-level errors more reliably than logic errors and tend to over-correct rather than understand the true semantics.',
      'Supervised by Prof Denilson Barbosa, Professor of Computer Science at UAlberta.',
    ],
  },
  {
    role: 'Tutor',
    org: 'Student Union, University of Alberta',
    url: 'https://www2.su.ualberta.ca/services/infolink/tutor/registry/',
    date: 'Jan. 2026 – Present',
    details: [
      'Provide one-on-one tutoring for undergraduate students across computing science, statistics and mathematics courses.',
      'Help students build intuition for algorithms, data structures, and software design.',
      'Supported students through assignment help and final exam preparation, adapting explanations to each student’s background and learning style.',
    ],
  },
]

const VOLUNTEER = [
  {
    role: 'Merchandise Staff',
    org: 'Animethon 2026',
    url: 'https://animethon.org',
    date: 'Aug 2026',
    details: [
      'Managed merchandise sales and inventory for a large anime convention, ensuring smooth operations and customer satisfaction.',
      'Collaborated with a team of volunteers to set up and maintain the merchandise booth, handling cash and card transactions efficiently.',
    ],
  },
  {
    role: 'Volunteer Member',
    org: 'International Students & Visitors Services (ISVS), UAlberta',
    url: 'https://www.ualberta.ca/en/international/international-student-services/index.html',
    date: 'Aug 2025 – May 2026',
    details: [
      'Support international student integration through peer mentorship and campus events.',
      'Assist with onboarding workshops and help students navigate campus resources.',
    ],
  },
  {
    role: 'Computer Science TA',
    org: 'TeamUp Science',
    url: null,
    date: 'Feb. 2026',
    details: [
      'Volunteer TA for the Interdisciplinary Science Competition (ISC) hosted by TeamUP Science.',
      'Assisted high school teams with coding challenges and provided guidance on their solutions.',
    ],
  },
]

const PARTTIME = [
  {
    role: 'Bubble Tea Barista',
    org: 'Kung Fu Tea, Edmonton',
    url: null,
    date: 'Feb. 2024 – Sep. 2026',
    details: [
      'Prepared a high volume of customised drinks while maintaining quality and consistency.',
      'Trained new staff on recipes, hygiene standards, and POS operation.',
      'Handled customer interactions in a fast-paced environment, building communication skills.',
    ],
  },
]

const LEADERSHIP = [
  {
    role: 'Computer Science Workshop Director',
    org: 'TeamUp Science, Edmonton',
    url: null,
    date: 'May 2026 – Present',
    details: [
      'Work closely with Computer Science Workshop Assistant Directors; flesh out and plan/write the curriculum for the Computer Science Workshop',
      `Recruit and train volunteers (TAs) for the computer science workshop; organize the different streams for the workshop`,
      `Communicate with any organizations/departments at the University that will be collaborating for the computer science workshop; communicate with the Events Committee`,
    ],
  },
]

// Slow-drifting clouds, same idea as Home.css's beach scene
const EXP_CLOUDS = [
  { top: 10, left: 14, duration: 24, delay: 0 },
  { top: 20, left: 46, duration: 30, delay: 5 },
  { top: 6, left: 68, duration: 22, delay: 2 },
]

function ExperienceBackground() {
  return (
    <div className="exp-bg">
      <div className="exp-bg-sky" />
      <div className="exp-sun" />

      <div className="exp-cloud-layer">
        {EXP_CLOUDS.map((c, i) => (
          <span
            key={i}
            className="exp-cloud"
            style={{
              top: `${c.top}%`,
              left: `${c.left}%`,
              animationDuration: `${c.duration}s`,
              animationDelay: `${c.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="exp-wave exp-wave-far">
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path d="M0,80 C240,140 480,20 720,60 C960,100 1200,20 1440,70 L1440,200 L0,200 Z" />
        </svg>
      </div>
      <div className="exp-wave exp-wave-mid">
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path d="M0,80 C240,140 480,20 720,60 C960,100 1200,20 1440,70 L1440,200 L0,200 Z" />
        </svg>
      </div>
      <div className="exp-wave exp-wave-near">
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path d="M0,80 C240,140 480,20 720,60 C960,100 1200,20 1440,70 L1440,200 L0,200 Z" />
        </svg>
      </div>
    </div>
  )
}

export default function Experience() {
  return (
    <>
      <ExperienceBackground />

      <main className="exp-page">

        {/* LEFT — scrollable card list, 2/3 width */}
        <div className="exp-scroll-col">

          {/* Academic */}
          <section className="exp-section">
            <h2 className="exp-section-title">Academic &amp; Research</h2>
            <div className="exp-list">
              {ACADEMIC.map((item, i) => (
                <ExperienceCard key={i} item={item} />
              ))}
            </div>
          </section>

          {/* Leadership */}
          <section className="exp-section">
            <h2 className="exp-section-title">Leadership</h2>
            <div className="exp-list">
              {LEADERSHIP.map((item, i) => (
                <ExperienceCard key={i} item={item} />
              ))}
            </div>
          </section>

          {/* Volunteer */}
          <section className="exp-section">
            <h2 className="exp-section-title">Volunteer</h2>
            <div className="exp-list">
              {VOLUNTEER.map((item, i) => (
                <ExperienceCard key={i} item={item} />
              ))}
            </div>
          </section>

          {/* Part-time / Non-academic */}
          <section className="exp-section">
            <h2 className="exp-section-title">Part-time &amp; Non-academic</h2>
            <div className="exp-list">
              {PARTTIME.map((item, i) => (
                <ExperienceCard key={i} item={item} />
              ))}
            </div>
          </section>

        </div>

        {/* RIGHT — fixed title + intro + image, 1/3 width */}
        <div className="exp-side-panel">
          <div className="exp-header">
            <p className="exp-section-label">Background</p>
            <h1>Experience</h1>
          </div>
          <p>
              My experience spans{' '}
              <mark>academic research</mark>, <mark>teaching</mark>, and{' '}
              <mark>volunteer and social service roles</mark>. All my experiences involved mainly <mark>{' '}
                collaborating with others</mark> and <mark> communication</mark> which I believe are one of the most important social skills{' '}.
                I enjoy working with others to solve problems, and I find that collaboration often leads {' '}
                to better outcomes than working alone. Moreover, working in many different environment in different {' '}
                role has shaped my <mark>adaptability</mark> and <mark>time management skills</mark>.
          </p>
          <img src={avatar} alt="Dam Dung Nguyen Mong" className="exp-side-image" />
        </div>

      </main>
    </>
  )
}

/* ── Card ─────────────────────────────────────────────────── */

function ExperienceCard({ item }) {
  return (
    <div className="exp-card">
      <div className="exp-card-top">
        <div className="exp-card-left">
          <span className="exp-card-role">{item.role}</span>
          {item.url
            ? <a href={item.url} target="_blank" rel="noopener" className="exp-card-org">{item.org} </a>
            : <span className="exp-card-org no-link">{item.org}</span>
          }
        </div>
        <span className="exp-card-date">{item.date}</span>
      </div>

      <ul className="exp-card-details">
        {item.details.map((d, i) => (
          <li key={i}>{d}</li>
        ))}
      </ul>
    </div>
  )
}
