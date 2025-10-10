import React from 'react'

const Presentations: React.FC = () => {
  const presentations = [
    {
      title: 'Presentation Title 1',
      event: 'Conference/Workshop Name',
      date: 'Month Year',
      location: 'Location',
      type: 'Oral Presentation',
    },
    {
      title: 'Presentation Title 2',
      event: 'Conference/Workshop Name',
      date: 'Month Year',
      location: 'Location',
      type: 'Poster Presentation',
    },
  ]

  return (
    <section>
      <h2 className="text-3xl font-semibold text-slate-800 mb-4 pb-2 border-b-2 border-blue-500">
        Presentations
      </h2>
      <div className="space-y-5">
        {presentations.map((presentation, index) => (
          <div key={index} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-slate-700 mb-2">{presentation.title}</h3>
            <div className="text-gray-600 space-y-1">
              <p><span className="font-semibold">Event:</span> {presentation.event}</p>
              <p><span className="font-semibold">Date:</span> {presentation.date}</p>
              <p><span className="font-semibold">Location:</span> {presentation.location}</p>
              <p><span className="font-semibold">Type:</span> {presentation.type}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Presentations
