import React from 'react'
import Layout from '../components/ui/Layout'
import SectionHeader from '../components/ui/SectionHeader'
import Card from '../components/ui/Card'
import { education, experience, activities } from '../data/resume'

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

        {/* Work Experience Section */}
        {experience.length > 0 && (
          <section>
            <SectionHeader title="Work Experience" />
            <div className="space-y-4">
              {experience.map((exp, index) => (
                <Card key={index}>
                  <h3 className="text-xl font-semibold text-slate-700">{exp.title}</h3>
                  {exp.url ? (
                    <a
                      href={exp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg text-blue-600 hover:text-blue-800 mt-1 inline-block"
                    >
                      {exp.organization}
                    </a>
                  ) : (
                    <p className="text-lg text-gray-700 mt-1">{exp.organization}</p>
                  )}
                  <p className="text-gray-600 mt-1">{exp.period}</p>
                  <ul className="mt-3 space-y-2 text-gray-600">
                    {exp.description.map((desc, idx) => (
                      <li key={idx} className="ml-4">• {desc}</li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Leadership & Activities Section */}
        {activities.length > 0 && (
          <section>
            <SectionHeader title="Leadership & Activities" />
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <Card key={index}>
                  <h3 className="text-xl font-semibold text-slate-700">{activity.title}</h3>
                  {activity.url ? (
                    <a
                      href={activity.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg text-blue-600 hover:text-blue-800 mt-1 inline-block"
                    >
                      {activity.organization}
                    </a>
                  ) : (
                    <p className="text-lg text-gray-700 mt-1">{activity.organization}</p>
                  )}
                  <p className="text-gray-600 mt-1">{activity.period}</p>
                  <ul className="mt-3 space-y-2 text-gray-600">
                    {activity.description.map((desc, idx) => (
                      <li key={idx} className="ml-4">• {desc}</li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </section>
        )}

      </div>
    </Layout>
  )
}

export default Resume
