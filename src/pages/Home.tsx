import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { publications } from '../data/publications'
import { presentations } from '../data/presentations'
import { education, research, teaching, honors, activities, experience } from '../data/resume'
import type { Activity, Experience } from '../data/resume'
import { contactInfo } from '../data/contact'
import { socialLinks } from '../data/socialLinks'
import './portfolio.css'

const sections = [
  ['research', 'Research'], ['publications', 'Publications'], ['presentations', 'Presentations'],
  ['cv', 'CV'], ['experience', 'Past engineering activities'], ['contact', 'Contact'],
]

const recentPublications = [
  {
    doi: '10.48550/arXiv.2604.11449',
    summary: 'A study of sampling bias in quantum annealing for weighted graph bipartitioning, focusing on how degenerate optimal solutions are sampled.',
  },
  {
    doi: '10.1109/QCE65121.2025.10413',
    summary: 'A sample-persistence-based method that uses multiple penalty coefficients to reduce variables in constrained combinatorial optimization problems.',
  },
].flatMap(({ doi, summary }) => {
  const publication = publications.find(p => p.doi === doi)
  return publication ? [{ ...publication, summary }] : []
})

function CVLink({ className = '' }: { className?: string }) {
  return <a className={`ac-cv-link ${className}`} href="/CV.pdf" target="_blank" rel="noreferrer">CV (PDF) <span aria-hidden="true">↗</span></a>
}

function Entries({ items }: { items: Array<Experience | Activity> }) {
  return <div className="ac-entries">{items.map((item, i) => <article className="ac-entry" key={`${item.title}-${i}`}>
    <p className="ac-period">{item.period}</p><div><h4>{item.url && !item.organization ? <a href={item.url} target="_blank" rel="noreferrer">{item.title} ↗</a> : item.title}</h4>{item.organization && <p>{item.url ? <a href={item.url} target="_blank" rel="noreferrer">{item.organization} ↗</a> : item.organization}</p>}
      {item.description.length > 0 && <ul>{item.description.map(d => <li key={d}>{d}</li>)}</ul>}
    </div>
  </article>)}</div>
}

function PresentationList({ start = 0, end = presentations.length }: { start?: number; end?: number }) {
  return <ol className="ac-citations">{presentations.slice(start, end).map((p, i) => <li key={`${p.title}-${p.date}`}>
    <span className="ac-citation-index">{String(start + i + 1).padStart(2, '0')}</span><div>
      <div className="ac-item-meta"><span>{p.date}</span><span>{p.type}</span></div>
      <h3>{p.title}</h3><p className="ac-authors">{p.authors}</p><p className="ac-venue">{p.url ? <a href={p.url} target="_blank" rel="noreferrer">{p.event} ↗</a> : p.event}{p.venue && ` · ${p.venue}`}</p>
    </div>
  </li>)}</ol>
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  })
}

export default function Home() {
  const [searchParams] = useSearchParams()
  const section = searchParams.get('section')

  useEffect(() => {
    if (section) {
      scrollToSection(section)
    } else {
      window.scrollTo(0, 0)
    }
  }, [section])

  const navigation = (
    <nav className="ac-section-nav" aria-label="Page sections">
      {sections.map(([id, label]) => (
        <Link
          key={id}
          to={`/?section=${id}`}
          aria-current={section === id ? 'location' : undefined}
          onClick={() => { if (section === id) scrollToSection(id) }}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
  const social = <div className="ac-social">{socialLinks.map(s => <a key={s.name} href={s.url} target="_blank" rel="noreferrer">{s.name} ↗</a>)}</div>

  return <div className="ac">
    <Link className="ac-skip-link" to="/?section=research" onClick={() => {
      document.getElementById('main-content')?.focus({ preventScroll: true })
      scrollToSection('research')
    }}>Skip to content</Link>
    <div className="ac-shell">
      <header className="ac-profile"><div className="ac-identity"><h1>Shunta Ide</h1><p className="ac-role">Master’s student</p><p>Graduate School of Science and Technology<br />{' '}Keio University, Japan</p><a className="ac-lab" href={contactInfo.affiliation.lab.url} target="_blank" rel="noreferrer">Shu Tanaka Laboratory ↗</a><CVLink />{social}</div>{navigation}</header>
      <main id="main-content" className="ac-content" tabIndex={-1}>
        <section id="research" className="ac-section ac-research"><div className="ac-section-title"><h2>Research</h2></div>
          <p className="ac-intro">My research focuses on quantum annealing and combinatorial optimization, with particular interests in ground-state sampling and variable reduction for constrained optimization problems.</p>
          <h3 className="ac-recent-heading">Recent publications</h3>
          <div className="ac-research-topics">{recentPublications.map(p => <article key={p.doi}>
            <div className="ac-item-meta"><span>{p.year}</span>{p.toAppear && <span>To appear</span>}{p.status && <span>{p.status}</span>}</div>
            <h4><a href={`https://doi.org/${p.doi}`} target="_blank" rel="noreferrer">{p.title}</a></h4>
            <p>{p.summary}</p>
            <a href={`https://doi.org/${p.doi}`} target="_blank" rel="noreferrer">Read paper ↗</a>
          </article>)}</div>
        </section>
        <section id="publications" className="ac-section"><div className="ac-section-title"><h2>Publications</h2><span>{publications.length} entries</span></div>
          <ol className="ac-citations">{publications.map((p, i) => <li key={p.title}>
            <span className="ac-citation-index">{String(i + 1).padStart(2, '0')}</span><div>
              <div className="ac-item-meta"><span>{p.year}</span>{p.toAppear && <span>To appear</span>}{p.status && <span>{p.status}</span>}</div>
              <h3>{p.doi ? <a href={`https://doi.org/${p.doi}`} target="_blank" rel="noreferrer">{p.title}</a> : p.title}</h3>
              <p className="ac-authors">{p.authors}</p><p className="ac-venue">{p.venue}{p.pages ? `, ${p.pages}` : ''}</p>
              {p.doi && <a className="ac-paper-link" href={`https://doi.org/${p.doi}`} target="_blank" rel="noreferrer">{p.doi.includes('arXiv') ? 'arXiv' : 'DOI'} ↗</a>}
            </div>
          </li>)}</ol>
        </section>
        <section id="presentations" className="ac-section"><div className="ac-section-title"><h2>Presentations</h2><span>{presentations.length} entries</span></div><PresentationList end={4} />
          {presentations.length > 4 && <details className="ac-more"><summary>More presentations ({presentations.length - 4})</summary><PresentationList start={4} /></details>}
        </section>
        <section id="cv" className="ac-section"><div className="ac-section-title"><h2>Curriculum vitae</h2><CVLink /></div><p className="ac-section-description">Education, research experience, teaching, awards, and academic activities. A PDF version is available above.</p>
          <h3 className="ac-subheading">Education</h3><div className="ac-entries">{education.map(e => <article className="ac-entry" key={e.degree}><p className="ac-period">{e.period}</p><div><h4>{e.degree}</h4><p>{e.institution}</p>{e.details?.map(d => <p key={d}>{d}</p>)}</div></article>)}</div>
          <h3 className="ac-subheading">Research experience</h3><Entries items={research} />
          <h3 className="ac-subheading">Honors & awards</h3><Entries items={honors} />
          <h3 className="ac-subheading">Teaching experience</h3><Entries items={teaching} />
          <h3 className="ac-subheading">Leadership & activities</h3><Entries items={activities} />
        </section>
        <section id="experience" className="ac-section"><div className="ac-section-title"><h2>Past engineering activities</h2></div><p className="ac-section-description">Previous software engineering roles, internships, and startup experience.</p><Entries items={experience} /></section>
        <section id="contact" className="ac-section ac-contact"><div className="ac-section-title"><h2>Contact</h2></div><div>{contactInfo.email.map(email => <a key={email} href={`mailto:${email}`}>{email}</a>)}</div>{social}</section>
        <footer className="ac-footer"><span>© {new Date().getFullYear()} Shunta Ide</span><CVLink /></footer>
      </main>
    </div>
  </div>
}
