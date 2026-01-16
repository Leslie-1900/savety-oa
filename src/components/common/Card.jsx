import React from 'react'

const Card = ({ 
  children, 
  title, 
  actions, 
  className = '',
  bodyClassName = '' 
}) => {
  return (
    <div className={`card ${className}`}>
      {title && (
        <div className="card-header">
          <div className="card-title">{title}</div>
          {actions && <div className="card-actions">{actions}</div>}
        </div>
      )}
      <div className={`card-body ${bodyClassName}`}>
        {children}
      </div>
    </div>
  )
}

export default Card