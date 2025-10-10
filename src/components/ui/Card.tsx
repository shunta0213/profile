import React, { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white p-5 rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {children}
    </div>
  )
}

export default Card
