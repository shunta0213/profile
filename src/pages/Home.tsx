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
      </div>
    </Layout>
  )
}

export default Home
