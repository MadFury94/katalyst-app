import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Works from './pages/Works'
import Contact from './pages/Contact'

export default function App() {
  useEffect(() => {
    // Load app.min.js after React has rendered the DOM,
    // then fire katalyst:ready so the template's init code runs
    const script = document.createElement('script')
    script.src = '/js/app.min.js'
    script.onload = () => {
      document.dispatchEvent(new Event('katalyst:ready'))
    }
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/works" element={<Works />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}
