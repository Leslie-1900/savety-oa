import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation()
  
  const menuItems = [
    { path: '/dashboard', icon: 'home', label: '工作台' },
    { path: '/organization', icon: 'sitemap', label: '组织架构管理' },
    { path: '/targets', icon: 'bullseye', label: '安全目标管理' },
    { path: '/training', icon: 'graduation-cap', label: '教育培训管理' },
    { path: '/equipment', icon: 'tools', label: '现场设备管理' },
    { path: '/risks', icon: 'exclamation-triangle', label: '风险隐患管理' },
    { path: '/emergency', icon: 'first-aid', label: '应急管理' },
    { path: '/accidents', icon: 'car-crash', label: '事故管理' }
  ]

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <i className="fas fa-shield-alt"></i>
          <span>安全生产管理系统</span>
        </div>
      </div>
      
      <div className="nav-menu">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item flex items-center gap-3 ${isActive(item.path) ? 'active' : ''}`}
          >
            <i className={`fas fa-${item.icon} w-4 text-center`}></i>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Sidebar