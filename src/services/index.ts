import { useMock } from './config'
import realApi from './api'
import mockApi from './mockData'

// 根据环境配置选择使用真实API还是Mock API
const apiService = useMock ? mockApi : realApi

// 导出所有API服务
export const {
  organization,
  targets,
  training,
  equipment,
  risks,
  emergency,
  accidents,
  auth
} = apiService

// 导出默认API服务
export default apiService

// 工具函数：处理API错误
export const handleApiError = (error: any): string => {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  return '网络请求失败，请检查网络连接或联系管理员'
}

// 工具函数：验证响应格式
export const validateResponse = <T>(response: any): response is T => {
  return (
    response &&
    typeof response === 'object' &&
    'code' in response &&
    'message' in response &&
    'data' in response
  )
}

// 工具函数：创建API钩子（用于React组件）
export const createApiHook = <T>(apiCall: () => Promise<T>) => {
  return () => {
    // 这里可以集成React的状态管理
    // 例如使用useState和useEffect来管理加载状态和错误处理
    return {
      data: null as T | null,
      loading: false,
      error: null as string | null,
      execute: async () => {
        try {
          // 设置加载状态
          const data = await apiCall()
          return { data, error: null }
        } catch (error) {
          const errorMessage = handleApiError(error)
          return { data: null, error: errorMessage }
        }
      }
    }
  }
}