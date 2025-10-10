import React from 'react'

const About: React.FC = () => {
  return (
    <section className="mb-12 pb-8 border-b border-gray-300">
      <h2 className="text-3xl font-semibold text-slate-800 mb-4 pb-2 border-b-2 border-blue-500">
        About
      </h2>
      <div className="text-gray-700 leading-relaxed space-y-4">
        <p>
          I am an Assistant Professor in the Department of [Your Field] at [Your University].
          My research interests lie at the intersection of [Research Area 1], [Research Area 2],
          and [Research Area 3].
        </p>
        <p>
          Prior to joining [Your University], I completed my Ph.D. in [Field] at [University Name]
          under the supervision of [Advisor Name]. My dissertation focused on [Dissertation Topic].
        </p>
        <p>
          My work has been published in leading venues including [Journal/Conference Names] and
          has been supported by grants from [Funding Agencies].
        </p>
      </div>
    </section>
  )
}

export default About
