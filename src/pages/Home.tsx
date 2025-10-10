import React from 'react'

const Home: React.FC = () => {
  return (
    <section>
      <h2 className="text-3xl font-semibold text-slate-800 mb-4 pb-2 border-b-2 border-blue-500">
        About
      </h2>
      <div className="text-gray-700 leading-relaxed space-y-4">
        <p>
          I am a senior undergraduate student in the Department of Applied Physics and Physico-Informatics
          at Keio University. My research interests lie at the intersection of quantum computing,
          Ising machines, and combinatorial optimization.
        </p>
        <p>
          I am passionate about exploring the practical applications of quantum algorithms and
          optimization techniques to solve complex computational problems. My current work focuses
          on understanding the capabilities and limitations of Ising machines in addressing
          real-world combinatorial optimization challenges.
        </p>
      </div>
    </section>
  )
}

export default Home
