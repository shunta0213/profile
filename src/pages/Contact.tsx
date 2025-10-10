import React from 'react'
import SectionHeader from '../components/ui/SectionHeader'
import Card from '../components/ui/Card'
import Layout from '../components/ui/Layout'
import { contactInfo } from '../data/contact'

const Contact: React.FC = () => {
  return (
    <Layout>
      <SectionHeader title="Contact Information" />
      <Card className="p-6">
        <div className="space-y-3 text-gray-700">
          <p>
            <span className="font-semibold">Email:</span>{' '}
            <a href={`mailto:${contactInfo.email}`} className="text-blue-600 hover:underline">
              {contactInfo.email}
            </a>
          </p>
          <p>
            <span className="font-semibold">Affiliation:</span><br />
            <a
              href={contactInfo.affiliation.lab.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {contactInfo.affiliation.lab.name}
            </a>,<br/>
            {contactInfo.affiliation.department}<br />
            {contactInfo.affiliation.university}<br />
          </p>
        </div>
      </Card>
    </Layout>
  )
}

export default Contact
