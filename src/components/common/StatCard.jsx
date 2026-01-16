import React from 'react'

const StatCard = ({ 
  icon, 
  number, 
  label, 
  color = 'blue',
  onClick 
}) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500'
  }

  return (
    <div 
      className="bg-white p-5 rounded-lg shadow-md flex items-center gap-4 cursor-pointer transition-transform hover:scale-105"
      onClick={onClick}
    >
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl text-white ${colorClasses[color]}`}>
        <i className={`fas fa-${icon}`}></i>
      </div>
      <div className="flex-1">
        <div className="text-2xl font-bold text-gray-800">{number}</div>
        <div className="text-sm text-gray-600">{label}</div>
      </div>
    </div>
  )
}

export default StatCard