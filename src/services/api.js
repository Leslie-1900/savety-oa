import axios from 'axios'
import { useAppStore } from '../store/useAppStore'

// 创建axios实例
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 添加认证token
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // 设置加载状态
    useAppStore.getState().setLoading(true)
    
    return config
  },
  (error) => {
    useAppStore.getState().setLoading(false)
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    useAppStore.getState().setLoading(false)
    
    // 统一处理成功响应
    if (response.data && response.data.code === 200) {
      return response.data
    }
    
    // 处理业务错误
    if (response.data && response.data.code !== 200) {
      const error = new Error(response.data.message || '请求失败')
      error.code = response.data.code
      throw error
    }
    
    return response.data
  },
  (error) => {
    useAppStore.getState().setLoading(false)
    
    // 统一错误处理
    let errorMessage = '网络错误，请检查网络连接'
    
    if (error.response) {
      // 服务器返回错误状态码
      switch (error.response.status) {
        case 401:
          errorMessage = '未授权，请重新登录'
          // 清除token并跳转到登录页
          localStorage.removeItem('auth_token')
          window.location.href = '/login'
          break
        case 403:
          errorMessage = '权限不足，无法访问此资源'
          break
        case 404:
          errorMessage = '请求的资源不存在'
          break
        case 500:
          errorMessage = '服务器内部错误'
          break
        default:
          errorMessage = error.response.data?.message || `请求失败 (${error.response.status})`
      }
    } else if (error.request) {
      // 请求已发出但没有收到响应
      errorMessage = '网络连接异常，请检查网络设置'
    } else {
      // 请求配置错误
      errorMessage = error.message
    }
    
    // 设置全局错误状态
    useAppStore.getState().setError({
      message: errorMessage,
      code: error.response?.status,
      timestamp: new Date().toISOString()
    })
    
    // 开发环境打印错误详情
    if (import.meta.env.DEV) {
      console.error('API Error:', error)
    }
    
    return Promise.reject(new Error(errorMessage))
  }
)

// API服务类
export class ApiService {
  // 组织架构相关API
  static organization = {
    // 获取组织架构树
    getTree: () => api.get('/organization/tree'),
    
    // 获取人员列表
    getEmployees: (params) => api.get('/organization/employees', { params }),
    
    // 新增人员
    createEmployee: (data) => api.post('/organization/employees', data),
    
    // 更新人员信息
    updateEmployee: (id, data) => api.put(`/organization/employees/${id}`, data),
    
    // 删除人员
    deleteEmployee: (id) => api.delete(`/organization/employees/${id}`)
  }
  
  // 安全目标相关API
  static targets = {
    // 获取目标列表
    getList: (params) => api.get('/targets/list', { params }),
    
    // 获取目标详情
    getDetail: (id) => api.get(`/targets/${id}/details`),
    
    // 创建目标
    create: (data) => api.post('/targets', data),
    
    // 更新目标进度
    updateProgress: (id, progress) => api.patch(`/targets/${id}/progress`, { progress })
  }
  
  // 教育培训相关API
  static training = {
    // 获取课程列表
    getCourses: (params) => api.get('/training/courses', { params }),
    
    // 获取考试列表
    getExams: (params) => api.get('/training/exams', { params }),
    
    // 创建课程
    createCourse: (data) => api.post('/training/courses', data)
  }
  
  // 设备管理相关API
  static equipment = {
    // 获取设备列表
    getList: (params) => api.get('/equipment/list', { params }),
    
    // 获取巡检计划
    getInspections: () => api.get('/equipment/inspections'),
    
    // 创建设备
    create: (data) => api.post('/equipment', data)
  }
  
  // 风险隐患相关API
  static risks = {
    // 获取隐患列表
    getHazards: (params) => api.get('/risks/hazards', { params }),
    
    // 获取风险评估
    getAssessments: () => api.get('/risks/assessments'),
    
    // 上报隐患
    reportHazard: (data) => api.post('/risks/hazards', data)
  }
  
  // 应急管理相关API
  static emergency = {
    // 获取应急预案
    getPlans: (params) => api.get('/emergency/plans', { params }),
    
    // 获取演练计划
    getDrills: () => api.get('/emergency/drills'),
    
    // 创建应急预案
    createPlan: (data) => api.post('/emergency/plans', data)
  }
  
  // 事故管理相关API
  static accidents = {
    // 获取事故列表
    getList: (params) => api.get('/accidents/list', { params }),
    
    // 获取事故详情
    getDetail: (id) => api.get(`/accidents/${id}/details`),
    
    // 上报事故
    report: (data) => api.post('/accidents', data)
  }
  
  // 仪表盘相关API
  static dashboard = {
    // 获取统计数据
    getStats: () => api.get('/dashboard/stats'),
    
    // 获取待办事项
    getTodos: () => api.get('/dashboard/todos'),
    
    // 获取最新动态
    getActivities: () => api.get('/dashboard/activities')
  }
}

export default api