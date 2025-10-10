import React from 'react'
import Layout from '../components/ui/Layout'
import SectionHeader from '../components/ui/SectionHeader'
import Card from '../components/ui/Card'
import { education } from '../data/resume'

const Resume: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-10">
        {/* Education Section */}
        <section>
          <SectionHeader title="Education" />
          <div className="space-y-4">
            {education.map((edu, index) => (
              <Card key={index}>
                <h3 className="text-xl font-semibold text-slate-700">{edu.degree}</h3>
                <p className="text-lg text-gray-700 mt-1">{edu.institution}</p>
                <p className="text-gray-600 mt-1">{edu.period}</p>
                {edu.details && (
                  <ul className="mt-3 space-y-1 text-gray-600">
                    {edu.details.map((detail, idx) => (
                      <li key={idx} className="ml-4">• {detail}</li>
                    ))}
                  </ul>
                )}
              </Card>
            ))}
          </div>
        </section>

      </div>
    </Layout>
  )
}

export default Resume
