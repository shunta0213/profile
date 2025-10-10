import React from 'react'

const Contact: React.FC = () => {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-semibold text-slate-800 mb-4 pb-2 border-b-2 border-blue-500">
        Contact Information
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="space-y-3 text-gray-700">
          <p>
            <span className="font-semibold">Email:</span>{' '}
            <a href="mailto:email@university.edu" className="text-blue-600 hover:underline">
              email@university.edu
            </a>
          </p>
          <p>
            <span className="font-semibold">Office:</span> Building Name, Room 123
          </p>
          <p>
            <span className="font-semibold">Address:</span><br />
            Department of [Your Field]<br />
            [Your University]<br />
            [City, State ZIP]
          </p>
          <p>
            <span className="font-semibold">Office Hours:</span> [Day/Time] or by appointment
          </p>
        </div>
      </div>
    </section>
  )
}

export default Contact
