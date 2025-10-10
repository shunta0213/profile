import React from 'react'

interface SectionHeaderProps {
  title: string
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <h2 className="text-3xl font-semibold text-slate-800 mb-4 pb-2 border-b-2 border-blue-500">
      {title}
    </h2>
  )
}

export default SectionHeader
