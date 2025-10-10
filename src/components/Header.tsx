import React from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <header className="bg-slate-800 text-gray-100 shadow-md">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Link to="/" className="block hover:opacity-90 transition-opacity">
          <h1 className="text-4xl font-bold mb-2">Shunta Ide</h1>
          <p className="text-xl text-gray-300">Senior | Department of Applied Physics and Physico-Informatics</p>
          <p className="text-lg text-gray-400 mt-1">Keio University, Japan</p>
        </Link>
      </div>
      <nav className="bg-slate-700">
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
    </header>
  )
}

export default Header
