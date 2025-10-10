import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Publications from './pages/Publications'
import Presentations from './pages/Presentations'
import Resume from './pages/Resume'
import Contact from './pages/Contact'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-serif bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-6 py-8 flex-1 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/presentations" element={<Presentations />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <footer className="bg-slate-800 text-gray-100 text-center py-6 mt-12">
          <p className="text-sm">&copy; {new Date().getFullYear()} Shunta Ide. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
