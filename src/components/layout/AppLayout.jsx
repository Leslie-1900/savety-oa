import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

const AppLayout = ({ children }) => {
  return (
    <div className="app-container" style={{ display: 'flex' }}>
      <Sidebar />
      <div className="main-content" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main className="content-area" style={{ flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  )
}

export default AppLayout