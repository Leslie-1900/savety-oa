import { APIResponse, PaginationParams, PaginationResponse } from '@/types/api'
import { 
  User, 
  OrganizationNode, 
  SafetyTarget, 
  TrainingCourse, 
  Equipment, 
  Risk, 
  EmergencyPlan, 
  Accident, 
  LoginResponse, 
  UserPermission 
} from '@/types/models'
import { API_CONFIG } from './config'

// 基础HTTP客户端（使用axios或fetch）
class HttpClient {
  private baseURL: string
  private timeout: number

  constructor(config: { baseURL: string; timeout: number }) {
    this.baseURL = config.baseURL
    this.timeout = config.timeout
  }

  private async request<T>(url: string, options: RequestInit = {}): Promise<APIResponse<T>> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      const response = await fetch(`${this.baseURL}${url}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      clearTimeout(timeoutId)
      throw error
    }
  }

  async get<T>(url: string, params?: Record<string, any>): Promise<APIResponse<T>> {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : ''
    return this.request<T>(`${url}${queryString}`)
  }

  async post<T>(url: string, data?: any): Promise<APIResponse<T>> {
    return this.request<T>(url, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(url: string, data?: any): Promise<APIResponse<T>> {
    return this.request<T>(url, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(url: string): Promise<APIResponse<T>> {
    return this.request<T>(url, {
      method: 'DELETE',
    })
  }
}

// 创建HTTP客户端实例
const httpClient = new HttpClient(API_CONFIG)

// 组织架构管理API
export const organizationApi = {
  // 获取组织架构树
  getTree: (): Promise<APIResponse<OrganizationNode>> =>
    httpClient.get<OrganizationNode>('/organization/tree'),

  // 获取人员列表
  getEmployees: (params: PaginationParams & { department_id?: string; status?: string }): 
    Promise<APIResponse<PaginationResponse<User>>> =>
    httpClient.get<PaginationResponse<User>>('/organization/employees', params),

  // 新增人员
  addEmployee: (data: {
    employee_id: string
    name: string
    department_id: string
    position: string
    phone: string
    email?: string
  }): Promise<APIResponse<{ id: string }>> =>
    httpClient.post<{ id: string }>('/organization/employees', data)
}

// 安全目标管理API
export const targetsApi = {
  // 获取安全目标列表
  getTargets: (params: PaginationParams & { year?: number; status?: string }): 
    Promise<APIResponse<PaginationResponse<SafetyTarget>>> =>
    httpClient.get<PaginationResponse<SafetyTarget>>('/targets/list', params),

  // 获取目标分解详情
  getTargetDetails: (id: string): Promise<APIResponse<{
    id: string
    name: string
    target_value: number
    current_value: number
    resolved_count: number
    pending_count: number
    department_breakdown: Array<{
      department: string
      target_value: number
      current_value: number
      status: string
    }>
    monthly_trend: Array<{
      month: string
      value: number
    }>
  }>> =>
    httpClient.get(`/targets/${id}/details`)
}

// 教育培训管理API
export const trainingApi = {
  // 获取培训课程列表
  getCourses: (params: PaginationParams & { type?: string; status?: string }): 
    Promise<APIResponse<PaginationResponse<TrainingCourse>>> =>
    httpClient.get<PaginationResponse<TrainingCourse>>('/training/courses', params),

  // 获取考试管理列表
  getExams: (params: PaginationParams & { course_id?: string }): 
    Promise<APIResponse<PaginationResponse<{
      id: string
      course_name: string
      exam_name: string
      participant_count: number
      pass_count: number
      pass_rate: number
      exam_date: string
      status: string
    }>>> =>
    httpClient.get('/training/exams', params)
}

// 现场设备管理API
export const equipmentApi = {
  // 获取设备列表
  getEquipment: (params: PaginationParams & { type?: string; status?: string }): 
    Promise<APIResponse<PaginationResponse<Equipment>>> =>
    httpClient.get<PaginationResponse<Equipment>>('/equipment/list', params),

  // 获取设备维护记录
  getMaintenanceRecords: (id: string): Promise<APIResponse<{
    equipment_id: string
    equipment_name: string
    maintenance_records: Array<{
      id: string
      date: string
      type: string
      description: string
      operator: string
      result: string
      next_date: string
    }>
  }>> =>
    httpClient.get(`/equipment/${id}/maintenance`)
}

// 风险隐患管理API
export const risksApi = {
  // 获取隐患列表
  getRisks: (params: PaginationParams & { status?: string; level?: string }): 
    Promise<APIResponse<PaginationResponse<Risk>>> =>
    httpClient.get<PaginationResponse<Risk>>('/risks/list', params),

  // 获取隐患整改详情
  getRiskDetails: (id: string): Promise<APIResponse<{
    id: string
    title: string
    description: string
    level: string
    rectification_steps: Array<{
      step: number
      action: string
      operator: string
      date: string
      result: string
    }>
    current_progress: number
    expected_completion: string
  }>> =>
    httpClient.get(`/risks/${id}/details`)
}

// 应急管理API
export const emergencyApi = {
  // 获取应急预案列表
  getPlans: (params: PaginationParams & { type?: string; status?: string }): 
    Promise<APIResponse<PaginationResponse<EmergencyPlan>>> =>
    httpClient.get<PaginationResponse<EmergencyPlan>>('/emergency/plans', params),

  // 获取应急演练计划
  getDrills: (): Promise<APIResponse<Array<{
    id: string
    plan_name: string
    scheduled_date: string
    location: string
    participant_count: number
    status: string
  }>>> =>
    httpClient.get('/emergency/drills')
}

// 事故管理API
export const accidentsApi = {
  // 获取事故记录列表
  getAccidents: (params: PaginationParams & { type?: string; level?: string }): 
    Promise<APIResponse<PaginationResponse<Accident>>> =>
    httpClient.get<PaginationResponse<Accident>>('/accidents/list', params),

  // 获取事故分析报告
  getAccidentAnalysis: (id: string): Promise<APIResponse<{
    id: string
    title: string
    description: string
    cause_analysis: string
    corrective_actions: string[]
    prevention_measures: string
  }>> =>
    httpClient.get(`/accidents/${id}/analysis`)
}

// 系统管理API
export const authApi = {
  // 用户登录
  login: (credentials: { username: string; password: string }): Promise<APIResponse<LoginResponse>> =>
    httpClient.post<LoginResponse>('/auth/login', credentials),

  // 获取用户信息
  getUser: (): Promise<APIResponse<User & UserPermission>> =>
    httpClient.get<User & UserPermission>('/auth/user'),

  // 退出登录
  logout: (): Promise<APIResponse<void>> =>
    httpClient.post<void>('/auth/logout')
}

// 导出所有API
export default {
  organization: organizationApi,
  targets: targetsApi,
  training: trainingApi,
  equipment: equipmentApi,
  risks: risksApi,
  emergency: emergencyApi,
  accidents: accidentsApi,
  auth: authApi
}