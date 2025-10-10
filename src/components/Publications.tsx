import React from 'react'

const Publications: React.FC = () => {
  const publications = [
    {
      authors: 'Last, F., Coauthor, A., & Another, B.',
      year: 2024,
      title: 'An Important Study on Something Significant',
      venue: 'Journal of Important Research',
      volume: '12(3)',
      pages: '123-145',
    },
    {
      authors: 'Last, F., & Colleague, C.',
      year: 2023,
      title: 'Investigating Novel Approaches to Complex Problems',
      venue: 'Proceedings of the International Conference on Research',
      pages: '45-52',
    },
    {
      authors: 'Last, F.',
      year: 2022,
      title: 'Theoretical Foundations of Contemporary Methods',
      venue: 'Academic Quarterly',
      volume: '8(2)',
      pages: '201-220',
    },
  ]

  return (
    <section className="mb-12 pb-8 border-b border-gray-300">
      <h2 className="text-3xl font-semibold text-slate-800 mb-4 pb-2 border-b-2 border-blue-500">
        Selected Publications
      </h2>
      <div className="space-y-5">
        {publications.map((pub, index) => (
          <div key={index} className="text-gray-700 leading-relaxed pl-6 border-l-4 border-gray-300">
            <p className="mb-1">
              {pub.authors} ({pub.year}). <em>{pub.title}</em>. {pub.venue}
              {pub.volume && `, ${pub.volume}`}, {pub.pages}.
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Publications
