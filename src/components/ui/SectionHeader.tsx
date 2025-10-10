import React from 'react'

interface SectionHeaderProps {
  title: string
  tail?: React.ReactNode
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, tail }) => {
  return (
    <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-blue-500">
      <h2 className="text-3xl font-semibold text-slate-800">
        {title}
      </h2>
      {tail && <div className="text-gray-600">{tail}</div>}
    </div>
  )
}

export default SectionHeader
