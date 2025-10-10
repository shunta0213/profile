import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen)
  const closeDrawer = () => setIsDrawerOpen(false)

  return (
    <header className="bg-slate-800 text-gray-100 shadow-md">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="block hover:opacity-90 transition-opacity" onClick={closeDrawer}>
            <h1 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">Shunta Ide</h1>
            <p className="text-sm sm:text-xl text-gray-300">Senior | Department of Applied Physics and Physico-Informatics</p>
            <p className="text-xs sm:text-lg text-gray-400 mt-0.5 sm:mt-1">Keio University, Japan</p>
          </Link>
          <button
            onClick={toggleDrawer}
            className="sm:hidden p-2 hover:bg-slate-700 rounded transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isDrawerOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden sm:block bg-slate-700">
        <div className="max-w-4xl mx-auto px-6">
          <ul className="flex space-x-8 py-4">
            <li>
              <Link to="/" className="hover:text-blue-300 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/resume" className="hover:text-blue-300 transition-colors">
                Resume
              </Link>
            </li>
            <li>
              <Link to="/publications" className="hover:text-blue-300 transition-colors">
                Publications
              </Link>
            </li>
            <li>
              <Link to="/presentations" className="hover:text-blue-300 transition-colors">
                Presentations
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-300 transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`sm:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeDrawer}
      />
      <nav
        className={`sm:hidden fixed top-0 right-0 h-full w-64 bg-slate-700 z-50 transform transition-transform ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <ul className="flex flex-col p-6 space-y-4">
          <li>
            <Link to="/" className="block py-2 hover:text-blue-300 transition-colors" onClick={closeDrawer}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/resume" className="block py-2 hover:text-blue-300 transition-colors" onClick={closeDrawer}>
              Resume
            </Link>
          </li>
          <li>
            <Link to="/publications" className="block py-2 hover:text-blue-300 transition-colors" onClick={closeDrawer}>
              Publications
            </Link>
          </li>
          <li>
            <Link to="/presentations" className="block py-2 hover:text-blue-300 transition-colors" onClick={closeDrawer}>
              Presentations
            </Link>
          </li>
          <li>
            <Link to="/contact" className="block py-2 hover:text-blue-300 transition-colors" onClick={closeDrawer}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
