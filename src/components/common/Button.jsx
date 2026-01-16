import React from 'react'

const Button = ({ 
  children, 
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  onClick,
  className = '',
  type = 'button'
}) => {
  const variantClasses = {
    primary: 'btn-primary',
    success: 'btn-success',
    warning: 'btn-warning',
    danger: 'btn-danger',
    outline: 'btn-outline'
  }

  const sizeClasses = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg'
  }

  return (
    <button
      type={type}
      className={`btn ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <i className="fas fa-spinner fa-spin mr-2"></i>}
      {icon && !loading && <i className={`fas fa-${icon} mr-2`}></i>}
      {children}
    </button>
  )
}

export default Button