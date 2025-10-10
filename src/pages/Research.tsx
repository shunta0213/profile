import React from 'react'
import SectionHeader from '../components/ui/SectionHeader'
import Card from '../components/ui/Card'
import Layout from '../components/ui/Layout'
import { researchAreas } from '../data/researchAreas'

const Research: React.FC = () => {
  return (
    <Layout>
      <SectionHeader title="Research Interests" />
      <div className="space-y-6">
        {researchAreas.map((area, index) => (
          <Card key={index}>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">{area.title}</h3>
            <p className="text-gray-600 leading-relaxed">{area.description}</p>
          </Card>
        ))}
      </div>
    </Layout>
  )
}

export default Research
