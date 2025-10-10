import React from 'react'
import SectionHeader from '../components/ui/SectionHeader'
import Card from '../components/ui/Card'
import Layout from '../components/ui/Layout'
import { presentations } from '../data/presentations'

const Presentations: React.FC = () => {
  return (
    <Layout>
      <SectionHeader title="Presentations" />
      <div className="space-y-5">
        {presentations.map((presentation, index) => (
          <Card key={index}>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">{presentation.title}</h3>
            <div className="text-gray-600 space-y-1">
              <p><span className="font-semibold">Event:</span> {presentation.event}</p>
              <p><span className="font-semibold">Date:</span> {presentation.date}</p>
              <p><span className="font-semibold">Location:</span> {presentation.location}</p>
              <p><span className="font-semibold">Type:</span> {presentation.type}</p>
            </div>
          </Card>
        ))}
      </div>
    </Layout>
  )
}

export default Presentations
