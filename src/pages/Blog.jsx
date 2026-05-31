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

export default function Blog() {
  return (
    <main className="blog-page">
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
  )
}
