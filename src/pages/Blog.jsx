import { posts } from '../data/posts'
import '../styles/Blog.css'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

// Parses **bold** and ==highlight== within a string
function renderInline(text) {
  return text.split(/(\*\*[^*]+\*\*|==[^=]+==)/).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**'))
      return <strong key={i}>{part.slice(2, -2)}</strong>
    if (part.startsWith('==') && part.endsWith('=='))
      return <mark key={i}>{part.slice(2, -2)}</mark>
    return part
  })
}

function renderBlock(block, i) {
  if (block.type === 'p') {
    return <p key={i} className="blog-post-content">{renderInline(block.value)}</p>
  }
  if (block.type === 'list') {
    return (
      <ul key={i} className="blog-post-list">
        {block.items.map((item, j) => (
          <li key={j}>{renderInline(item)}</li>
        ))}
      </ul>
    )
  }
  return null
}

// Small daisies (petals + center) scattered across the whole page
// background — real flower shapes, not just dots, at varied size/rotation.
const BLOG_DAISIES = [
  { top: 10, left: 8, size: 26, rotate: 10 },
  { top: 20, left: 20, size: 30, rotate: 10 },
  { top: 12, left: 76, size: 34, rotate: -15 },
  { top: 20, left: 32, size: 20, rotate: 25 },
  { top: 27, left: 92, size: 28, rotate: -5 },
  { top: 34, left: 4, size: 32, rotate: 40 },
  { top: 41, left: 58, size: 22, rotate: -30 },
  { top: 48, left: 20, size: 30, rotate: 12 },
  { top: 45, left: 84, size: 24, rotate: -20 },
  { top: 62, left: 46, size: 34, rotate: 8 },
  { top: 69, left: 10, size: 20, rotate: -12 },
  { top: 76, left: 68, size: 28, rotate: 30 },
  { top: 83, left: 36, size: 22, rotate: -8 },
  { top: 90, left: 88, size: 32, rotate: 18 },
  { top: 96, left: 14, size: 24, rotate: -25 },
  { top: 70, left: 90, size: 30, rotate: -25 },
]

const PETAL_COUNT = 6

// Full-size daisies standing on the ground, same construction as the
// Experience section on Home (stalk + swaying petals), just planted here
// as scenery instead of framing list items.
const BLOG_FIELD_DAISIES = [
  { left: 2, scale: 0.9, delay: 0.1 },
  { left: 10, scale: 0.6, delay: 0.5 },
  { left: 19, scale: 1.05, delay: 0.9 },
  { left: 29, scale: 0.7, delay: 0.2 },
  { left: 40, scale: 0.95, delay: 0.6 },
  { left: 50, scale: 0.65, delay: 0 },
  { left: 60, scale: 1, delay: 0.4 },
  { left: 70, scale: 0.75, delay: 0.8 },
  { left: 80, scale: 0.9, delay: 0.3 },
  { left: 90, scale: 0.6, delay: 0.7 },
  { left: 97, scale: 0.85, delay: 1 },
]

function MiniDaisy({ size, rotate }) {
  return (
    <div className="blog-mini-daisy" style={{ width: size, height: size, transform: `rotate(${rotate}deg)` }}>
      {Array.from({ length: PETAL_COUNT }).map((_, p) => (
        <span key={p} className="blog-mini-petal" style={{ transform: `rotate(${p * (360 / PETAL_COUNT)}deg)` }} />
      ))}
      <span className="blog-mini-center" />
    </div>
  )
}

function BlogBackground() {
  return (
    <div className="blog-bg">
      <div className="blog-bg-sky" />

      <div className="blog-daisy-scatter">
        {BLOG_DAISIES.map((d, i) => (
          <div key={i} className="blog-daisy-spot" style={{ top: `${d.top}%`, left: `${d.left}%` }}>
            <MiniDaisy size={d.size} rotate={d.rotate} />
          </div>
        ))}
      </div>

      <div className="blog-ground">
        <svg viewBox="0 0 1440 260" preserveAspectRatio="none">
          <path d="M0,160 C300,80 700,200 1000,120 C1200,70 1340,140 1440,120 L1440,260 L0,260 Z" />
        </svg>
      </div>

      <div className="blog-field-row">
        {BLOG_FIELD_DAISIES.map((d, i) => (
          <div key={i} className="blog-field-daisy" style={{ left: `${d.left}%`, transform: `scale(${d.scale})` }}>
            <div className="blog-field-sway" style={{ animationDelay: `${d.delay}s` }}>
              <div className="blog-field-petals">
                {Array.from({ length: 8 }).map((_, p) => (
                  <span key={p} className="blog-field-petal" style={{ transform: `rotate(${p * 45}deg)` }} />
                ))}
              </div>
              <div className="blog-field-center" />
              <div className="blog-field-stalk" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Blog() {
  return (
    <>
      <BlogBackground />

      <main className="blog-page">
        <p className="section-label">Yapping Section</p>
        <h1 className="blog-heading">Blog</h1>


        <div className="blog-list">
          {posts.map(post => (
            <article key={post.id} className="blog-post">
              <h2 className="blog-post-title">{post.title}</h2>
              <time className="blog-post-date">{formatDate(post.date)}</time>

              {Array.isArray(post.content)
                ? post.content.map((block, i) => renderBlock(block, i))
                : <p className="blog-post-content">{post.content}</p>
              }

              {post.images?.length > 0 && (
                <div className="blog-post-images">
                  {post.images.map((src, i) => (
                    <img key={i} src={src} alt="" className="blog-post-img" />
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </main>
    </>
  )
}
