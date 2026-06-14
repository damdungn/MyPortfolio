// src/pages/Experience.jsx
import '../styles/Experience.css'


const ACADEMIC = [
  {
    role: 'Research Alumni',
    org: 'AI4Good Lab',
    url: 'https://www.ai4goodlab.com',
    date: 'May 2026 – Present',
    details: [
      'Developing a AI/ML solution for a social good problem under expert mentorship.',
      'Collaborating with a team of 5 across data collection, model training, and deployment.',
      'Working on a project to predict supply and demand for food bank resources based on historical data and external factors such as weather and economic indicators, enabling proactive actions to mitigate shortages in supplies and staffing.',
    ],
  },
  {
    role: 'Tutor',
    org: 'Student Union, University of Alberta',
    url: 'https://www2.su.ualberta.ca/services/infolink/tutor/registry/',
    date: 'Jan 2026 – Present',
    details: [
      'Provide one-on-one tutoring for undergraduate students across computing science, statistics and mathematics courses.',
      'Help students build intuition for algorithms, data structures, and software design.',
    ],
  },
  {
    role: 'Teaching Assistant — CMPUT 204',
    org: 'University of Alberta',
    url: 'https://apps.ualberta.ca/catalogue/course/cmput/204',
    date: 'Jan 2026 – Apr 2026',
    details: [
      'Led weekly lab sections for students in Algorithms I.',
      'Designed practice problems, graded assignments, and held weekly office hours.',
      'Received positive feedback for clear explanations of complexity analysis and proofs.',
    ],
  },
  {
    role: 'Researcher',
    org: 'UR2PhD',
    url: 'https://cra.org/ur2phd/',
    date: 'Sep 2025 – Dec 2025',
    details: [
      'Evaluated GPT-4 and Llama 3 on syntactic and semantic SQL error correction using the Spider dataset.',
      'Built an automated Python pipeline for query testing, error categorisation, and accuracy benchmarking.',
      'Supervised by Prof Denilson Barbosa, Professor of Computer Science at UAlberta.',
    ],
  },
]

const VOLUNTEER = [
  {
    role: 'Volunteer Member',
    org: 'International Students & Visitors Services (ISVS), UAlberta',
    url: 'https://www.ualberta.ca/en/international/international-student-services/index.html',
    date: 'Aug 2025 – Present',
    details: [
      'Support international student integration through peer mentorship and campus events.',
      'Assist with onboarding workshops and help students navigate campus resources.',
    ],
  },
  {
    role: 'Computer Science TA',    
    org: 'TeamUp Science',        
    url: null,
    date: 'Feb 2026', 
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
    date: 'Feb 2024 – Present',
    details: [
      'Prepared a high volume of customised drinks while maintaining quality and consistency.',
      'Trained new staff on recipes, hygiene standards, and POS operation.',
      'Handled customer interactions in a fast-paced environment, building communication skills.',
    ],
  },
]

export default function Experience() {
  return (
    <main className="exp-page">

      {/* Header */}
      <div className="exp-header">
        <p className="exp-section-label">Background</p>
        <h1>Experience</h1>
      </div>

      {/* Intro */}
      <section className="exp-intro">
        <p>
          My experience spans{' '}
          <mark>academic research</mark>, <mark>teaching</mark>, and{' '}
          <mark>volunteer and social service roles</mark>. All my experiences involved mainly <mark>{' '}
            collaborating with others</mark> and <mark> communication</mark> which I believe are one of the most important social skills{' '}.
            I enjoy working with others to solve problems, and I find that collaboration often leads {' '}
            to better outcomes than working alone. Moreover, working in many different environment in different {' '}
            role has shaped my <mark>adaptability</mark> and <mark>time management skills</mark>. 
        </p>
      </section>

      {/* Academic */}
      <section className="exp-section">
        <h2 className="exp-section-title">Academic &amp; Research</h2>
        <div className="exp-list">
          {ACADEMIC.map((item, i) => (
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

    </main>
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
