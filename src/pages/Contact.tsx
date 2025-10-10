import React from 'react'

const Contact: React.FC = () => {
  return (
    <section>
      <h2 className="text-3xl font-semibold text-slate-800 mb-4 pb-2 border-b-2 border-blue-500">
        Contact Information
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="space-y-3 text-gray-700">
          <p>
            <span className="font-semibold">Email:</span>{' '}
            <a href="mailto:shunta16213@keio.jp" className="text-blue-600 hover:underline">
              shunta16213@keio.jp
            </a>
          </p>
          <p>
            <span className="font-semibold">Affiliation:</span><br />
            <a href="https://shutanaka.appi.keio.ac.jp/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Shu Tanaka Lab</a>,<br/>
            Department of Applied Physics and Physico-Informatics<br />
            Keio University<br />
          </p>
        </div>
      </div>
    </section>
  )
}

export default Contact
