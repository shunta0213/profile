import React from 'react'
import SectionHeader from '../components/ui/SectionHeader'
import Card from '../components/ui/Card'
import Layout from '../components/ui/Layout'
import { presentations } from '../data/presentations'

const highlightAuthor = (authors: string) => {
  const name = 'Shunta Ide'
  const parts = authors.split(name)
  return parts.flatMap((part, i) =>
    i < parts.length - 1
      ? [part, <span key={i} className="underline">{name}</span>]
      : [part]
  )
}

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
          <p><span className="font-semibold">Authors:</span> {highlightAuthor(presentation.authors)}</p>
          <p>
            <span className="font-semibold">Event:</span>{' '}
            {presentation.url ? (
              <a href={presentation.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {presentation.event}
              </a>
            ) : (
              presentation.event
            )}
          </p>
          {presentation.venue && (
            <p><span className="font-semibold">Venue:</span> {presentation.venue}</p>
          )}
          <p><span className="font-semibold">Date:</span> {presentation.date}</p>
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
