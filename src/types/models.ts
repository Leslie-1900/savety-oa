// 用户模型（对应users表）
export interface User {
  id: number                    // 主键ID，对应后端：INT AUTO_INCREMENT
  employee_id: string           // 工号，VARCHAR(20) UNIQUE
  username: string              // 用户名，VARCHAR(50)
  name: string                  // 真实姓名，VARCHAR(50)
  email?: string                // 邮箱，VARCHAR(100) NULLABLE
  phone: string                 // 手机号，VARCHAR(20)
  department_id: string         // 部门ID，VARCHAR(50)
  department_name: string       // 部门名称，VARCHAR(100)
  position: string              // 岗位，VARCHAR(50)
  status: 'active' | 'inactive' // 状态，对应后端：TINYINT(1)
  avatar?: string               // 头像文字，VARCHAR(10) NULLABLE
  created_at: string            // 创建时间，DATETIME → ISO string
  updated_at?: string           // 更新时间，DATETIME → ISO string
}

// 组织节点模型
export interface OrganizationNode {
  id: string                    // 节点ID，VARCHAR(50)
  name: string                  // 节点名称，VARCHAR(100)
  type: 'company' | 'department' // 节点类型，ENUM
  employee_count: number        // 人员数量，INT
  children?: OrganizationNode[] // 子节点，递归结构
}

// 安全目标模型
export interface SafetyTarget {
  id: string                    // 目标ID，VARCHAR(50)
  name: string                  // 目标名称，VARCHAR(200)
  description: string           // 目标描述，TEXT
  department: string            // 责任部门，VARCHAR(100)
  responsible_person: string    // 责任人，VARCHAR(50)
  period: string                // 目标周期，VARCHAR(20)
  target_value: number          // 目标值，DECIMAL(10,2)
  current_progress: number      // 当前进度，DECIMAL(5,2)
  status: 'draft' | 'in_progress' | 'completed' // 状态，ENUM
  created_at: string            // 创建时间
  updated_at?: string           // 更新时间
}

// 培训课程模型
export interface TrainingCourse {
  id: string                    // 课程ID，VARCHAR(50)
  name: string                  // 课程名称，VARCHAR(200)
  type: 'new_employee' | 'special' | 'annual' // 培训类型，ENUM
  duration: number              // 培训时长（小时），INT
  participant_count: number     // 参与人数，INT
  rating: number                // 评分，DECIMAL(3,1)
  progress: number              // 进度，DECIMAL(5,2)
  status: 'active' | 'inactive' | 'completed' // 状态，ENUM
}

// 设备模型
export interface Equipment {
  id: string                    // 设备ID，VARCHAR(50)
  name: string                  // 设备名称，VARCHAR(100)
  type: 'production' | 'safety' | 'other' // 设备类型，ENUM
  model: string                 // 设备型号，VARCHAR(50)
  location: string              // 设备位置，VARCHAR(100)
  status: 'normal' | 'maintenance' | 'fault' // 设备状态，ENUM
  last_maintenance: string      // 最后维护时间
  next_maintenance: string      // 下次维护时间
  responsible_person: string    // 负责人，VARCHAR(50)
}

// 风险隐患模型
export interface Risk {
  id: string                    // 隐患ID，VARCHAR(50)
  title: string                 // 隐患标题，VARCHAR(200)
  description: string           // 隐患描述，TEXT
  level: 'low' | 'medium' | 'high' // 风险级别，ENUM
  location: string              // 隐患位置，VARCHAR(100)
  reporter: string              // 上报人，VARCHAR(50)
  report_date: string           // 上报时间
  deadline: string              // 整改期限
  status: 'pending' | 'in_progress' | 'completed' // 整改状态，ENUM
  responsible_person: string    // 责任人，VARCHAR(50)
}

// 应急预案模型
export interface EmergencyPlan {
  id: string                    // 预案ID，VARCHAR(50)
  name: string                  // 预案名称，VARCHAR(200)
  type: 'fire' | 'chemical' | 'natural' // 预案类型，ENUM
  level: string                 // 预案级别，VARCHAR(20)
  status: 'active' | 'draft' | 'inactive' // 预案状态，ENUM
  last_update: string           // 最后更新时间
  next_drill: string            // 下次演练时间
  responsible_person: string    // 负责人，VARCHAR(50)
}

// 事故模型
export interface Accident {
  id: string                    // 事故ID，VARCHAR(50)
  title: string                 // 事故标题，VARCHAR(200)
  type: 'mechanical' | 'fire' | 'chemical' | 'other' // 事故类型，ENUM
  level: 'minor' | 'moderate' | 'major' // 事故级别，ENUM
  status: 'investigating' | 'rectifying' | 'completed' | 'preventing' // 处理状态，ENUM
  date: string                  // 发生时间
  location: string              // 发生地点，VARCHAR(100)
  responsible_person: string    // 负责人，VARCHAR(50)
  injured: number               // 受伤人数，INT
  economic_loss: number         // 经济损失，DECIMAL(12,2)
  description?: string          // 事故描述，TEXT NULLABLE
}

// 登录响应模型
export interface LoginResponse {
  token: string                 // JWT令牌
  user: {
    id: number
    username: string
    name: string
    role: 'admin' | 'user'
    department: string
  }
}

// 用户权限模型
export interface UserPermission {
  permissions: string[]         // 权限列表
}