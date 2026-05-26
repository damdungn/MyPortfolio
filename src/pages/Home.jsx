// src/pages/Home.jsx
import '../styles/Home.css'
import avatar from '../../public/avatar.JPG'

export default function Home() {
  return (
    <main className="home">

      {/* HERO */}
      <section className="hero">
        <h1 className="hero-name">DAM DUNG NGUYEN MONG</h1>
        <p className="hero-tagline">COMPUTING SCIENCE STUDENT FROM EDMONTON, CANADA</p>
        <a href="#about" className="hero-scroll">↓</a>
      </section>

      {/* ABOUT */}
      <section className="about" id="about">

        {/* LEFT — story */}
        <div className="about-story">
          <h2>MY STORY</h2>
          <p>
            Hello, I'm a 4-th year Computing Science student at the University of Alberta from Edmonton, Canada.
            I'm interested in Computer Visions, Machine Learning, and Software Development. I am passionate about integrating AI into multiple applications to create innovative and impactful solutions. My strength lies in problem-solving skills, math reasoning, data analysis and quick learning.
            Currently looking for exciting opportunities.
          </p>
          <a href="MyPortfolio/resume.pdf" className="btn-resume" target="_blank" rel="noopener">
            ⬇ DOWNLOAD RESUME
          </a>
          <h2>LITTLE FUN FACTS</h2>
          <p>
            I am belong to a minority group called the Tay, which is the second largest ethnic group in Vietnam. My hometown is a small mountainous province called Cao Bang, which is famous for its stunning landscapes and rich cultural heritage. 
          </p>
        </div>

        {/* CENTER — photo + experience */}
        <div className="about-photo">
          <img src={avatar} alt="Your Name" />
          <h2>Experience / Extracurricular</h2>
          <ul className="exp-list">
            <li className="exp-item">
              <span className="exp-role">Research Alumni</span>
              <div className="exp-meta">
                <a href="https://www.ai4goodlab.com" target="_blank" rel="noopener" className="exp-org">AI4Good Lab</a>
                <span className="exp-date">May 2026 – Present</span>
              </div>
            </li>
            <li className="exp-item">
              <span className="exp-role">Tutor</span>
              <div className="exp-meta">
                <a href="https://www2.su.ualberta.ca/services/infolink/tutor/registry/" target="_blank" rel="noopener" className="exp-org">Student Union, UAlberta</a>
                <span className="exp-date">Jan 2026 – Present</span>
              </div>
            </li>
            <li className="exp-item">
              <span className="exp-role">Teaching Assistant · CMPUT 204</span>
              <div className="exp-meta">
                <a href="https://apps.ualberta.ca/catalogue/course/cmput/204" target="_blank" rel="noopener" className="exp-org">University of Alberta</a>
                <span className="exp-date">Jan 2026 – Apr 2026</span>
              </div>
            </li>
            <li className="exp-item">
              <span className="exp-role">Researcher</span>
              <div className="exp-meta">
                <a href="https://cra.org/ur2phd/" target="_blank" rel="noopener" className="exp-org">UR2PhD</a>
                <span className="exp-date">Sep 2025 – Dec 2025</span>
              </div>
            </li>
            <li className="exp-item">
              <span className="exp-role">Volunteer Member</span>
              <div className="exp-meta">
                <a href="https://www.ualberta.ca/en/international/international-student-services/index.html" target="_blank" rel="noopener" className="exp-org">ISVS, UAlberta</a>
                <span className="exp-date">Aug 2025 – Present</span>
              </div>
            </li>
          </ul>
        </div>

        {/* RIGHT — personal info */}
        <div className="about-info">
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
          <h2>Education</h2>
          <table>
            <tbody>
              <tr><td>University</td><td>University of Alberta</td></tr>
              <tr><td>Degree</td><td>Bachelor of Science in Computing Science</td></tr>
              <tr><td>Graduation</td><td>May 2027</td></tr>
              <tr><td>GPA</td><td>3.8 /4.0</td></tr>
            </tbody>
          </table>
        </div>

      </section>

      {/* SKILLS */}
      <section className="skills-section">
        <h2>SKILLS</h2>
        <div className="tags">
          {['JavaScript', 'React', 'Python', 'Node.js', 'Git', 'SQL', 'HTML', 'CSS', 'C', 'Java'].map(skill => (
            <span key={skill} className="tag">{skill}</span>
          ))}
        </div>
      </section>

      {/* HOBBIES */}
      <section className="skills-section">
        <h2>BEYOND CODE</h2>
        <div className="tags">
          {['Baking', 'Bubble Tea', 'Cooking', 'Reading', 'Painting', 'Crocheting', 'Gardening'].map(h => (
            <span key={h} className="tag hobby-tag">{h}</span>
          ))}
        </div>
      </section>

    </main>
  )
}