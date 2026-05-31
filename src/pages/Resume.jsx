import resume1 from '../../public/1.png'
import resume2 from '../../public/2.png'

export default function Resume() {
  return (
    <main style={{ background: '#f5f7f2', minHeight: '100vh', padding: '48px 24px 80px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
      <img src={resume1} alt="Resume page 1" style={{ width: '100%', maxWidth: '800px', display: 'block', boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }} />
      <img src={resume2} alt="Resume page 2" style={{ width: '100%', maxWidth: '800px', display: 'block', boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }} />
    </main>
  )
}
