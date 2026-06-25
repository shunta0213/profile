import React from 'react'
import SectionHeader from '../components/ui/SectionHeader'
import Layout from '../components/ui/Layout'

const Home: React.FC = () => {
  return (
    <Layout>
      <SectionHeader title="About" />
      <div className="text-gray-700 leading-relaxed space-y-4">
        <p>
          I am a Master's student in the Graduate School of Science and Technology at Keio University.
          My research interests lie at the intersection of quantum computing,
          Ising machines, and combinatorial optimization.
        </p>
        <p>
          You can find my CV{' '}
          <a
            href="/CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            here
          </a>
          .
        </p>
      </div>
    </Layout>
  )
}

export default Home
