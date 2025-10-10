import React from 'react'

const Research: React.FC = () => {
  const researchAreas = [
    {
      title: 'Quantum Computing',
      description: 'Exploring quantum algorithms and their potential applications in solving computationally hard problems. Investigating the theoretical foundations and practical implementations of quantum computing systems.',
    },
    {
      title: 'Ising Machines',
      description: 'Studying Ising machines as specialized hardware for solving optimization problems. Analyzing their performance characteristics, scalability, and practical applications in various domains.',
    },
    {
      title: 'Combinatorial Optimization',
      description: 'Developing and analyzing algorithms for combinatorial optimization problems. Focusing on the application of both classical and quantum approaches to real-world optimization challenges.',
    },
  ]

  return (
    <section>
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
