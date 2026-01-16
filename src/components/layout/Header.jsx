import React from 'react'
import { useLocation } from 'react-router-dom'

const Header = () => {
  const location = useLocation()
  
  const pageTitles = {
    '/': '工作台',
    '/dashboard': '工作台',
    '/organization': '组织架构管理',
    '/targets': '安全目标管理',
    '/training': '教育培训管理',
    '/equipment': '现场设备管理',
    '/risks': '风险隐患管理',
    '/emergency': '应急管理',
    '/accidents': '事故管理'
  }

  const getPageTitle = () => {
    return pageTitles[location.pathname] || '安全生产管理系统'
  }

  return (
    <div className="header">
      <div className="header-left">
        <h1 className="text-xl font-semibold text-gray-800">{getPageTitle()}</h1>
      </div>
      
      <div className="header-right flex items-center gap-4">
        <div className="notification relative cursor-pointer">
          <i className="fas fa-bell text-gray-600"></i>
          <div className="notification-badge absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</div>
        </div>
        
        <div className="user-info flex items-center gap-2 cursor-pointer">
          <div className="user-avatar w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">管</div>
          <span className="text-gray-700">管理员</span>
          <i className="fas fa-chevron-down text-gray-500 text-xs"></i>
        </div>
      </div>
    </div>
  )
}

export default Header