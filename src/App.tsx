import { Routes, Route, HashRouter } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Publications from "./pages/Publications";
import Presentations from "./pages/Presentations";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";
import { socialLinks } from "./data/socialLinks";

const socialIcons: Record<string, JSX.Element> = {
  x: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  linkedin: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  "google-scholar": (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
    </svg>
  ),
  orcid: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.444h2.297c2.359 0 4.053-1.666 4.053-3.722 0-2.025-1.372-3.722-4.053-3.722h-2.297z" />
    </svg>
  ),
};

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col font-serif bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8 flex-1 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/presentations" element={<Presentations />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <footer className="bg-slate-800 text-gray-100 text-center py-4 sm:py-6 mt-8 sm:mt-12">
          <div className="flex justify-center gap-4 sm:gap-6 mb-3 sm:mb-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-400 transition-colors p-2"
                aria-label={link.ariaLabel}
              >
                {socialIcons[link.icon]}
              </a>
            ))}
          </div>
          <p className="text-xs sm:text-sm px-4">
            &copy; {new Date().getFullYear()} Shunta Ide. All rights reserved.
          </p>
        </footer>
      </div>
    </HashRouter>
  );
}

export default App;
