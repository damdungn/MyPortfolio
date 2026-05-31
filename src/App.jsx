// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Blog from './pages/Blog'
import Experience from './pages/Experience'

export default function App() {
  return (
    <BrowserRouter basename="/MyPortfolio">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/experience" element={<Experience />} />
      </Routes>
    </BrowserRouter>
  )
}