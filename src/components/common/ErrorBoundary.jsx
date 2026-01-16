import React from 'react'
import Button from './Button'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    
    // 在实际项目中，这里可以上报错误到监控系统
    console.error('Error caught by boundary:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ 
      hasError: false, 
      error: null,
      errorInfo: null 
    })
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-red-500 text-6xl mb-4">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              应用出现错误
            </h2>
            
            <p className="text-gray-600 mb-6">
              抱歉，应用遇到了一个意外错误。请尝试重新加载页面或联系技术支持。
            </p>

            {this.props.fallback ? (
              this.props.fallback
            ) : (
              <div className="space-y-3">
                <Button 
                  variant="primary" 
                  onClick={this.handleReset}
                  className="w-full"
                >
                  <i className="fas fa-redo mr-2"></i>
                  重试
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={this.handleReload}
                  className="w-full"
                >
                  <i className="fas fa-refresh mr-2"></i>
                  重新加载页面
                </Button>
              </div>
            )}

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500">
                  错误详情（开发环境）
                </summary>
                <pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-auto">
                  {this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary