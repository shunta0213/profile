import React from 'react'

interface SectionHeaderProps {
  title: string
  tail?: React.ReactNode
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, tail }) => {
  return (
    <div className="flex justify-between items-end mb-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight pl-3 border-l-4 border-blue-500">
          {title}
        </h2>
        <div className="mt-2 ml-3 h-px w-16 bg-gradient-to-r from-blue-500 to-transparent" />
      </div>
      {tail && <div className="text-gray-500 text-sm">{tail}</div>}
    </div>
  )
}

export default SectionHeader
