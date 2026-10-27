import React from 'react'
import Layout from '../components/ui/Layout'
import SectionHeader from '../components/ui/SectionHeader'
import Card from '../components/ui/Card'
import { education, research, teaching, experience, activities, honors } from '../data/resume'
import type { Activity, Experience } from '../data/resume'

const EntryList: React.FC<{ items: Array<Experience | Activity> }> = ({ items }) => (
  <div className="space-y-4">
    {items.map((item, index) => (
      <Card key={index}>
        <h3 className="text-xl font-semibold text-slate-700">
          {item.url && !item.organization ? <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">{item.title} ↗</a> : item.title}
        </h3>
        {item.url && item.organization ? (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-blue-600 hover:text-blue-800 mt-1 inline-block"
          >
            {item.organization}
          </a>
        ) : (
          item.organization && <p className="text-lg text-gray-700 mt-1">{item.organization}</p>
        )}
        <p className="text-gray-600 mt-1">{item.period}</p>
        {item.description.length > 0 && (
          <ul className="mt-3 space-y-2 text-gray-600">
            {item.description.map((desc, idx) => (
              <li key={idx} className="ml-4">• {desc}</li>
            ))}
          </ul>
        )}
      </Card>
    ))}
  </div>
)

const Resume: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-10">
        <section>
          <SectionHeader title="Education" />
          <div className="space-y-4">
            {education.map((edu, index) => (
              <Card key={index}>
                <h3 className="text-xl font-semibold text-slate-700">{edu.degree}</h3>
                <p className="text-lg text-gray-700 mt-1">{edu.institution}</p>
                <p className="text-gray-600 mt-1">{edu.period}</p>
                {edu.details && edu.details.length > 0 && (
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

        <section>
          <SectionHeader title="Research Experience" />
          <EntryList items={research} />
        </section>

        <section>
          <SectionHeader title="Teaching Experience" />
          <EntryList items={teaching} />
        </section>

        <section>
          <SectionHeader title="Work Experience" />
          <EntryList items={experience} />
        </section>

        <section>
          <SectionHeader title="Leadership & Activities" />
          <EntryList items={activities} />
        </section>

        <section>
          <SectionHeader title="Honors & Awards" />
          <EntryList items={honors} />
        </section>
      </div>
    </Layout>
  )
}

export default Resume
