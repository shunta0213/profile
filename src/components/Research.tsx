import React from 'react'

const Research: React.FC = () => {
  const researchAreas = [
    {
      title: 'Research Area 1',
      description: 'Description of your first research area and its significance in the field.',
    },
    {
      title: 'Research Area 2',
      description: 'Description of your second research area and current projects.',
    },
    {
      title: 'Research Area 3',
      description: 'Description of your third research area and future directions.',
    },
  ]

  return (
    <section className="mb-12 pb-8 border-b border-gray-300">
      <h2 className="text-3xl font-semibold text-slate-800 mb-4 pb-2 border-b-2 border-blue-500">
        Research Interests
      </h2>
      <div className="space-y-6">
        {researchAreas.map((area, index) => (
          <div key={index} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-slate-700 mb-2">{area.title}</h3>
            <p className="text-gray-600 leading-relaxed">{area.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Research
