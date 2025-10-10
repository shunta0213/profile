import React from 'react'
import SectionHeader from '../components/ui/SectionHeader'
import Layout from '../components/ui/Layout'

const Home: React.FC = () => {
  return (
    <Layout>
      <SectionHeader title="About" />
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
    </Layout>
  )
}

export default Home
