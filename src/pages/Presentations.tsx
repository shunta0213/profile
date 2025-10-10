import React from 'react'
import SectionHeader from '../components/ui/SectionHeader'
import Card from '../components/ui/Card'
import Layout from '../components/ui/Layout'
import { presentations } from '../data/presentations'

const Presentations: React.FC = () => {
  const today = new Date()

  const upcomingPresentations = presentations.filter(presentation => {
    const presentationDate = new Date(presentation.date)
    return presentationDate >= today
  })

  const finishedPresentations = presentations.filter(presentation => {
    const presentationDate = new Date(presentation.date)
    return presentationDate < today
  })

  const renderPresentations = (presentationList: typeof presentations) => (
    presentationList.map((presentation, index) => (
      <Card key={index}>
        <h3 className="text-xl font-semibold text-slate-700 mb-2">{presentation.title}</h3>
        <div className="text-gray-600 space-y-1">
          <p><span className="font-semibold">Event:</span> {presentation.event}</p>
          <p><span className="font-semibold">Date:</span> {presentation.date}</p>
          <p><span className="font-semibold">Location:</span> {presentation.location}</p>
          <p><span className="font-semibold">Type:</span> {presentation.type}</p>
        </div>
      </Card>
    ))
  )

  return (
    <Layout>
      {upcomingPresentations.length > 0 && (
        <>
          <SectionHeader title="Upcoming Presentations" tail={`Total: ${upcomingPresentations.length}`} />
          <div className="space-y-5">
            {renderPresentations(upcomingPresentations)}
          </div>
        </>
      )}

      {finishedPresentations.length > 0 && (
        <div className="mt-12">
          <SectionHeader title="Past Presentations" tail={`Total: ${finishedPresentations.length}`} />
          <div className="space-y-5">
            {renderPresentations(finishedPresentations)}
          </div>
        </div>
      )}
    </Layout>
  )
}

export default Presentations
