import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import ErrorBoundary from './components/common/ErrorBoundary'
import LoadingSpinner from './components/common/LoadingSpinner'
import './App.css'

// 使用懒加载优化性能
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Organization = lazy(() => import('./pages/Organization'))
const Targets = lazy(() => import('./pages/Targets'))
const Training = lazy(() => import('./pages/Training'))
const Equipment = lazy(() => import('./pages/Equipment'))
const Risks = lazy(() => import('./pages/Risks'))
const Emergency = lazy(() => import('./pages/Emergency'))
const Accidents = lazy(() => import('./pages/Accidents'))

// 加载中组件
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner size="large" />
  </div>
)

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AppLayout>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/organization" element={<Organization />} />
              <Route path="/targets" element={<Targets />} />
              <Route path="/training" element={<Training />} />
              <Route path="/equipment" element={<Equipment />} />
              <Route path="/risks" element={<Risks />} />
              <Route path="/emergency" element={<Emergency />} />
              <Route path="/accidents" element={<Accidents />} />
              
              {/* 404页面 */}
              <Route path="*" element={
                <div className="flex items-center justify-center min-h-64">
                  <div className="text-center">
                    <i className="fas fa-map-signs text-6xl text-gray-300 mb-4"></i>
                    <h2 className="text-2xl font-bold text-gray-600 mb-2">页面未找到</h2>
                    <p className="text-gray-500">您访问的页面不存在</p>
                  </div>
                </div>
              } />
            </Routes>
          </Suspense>
        </AppLayout>
      </Router>
    </ErrorBoundary>
  )
}

export default App