// 服务配置
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE || '/api',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
}

// Mock开关配置
export const useMock = import.meta.env.VITE_ENABLE_MOCK === 'true'

// 应用信息
export const APP_INFO = {
  name: import.meta.env.VITE_APP_NAME || '安全生产管理系统',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0'
}