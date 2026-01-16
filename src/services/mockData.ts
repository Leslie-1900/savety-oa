import { APIResponse, PaginationResponse } from '@/types/api'
import { 
  User, 
  OrganizationNode, 
  SafetyTarget, 
  TrainingCourse, 
  Equipment, 
  Risk, 
  EmergencyPlan, 
  Accident 
} from '@/types/models'

// Mock数据生成器
const generateMockData = {
  // 生成组织架构树
  organizationTree: (): OrganizationNode => ({
    id: 'org_001',
    name: 'XX科技有限公司',
    type: 'company',
    employee_count: 117,
    children: [
      {
        id: 'dept_001',
        name: '管理层',
        type: 'department',
        employee_count: 5,
        children: []
      },
      {
        id: 'dept_002',
        name: '生产部门',
        type: 'department',
        employee_count: 86,
        children: [
          {
            id: 'dept_003',
            name: '生产车间',
            type: 'department',
            employee_count: 45
          }
        ]
      }
    ]
  }),

  // 生成用户列表
  users: (count: number = 10): User[] => 
    Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      employee_id: `EMP${String(i + 1).padStart(3, '0')}`,
      username: `user${i + 1}`,
      name: `员工${i + 1}`,
      email: `user${i + 1}@company.com`,
      phone: `138****${String(i + 1).padStart(4, '0')}`,
      department_id: i % 3 === 0 ? 'dept_001' : i % 3 === 1 ? 'dept_002' : 'dept_003',
      department_name: i % 3 === 0 ? '管理层' : i % 3 === 1 ? '生产部门' : '生产车间',
      position: i % 3 === 0 ? '经理' : i % 3 === 1 ? '工程师' : '操作工',
      status: 'active',
      avatar: `员${i + 1}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })),

  // 生成安全目标列表
  safetyTargets: (count: number = 10): SafetyTarget[] =>
    Array.from({ length: count }, (_, i) => ({
      id: `target_${String(i + 1).padStart(3, '0')}`,
      name: `安全目标${i + 1}`,
      description: `第${i + 1}个安全目标的详细描述`,
      department: i % 3 === 0 ? '安全管理部门' : i % 3 === 1 ? '生产部门' : '质量部门',
      responsible_person: `负责人${i + 1}`,
      period: '2024.01-2024.12',
      target_value: 95 + i,
      current_progress: Math.min(100, 80 + i * 2),
      status: i % 3 === 0 ? 'draft' : i % 3 === 1 ? 'in_progress' : 'completed',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })),

  // 生成培训课程列表
  trainingCourses: (count: number = 10): TrainingCourse[] =>
    Array.from({ length: count }, (_, i) => ({
      id: `course_${String(i + 1).padStart(3, '0')}`,
      name: `培训课程${i + 1}`,
      type: i % 3 === 0 ? 'new_employee' : i % 3 === 1 ? 'special' : 'annual',
      duration: 2 + i,
      participant_count: 20 + i * 5,
      rating: 4.5 + (i * 0.1) % 0.5,
      progress: Math.min(100, 60 + i * 5),
      status: i % 3 === 0 ? 'active' : i % 3 === 1 ? 'inactive' : 'completed'
    })),

  // 生成设备列表
  equipmentList: (count: number = 10): Equipment[] =>
    Array.from({ length: count }, (_, i) => ({
      id: `equip_${String(i + 1).padStart(3, '0')}`,
      name: `设备${i + 1}`,
      type: i % 3 === 0 ? 'production' : i % 3 === 1 ? 'safety' : 'other',
      model: `MODEL-${2020 + i}`,
      location: i % 3 === 0 ? '生产车间A区' : i % 3 === 1 ? '生产车间B区' : '仓库',
      status: i % 3 === 0 ? 'normal' : i % 3 === 1 ? 'maintenance' : 'fault',
      last_maintenance: new Date(2024, 0, 10 + i).toISOString().split('T')[0],
      next_maintenance: new Date(2024, 1, 10 + i).toISOString().split('T')[0],
      responsible_person: `负责人${i + 1}`
    })),

  // 生成风险隐患列表
  risks: (count: number = 10): Risk[] =>
    Array.from({ length: count }, (_, i) => ({
      id: `risk_${String(i + 1).padStart(3, '0')}`,
      title: `隐患${i + 1}`,
      description: `第${i + 1}个隐患的详细描述`,
      level: i % 3 === 0 ? 'low' : i % 3 === 1 ? 'medium' : 'high',
      location: i % 3 === 0 ? '生产车间' : i % 3 === 1 ? '配电室' : '化学品仓库',
      reporter: `上报人${i + 1}`,
      report_date: new Date(2024, 0, 15 + i).toISOString().split('T')[0],
      deadline: new Date(2024, 0, 25 + i).toISOString().split('T')[0],
      status: i % 3 === 0 ? 'pending' : i % 3 === 1 ? 'in_progress' : 'completed',
      responsible_person: `负责人${i + 1}`
    })),

  // 生成应急预案列表
  emergencyPlans: (count: number = 10): EmergencyPlan[] =>
    Array.from({ length: count }, (_, i) => ({
      id: `plan_${String(i + 1).padStart(3, '0')}`,
      name: `应急预案${i + 1}`,
      type: i % 3 === 0 ? 'fire' : i % 3 === 1 ? 'chemical' : 'natural',
      level: i % 3 === 0 ? '一级' : i % 3 === 1 ? '二级' : '三级',
      status: i % 3 === 0 ? 'active' : i % 3 === 1 ? 'draft' : 'inactive',
      last_update: new Date(2024, 0, 15 + i).toISOString().split('T')[0],
      next_drill: new Date(2024, 1, 20 + i).toISOString().split('T')[0],
      responsible_person: `负责人${i + 1}`
    })),

  // 生成事故列表
  accidents: (count: number = 10): Accident[] =>
    Array.from({ length: count }, (_, i) => ({
      id: `accident_${String(i + 1).padStart(3, '0')}`,
      title: `事故${i + 1}`,
      type: i % 3 === 0 ? 'mechanical' : i % 3 === 1 ? 'fire' : 'chemical',
      level: i % 3 === 0 ? 'minor' : i % 3 === 1 ? 'moderate' : 'major',
      status: i % 3 === 0 ? 'investigating' : i % 3 === 1 ? 'rectifying' : 'completed',
      date: new Date(2024, 0, 15 + i).toISOString().split('T')[0],
      location: i % 3 === 0 ? '生产车间A区' : i % 3 === 1 ? '生产车间B区' : '仓库',
      responsible_person: `负责人${i + 1}`,
      injured: i % 3,
      economic_loss: i * 10000,
      description: `第${i + 1}个事故的详细描述`
    }))
}

// Mock API服务
export const mockApi = {
  // 模拟延迟响应
  delay: (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms)),

  // 组织架构API
  organization: {
    getTree: async (): Promise<APIResponse<OrganizationNode>> => {
      await mockApi.delay(300)
      return {
        code: 200,
        message: 'success',
        data: generateMockData.organizationTree(),
        timestamp: new Date().toISOString()
      }
    },

    getEmployees: async (params: any): Promise<APIResponse<PaginationResponse<User>>> => {
      await mockApi.delay(400)
      const page = params?.page || 1
      const pageSize = params?.page_size || 10
      const total = 117
      const startIndex = (page - 1) * pageSize
      const endIndex = Math.min(startIndex + pageSize, total)
      
      return {
        code: 200,
        message: 'success',
        data: {
          total,
          page,
          page_size: pageSize,
          list: generateMockData.users(endIndex - startIndex)
        },
        timestamp: new Date().toISOString()
      }
    }
  },

  // 安全目标API
  targets: {
    getTargets: async (params: any): Promise<APIResponse<PaginationResponse<SafetyTarget>>> => {
      await mockApi.delay(350)
      const page = params?.page || 1
      const pageSize = params?.page_size || 10
      const total = 15
      
      return {
        code: 200,
        message: 'success',
        data: {
          total,
          page,
          page_size: pageSize,
          list: generateMockData.safetyTargets(Math.min(pageSize, total))
        },
        timestamp: new Date().toISOString()
      }
    }
  },

  // 教育培训API
  training: {
    getCourses: async (params: any): Promise<APIResponse<PaginationResponse<TrainingCourse>>> => {
      await mockApi.delay(320)
      const page = params?.page || 1
      const pageSize = params?.page_size || 10
      const total = 28
      
      return {
        code: 200,
        message: 'success',
        data: {
          total,
          page,
          page_size: pageSize,
          list: generateMockData.trainingCourses(Math.min(pageSize, total))
        },
        timestamp: new Date().toISOString()
      }
    }
  },

  // 设备管理API
  equipment: {
    getEquipment: async (params: any): Promise<APIResponse<PaginationResponse<Equipment>>> => {
      await mockApi.delay(380)
      const page = params?.page || 1
      const pageSize = params?.page_size || 10
      const total = 156
      
      return {
        code: 200,
        message: 'success',
        data: {
          total,
          page,
          page_size: pageSize,
          list: generateMockData.equipmentList(Math.min(pageSize, total))
        },
        timestamp: new Date().toISOString()
      }
    }
  },

  // 风险管理API
  risks: {
    getRisks: async (params: any): Promise<APIResponse<PaginationResponse<Risk>>> => {
      await mockApi.delay(360)
      const page = params?.page || 1
      const pageSize = params?.page_size || 10
      const total = 45
      
      return {
        code: 200,
        message: 'success',
        data: {
          total,
          page,
          page_size: pageSize,
          list: generateMockData.risks(Math.min(pageSize, total))
        },
        timestamp: new Date().toISOString()
      }
    }
  },

  // 应急管理API
  emergency: {
    getPlans: async (params: any): Promise<APIResponse<PaginationResponse<EmergencyPlan>>> => {
      await mockApi.delay(340)
      const page = params?.page || 1
      const pageSize = params?.page_size || 10
      const total = 12
      
      return {
        code: 200,
        message: 'success',
        data: {
          total,
          page,
          page_size: pageSize,
          list: generateMockData.emergencyPlans(Math.min(pageSize, total))
        },
        timestamp: new Date().toISOString()
      }
    }
  },

  // 事故管理API
  accidents: {
    getAccidents: async (params: any): Promise<APIResponse<PaginationResponse<Accident>>> => {
      await mockApi.delay(370)
      const page = params?.page || 1
      const pageSize = params?.page_size || 10
      const total = 8
      
      return {
        code: 200,
        message: 'success',
        data: {
          total,
          page,
          page_size: pageSize,
          list: generateMockData.accidents(Math.min(pageSize, total))
        },
        timestamp: new Date().toISOString()
      }
    }
  },

  // 认证API
  auth: {
    login: async (credentials: any): Promise<APIResponse<{ token: string; user: any }>> => {
      await mockApi.delay(500)
      if (credentials.username === 'admin' && credentials.password === 'password123') {
        return {
          code: 200,
          message: '登录成功',
          data: {
            token: 'mock_jwt_token_123456',
            user: {
              id: 1,
              username: 'admin',
              name: '管理员',
              role: 'admin',
              department: '安全管理部门'
            }
          },
          timestamp: new Date().toISOString()
        }
      } else {
        throw new Error('用户名或密码错误')
      }
    }
  }
}

export default mockApi