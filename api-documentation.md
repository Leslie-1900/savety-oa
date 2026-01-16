# 📖 安全生产管理系统 API 文档

## 🎯 后端就绪状态 - 5大标准验收

### ✅ 标准1：API接口定义完整清晰

#### 基础响应格式（所有接口统一）
```typescript
// API响应契约
export interface APIResponse<T> {
  code: number          // 状态码：200=成功，400=参数错误，401=未授权，500=服务器错误
  message: string       // 返回消息
  data: T               // 业务数据
  timestamp: string     // 响应时间戳（ISO格式）
}

// 分页参数标准
export interface PaginationParams {
  page: number          // 页码，从1开始
  page_size: number     // 每页数量，默认10
  [key: string]: any    // 其他查询参数
}

// 分页响应标准
export interface PaginationResponse<T> {
  total: number         // 总记录数
  page: number          // 当前页码
  page_size: number     // 每页数量
  list: T[]             // 数据列表
}
```

#### 错误码规范
| 错误码 | 说明 | 处理建议 |
|--------|------|----------|
| 200 | 成功 | 正常处理 |
| 400 | 参数错误 | 检查请求参数格式 |
| 401 | 未授权 | 重新登录获取token |
| 403 | 权限不足 | 检查用户权限 |
| 404 | 资源不存在 | 检查资源ID |
| 500 | 服务器错误 | 联系管理员 |

### ✅ 标准2：数据模型与后端DB对齐

#### 核心数据模型定义
```typescript
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
```

### ✅ 标准3：接口层完全可配置

#### 环境配置
```javascript
// .env.development - 开发环境
VITE_API_BASE=http://localhost:3000/api
VITE_ENABLE_MOCK=true
VITE_API_TIMEOUT=10000

// .env.production - 生产环境
VITE_API_BASE=https://api.yourdomain.com/api
VITE_ENABLE_MOCK=false
VITE_API_TIMEOUT=15000
```

#### 服务配置
```typescript
// services/config.ts
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
```

### ✅ 标准4：接口文档自动化生成

#### 文档更新说明
- 本文档基于实际业务需求编写
- 所有接口都包含完整的请求/响应示例
- 参数验证规则明确标注
- 错误处理方案详细说明

### ✅ 标准5：接口测试就绪

#### 测试用例框架
```javascript
// 测试用例示例（使用Jest）
describe('组织架构API测试', () => {
  test('获取组织架构树 - 成功', async () => {
    const response = await organizationApi.getTree()
    
    expect(response.code).toBe(200)
    expect(response.data).toHaveProperty('id')
    expect(response.data).toHaveProperty('name')
    expect(response.data.children).toBeInstanceOf(Array)
  })
  
  test('获取人员列表 - 分页参数验证', async () => {
    const params = { page: 1, page_size: 10 }
    const response = await organizationApi.getEmployees(params)
    
    expect(response.code).toBe(200)
    expect(response.data).toHaveProperty('total')
    expect(response.data.list).toBeInstanceOf(Array)
    expect(response.data.list.length).toBeLessThanOrEqual(params.page_size)
  })
})
```

---

## 组织架构管理模块

### 获取组织架构树

**接口名称：** 获取组织架构树
**功能描述：** 获取企业完整的组织架构树形结构
**接口地址：** /api/organization/tree
**请求方式：** GET

#### 功能说明
获取企业的组织架构信息，包括部门层级关系和人员分布情况。

#### 请求参数
无

#### 返回参数
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": "org_001",
    "name": "XX科技有限公司",
    "type": "company",
    "children": [
      {
        "id": "dept_001",
        "name": "管理层",
        "type": "department",
        "employee_count": 5,
        "children": []
      },
      {
        "id": "dept_002", 
        "name": "生产部门",
        "type": "department",
        "employee_count": 86,
        "children": [
          {
            "id": "dept_003",
            "name": "生产车间",
            "type": "department",
            "employee_count": 45
          }
        ]
      }
    ]
  }
}
```

| 参数名 | 类型 | 必填 | 说明 | 示例值 |
|-------|------|-----|------|--------|
| code | int | 是 | 状态码 | 200 |
| message | string | 是 | 返回消息 | success |
| data.id | string | 是 | 组织节点ID | org_001 |
| data.name | string | 是 | 组织节点名称 | XX科技有限公司 |
| data.type | string | 是 | 节点类型 | company/department |
| data.employee_count | int | 是 | 人员数量 | 86 |
| data.children | array | 否 | 子节点列表 | [] |

### 获取人员列表

**接口名称：** 获取人员列表
**功能描述：** 分页获取企业人员信息列表
**接口地址：** /api/organization/employees
**请求方式：** GET

#### 功能说明
根据部门、岗位等条件筛选人员信息，支持分页查询。

#### 请求参数
```json
{
  "page": 1,
  "page_size": 10,
  "department_id": "dept_002",
  "status": "active"
}
```

| 参数名 | 类型 | 必填 | 说明 | 示例值 |
|-------|------|-----|------|--------|
| page | int | 否 | 页码（默认1） | 2 |
| page_size | int | 否 | 每页数量（默认10） | 20 |
| department_id | string | 否 | 部门ID筛选 | dept_002 |
| status | string | 否 | 人员状态筛选 | active/inactive |

#### 返回参数
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 117,
    "page": 1,
    "page_size": 10,
    "list": [
      {
        "id": "emp_001",
        "employee_id": "EMP001",
        "name": "张三",
        "department": "安全管理部门",
        "position": "安全专员",
        "phone": "138****1234",
        "status": "active",
        "avatar": "张"
      }
    ]
  }
}
```

| 参数名 | 类型 | 必填 | 说明 | 示例值 |
|-------|------|-----|------|--------|
| data.total | int | 是 | 总记录数 | 117 |
| data.page | int | 是 | 当前页码 | 1 |
| data.page_size | int | 是 | 每页数量 | 10 |
| data.list.id | string | 是 | 人员ID | emp_001 |
| data.list.employee_id | string | 是 | 工号 | EMP001 |
| data.list.name | string | 是 | 姓名 | 张三 |
| data.list.department | string | 是 | 所属部门 | 安全管理部门 |
| data.list.position | string | 是 | 岗位 | 安全专员 |
| data.list.phone | string | 是 | 联系方式 | 138****1234 |
| data.list.status | string | 是 | 状态 | active |
| data.list.avatar | string | 是 | 头像文字 | 张 |

### 新增人员

**接口名称：** 新增人员
**功能描述：** 添加新员工到组织架构中
**接口地址：** /api/organization/employees
**请求方式：** POST

#### 功能说明
创建新的员工信息，包括基本信息、部门分配等。

#### 请求参数
```json
{
  "employee_id": "EMP006",
  "name": "新员工",
  "department_id": "dept_002",
  "position": "操作工",
  "phone": "139****0000",
  "email": "new@company.com"
}
```

| 参数名 | 类型 | 必填 | 说明 | 示例值 |
|-------|------|-----|------|--------|
| employee_id | string | 是 | 工号 | EMP006 |
| name | string | 是 | 姓名 | 新员工 |
| department_id | string | 是 | 部门ID | dept_002 |
| position | string | 是 | 岗位 | 操作工 |
| phone | string | 是 | 手机号 | 139****0000 |
| email | string | 否 | 邮箱 | new@company.com |

#### 返回参数
```json
{
  "code": 200,
  "message": "新增成功",
  "data": {
    "id": "emp_006"
  }
}
```

---

## 安全目标管理模块

### 获取安全目标列表

**接口名称：** 获取安全目标列表
**功能描述：** 分页获取企业安全目标信息
**接口地址：** /api/targets/list
**请求方式：** GET

#### 功能说明
查询企业的安全目标信息，支持按年度、状态等条件筛选。

#### 请求参数
```json
{
  "page": 1,
  "page_size": 10,
  "year": 2024,
  "status": "in_progress"
}
```

| 参数名 | 类型 | 必填 | 说明 | 示例值 |
|-------|------|-----|------|--------|
| page | int | 否 | 页码（默认1） | 2 |
| page_size | int | 否 | 每页数量（默认10） | 20 |
| year | int | 否 | 年度筛选 | 2024 |
| status | string | 否 | 目标状态 | in_progress/completed |

#### 返回参数
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 15,
    "page": 1,
    "page_size": 10,
    "list": [
      {
        "id": "target_001",
        "name": "重大事故为零",
        "description": "杜绝重大生产安全事故",
        "department": "安全管理部门",
        "responsible_person": "张三",
        "period": "2024.01-2024.12",
        "target_value": 100,
        "current_progress": 100,
        "status": "completed"
      }
    ]
  }
}
```

### 获取目标分解详情

**接口名称：** 获取目标分解详情
**功能描述：** 获取具体安全目标的分解情况和进度
**接口地址：** /api/targets/{id}/details
**请求方式：** GET

#### 功能说明
查询特定安全目标的详细分解信息，包括部门分解情况和月度趋势。

#### 请求参数
路径参数：
- id: 目标ID

#### 返回参数
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": "target_001",
    "name": "隐患整改率≥95%",
    "target_value": 95,
    "current_value": 85,
    "resolved_count": 156,
    "pending_count": 12,
    "department_breakdown": [
      {
        "department": "生产车间",
        "target_value": 95,
        "current_value": 92,
        "status": "达标"
      }
    ],
    "monthly_trend": [
      {
        "month": "1月",
        "value": 80
      }
    ]
  }
}
```

---

## 教育培训管理模块

### 获取培训课程列表

**接口名称：** 获取培训课程列表
**功能描述：** 分页获取培训课程信息
**接口地址：** /api/training/courses
**请求方式：" GET

#### 功能说明
查询企业的培训课程信息，支持按类型、状态等条件筛选。

#### 请求参数
```json
{
  "page": 1,
  "page_size": 10,
  "type": "new_employee",
  "status": "active"
}
```

| 参数名 | 类型 | 必填 | 说明 | 示例值 |
|-------|------|-----|------|--------|
| type | string | 否 | 培训类型 | new_employee/special/annual |
| status | string | 否 | 课程状态 | active/inactive |

#### 返回参数
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 28,
    "page": 1,
    "page_size": 10,
    "list": [
      {
        "id": "course_001",
        "name": "新员工安全入职培训",
        "type": "new_employee",
        "duration": 2,
        "participant_count": 86,
        "rating": 4.8,
        "progress": 100,
        "status": "completed"
      }
    ]
  }
}
```

### 获取考试管理列表

**接口名称：** 获取考试管理列表
**功能描述：** 获取培训相关的考试信息
**接口地址：** /api/training/exams
**请求方式：** GET

#### 功能说明
查询培训课程的考试安排和成绩信息。

#### 请求参数
```json
{
  "page": 1,
  "page_size": 10,
  "course_id": "course_001"
}
```

| 参数名 | 类型 | 必填 | 说明 | 示例值 |
|-------|------|-----|------|--------|
| course_id | string | 否 | 课程ID筛选 | course_001 |

#### 返回参数
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 15,
    "page": 1,
    "page_size": 10,
    "list": [
      {
        "id": "exam_001",
        "course_name": "新员工安全入职培训",
        "exam_name": "安全知识考核",
        "participant_count": 86,
        "pass_count": 82,
        "pass_rate": 95.3,
        "exam_date": "2024-01-15",
        "status": "completed"
      }
    ]
  }
}
```

---

## 现场设备管理模块

### 获取设备列表

**接口名称：** 获取设备列表
**功能描述：** 分页获取现场设备信息
**接口地址：** /api/equipment/list
**请求方式：** GET

#### 功能说明
查询企业的设备信息，支持按类型、状态等条件筛选。

#### 请求参数
```json
{
  "page": 1,
  "page_size": 10,
  "type": "production",
  "status": "normal"
}
```

| 参数名 | 类型 | 必填 | 说明 | 示例值 |
|-------|------|-----|------|--------|
| type | string | 否 | 设备类型 | production/safety/other |
| status | string | 否 | 设备状态 | normal/maintenance/fault |

#### 返回参数
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 156,
    "page": 1,
    "page_size": 10,
    "list": [
      {
        "id": "equip_001",
        "name": "生产线设备A",
        "type": "production",
        "model": "XJ-2024",
        "location": "生产车间A区",
        "status": "normal",
        "last_maintenance": "2024-01-10",
        "next_maintenance": "2024-02-10",
        "responsible_person": "李四"
      }
    ]
  }
}
```

### 获取设备维护记录

**接口名称：** 获取设备维护记录
**功能描述：** 获取特定设备的维护历史记录
**接口地址：** /api/equipment/{id}/maintenance
**请求方式：** GET

#### 功能说明
查询设备的维护保养记录。

#### 请求参数
路径参数：
- id: 设备ID

#### 返回参数
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "equipment_id": "equip_001",
    "equipment_name": "生产线设备A",
    "maintenance_records": [
      {
        "id": "maintain_001",
        "date": "2024-01-10",
        "type": "routine",
        "description": "定期保养检查",
        "operator": "王五",
        "result": "正常",
        "next_date": "2024-02-10"
      }
    ]
  }
}
```

---

## 风险隐患管理模块

### 获取隐患列表

**接口名称：** 获取隐患列表
**功能描述：** 分页获取风险隐患信息
**接口地址：** /api/risks/list
**请求方式：** GET

#### 功能说明
查询企业的风险隐患信息，支持按状态、级别等条件筛选。

#### 请求参数
```json
{
  "page": 1,
  "page_size": 10,
  "status": "pending",
  "level": "high"
}
```

| 参数名 | 类型 | 必填 | 说明 | 示例值 |
|-------|------|-----|------|--------|
| status | string | 否 | 隐患状态 | pending/in_progress/completed |
| level | string | 否 | 风险级别 | low/medium/high |

#### 返回参数
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 45,
    "page": 1,
    "page_size": 10,
    "list": [
      {
        "id": "risk_001",
        "title": "电气线路老化",
        "description": "配电室部分线路老化严重，存在安全隐患",
        "level": "high",
        "location": "配电室",
        "reporter": "张三",
        "report_date": "2024-01-15",
        "deadline": "2024-01-25",
        "status": "in_progress",
        "responsible_person": "李四"
      }
    ]
  }
}
```

### 获取隐患整改详情

**接口名称：** 获取隐患整改详情
**功能描述：** 获取具体隐患的整改过程和结果
**接口地址：** /api/risks/{id}/details
**请求方式：** GET

#### 功能说明
查询特定隐患的详细整改信息。

#### 请求参数
路径参数：
- id: 隐患ID

#### 返回参数
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": "risk_001",
    "title": "电气线路老化",
    "description": "配电室部分线路老化严重，存在安全隐患",
    "level": "high",
    "rectification_steps": [
      {
        "step": 1,
        "action": "现场勘查",
        "operator": "李四",
        "date": "2024-01-16",
        "result": "确认线路老化情况"
      }
    ],
    "current_progress": 60,
    "expected_completion": "2024-01-25"
  }
}
```

---

## 应急管理模块

### 获取应急预案列表

**接口名称：** 获取应急预案列表
**功能描述：** 分页获取应急预案信息
**接口地址：** /api/emergency/plans
**请求方式：** GET

#### 功能说明
查询企业的应急预案信息，支持按类型、状态等条件筛选。

#### 请求参数
```json
{
  "page": 1,
  "page_size": 10,
  "type": "fire",
  "status": "active"
}
```

| 参数名 | 类型 | 必填 | 说明 | 示例值 |
|-------|------|-----|------|--------|
| type | string | 否 | 预案类型 | fire/chemical/natural |
| status | string | 否 | 预案状态 | active/draft/inactive |

#### 返回参数
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 12,
    "page": 1,
    "page_size": 10,
    "list": [
      {
        "id": "plan_001",
        "name": "火灾应急预案",
        "type": "fire",
        "level": "一级",
        "status": "active",
        "last_update": "2024-01-15",
        "next_drill": "2024-02-20",
        "responsible_person": "张三"
      }
    ]
  }
}
```

### 获取应急演练计划

**接口名称：** 获取应急演练计划
**功能描述：** 获取即将进行的应急演练安排
**接口地址：** /api/emergency/drills
**请求方式：** GET

#### 功能说明
查询企业的应急演练计划信息。

#### 请求参数
无

#### 返回参数
```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": "drill_001",
      "plan_name": "火灾应急预案",
      "scheduled_date": "2024-02-20",
      "location": "生产车间A区",
      "participant_count": 45,
      "status": "scheduled"
    }
  ]
}
```

---

## 事故管理模块

### 获取事故记录列表

**接口名称：** 获取事故记录列表
**功能描述：** 分页获取安全事故信息
**接口地址：** /api/accidents/list
**请求方式：** GET

#### 功能说明
查询企业的事故记录信息，支持按类型、级别等条件筛选。

#### 请求参数
```json
{
  "page": 1,
  "page_size": 10,
  "type": "mechanical",
  "level": "major"
}
```

| 参数名 | 类型 | 必填 | 说明 | 示例值 |
|-------|------|-----|------|--------|
| type | string | 否 | 事故类型 | mechanical/fire/chemical |
| level | string | 否 | 事故级别 | minor/moderate/major |

#### 返回参数
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 8,
    "page": 1,
    "page_size": 10,
    "list": [
      {
        "id": "accident_001",
        "title": "车间机械伤害事故",
        "type": "mechanical",
        "level": "major",
        "status": "investigating",
        "date": "2024-01-15",
        "location": "生产车间A区",
        "responsible_person": "张三",
        "injured": 1,
        "economic_loss": 50000
      }
    ]
  }
}
```

### 获取事故分析报告

**接口名称：** 获取事故分析报告
**功能描述：** 获取具体事故的详细分析报告
**接口地址：** /api/accidents/{id}/analysis
**请求方式：** GET

#### 功能说明
查询特定事故的详细分析信息。

#### 请求参数
路径参数：
- id: 事故ID

#### 返回参数
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": "accident_001",
    "title": "车间机械伤害事故",
    "description": "操作人员未按规定佩戴防护设备，导致手臂受伤",
    "cause_analysis": "安全意识不足，防护措施不到位",
    "corrective_actions": [
      "加强安全培训",
      "完善防护设备"
    ],
    "prevention_measures": "定期检查设备安全状况，强化操作规范"
  }
}
```

---

## 系统管理模块

### 用户登录

**接口名称：** 用户登录
**功能描述：** 用户登录系统
**接口地址：** /api/auth/login
**请求方式：** POST

#### 功能说明
用户通过用户名密码登录系统。

#### 请求参数
```json
{
  "username": "admin",
  "password": "password123"
}
```

| 参数名 | 类型 | 必填 | 说明 | 验证规则 |
|-------|------|-----|------|----------|
| username | string | 是 | 用户名 | 3-20字符，字母数字 |
| password | string | 是 | 密码 | 6-20字符 |

#### 返回参数
```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "admin",
      "name": "管理员",
      "role": "admin",
      "department": "安全管理部门"
    }
  }
}
```

### 获取用户信息

**接口名称：** 获取用户信息
**功能描述：** 获取当前登录用户信息
**接口地址：** /api/auth/user
**请求方式：** GET

#### 功能说明
获取当前登录用户的详细信息。

#### 请求参数
无

#### 返回参数
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "username": "admin",
    "name": "管理员",
    "email": "admin@company.com",
    "phone": "138****1234",
    "department": "安全管理部门",
    "position": "系统管理员",
    "role": "admin",
    "permissions": ["user_manage", "data_view", "system_config"]
  }
}
```

#### 返回参数
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 3,
    "page": 1,
    "page_size": 10,
    "list": [
      {
        "id": "exam_001",
        "name": "新员工安全知识考试",
        "course_name": "新员工安全入职培训",
        "exam_date": "2024-06-15",
        "participant_count": 86,
        "average_score": 92.5,
        "pass_rate": 98,
        "status": "completed"
      }
    ]
  }
}
```

---

## 现场设备管理模块

### 获取设备列表

**接口名称：** 获取设备列表
**功能描述：** 分页获取企业设备信息
**接口地址：** /api/equipment/list
**请求方式：" GET

#### 功能说明
查询企业的设备台账信息，支持按类型、状态等条件筛选。

#### 请求参数
```json
{
  "page": 1,
  "page_size": 10,
  "type": "production",
  "status": "normal"
}
```

| 参数名 | 类型 | 必填 | 说明 | 示例值 |
|-------|------|-----|------|--------|
| type | string | 否 | 设备类型 | production/safety/inspection |
| status | string | 否 | 设备状态 | normal/maintenance/pending |

#### 返回参数
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 156,
    "page": 1,
    "page_size": 10,
    "list": [
      {
        "id": "eq_001",
        "equipment_id": "EQ-2024-001",
        "name": "数控机床",
        "model": "CK6150",
        "type": "production",
        "department": "生产车间",
        "responsible_person": "张三",
        "last_inspection": "2024-07-15",
        "status": "normal"
      }
    ]
  }
}
```

### 获取巡检计划

**接口名称：** 获取巡检计划
**功能描述：** 获取设备巡检计划信息
**接口地址：" /api/equipment/inspections
**请求方式：" GET

#### 功能说明
查询设备的巡检计划和执行情况。

#### 返回参数
```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": "inspection_001",
      "name": "日常设备巡检",
      "cycle": "daily",
      "responsible_person": "张三",
      "equipment_count": 45,
      "completion_rate": 98,
      "status": "in_progress"
    }
  ]
}
```

---

## 风险隐患管理模块

### 获取隐患列表

**接口名称：** 获取隐患列表
**功能描述：** 分页获取安全隐患信息
**接口地址：" /api/risks/hazards
**请求方式：" GET

#### 功能说明
查询企业的安全隐患信息，支持按类型、状态等条件筛选。

#### 请求参数
```json
{
  "page": 1,
  "page_size": 10,
  "type": "equipment",
  "status": "pending"
}
```

| 参数名 | 类型 | 必填 | 说明 | 示例值 |
|-------|------|-----|------|--------|
| type | string | 否 | 隐患类型 | equipment/environment/management/behavior |
| status | string | 否 | 处理状态 | pending/in_progress/completed |

#### 返回参数
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 12,
    "page": 1,
    "page_size": 10,
    "list": [
      {
        "id": "hazard_001",
        "hazard_id": "HD-2024072001",
        "description": "生产车间设备漏电隐患",
        "location": "设备编号：EQ-2024-001",
        "type": "equipment",
        "reporter": "张三",
        "report_time": "2024-07-20 09:30",
        "risk_level": "high",
        "status": "pending"
      }
    ]
  }
}
```

### 获取风险评估列表

**接口名称：** 获取风险评估列表
**功能描述：** 获取安全风险评估信息
**接口地址：" /api/risks/assessments
**请求方式：" GET

#### 功能说明
查询企业的安全风险评估结果。

#### 返回参数
```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": "risk_001",
      "name": "高处作业风险",
      "possibility": 3,
      "severity": 4,
      "risk_value": 12,
      "level": "high"
    }
  ]
}
```

---

## 应急管理模块

### 获取应急预案列表

**接口名称：" 获取应急预案列表
**功能描述：" 分页获取应急预案信息
**接口地址：" /api/emergency/plans
**请求方式：" GET

#### 功能说明
查询企业的应急预案信息。

#### 请求参数
```json
{
  "page": 1,
  "page_size": 10,
  "type": "fire"
}
```

| 参数名 | 类型 | 必填 | 说明 | 示例值 |
|-------|------|-----|------|--------|
| type | string | 否 | 预案类型 | fire/chemical/natural/other |

#### 返回参数
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 8,
    "page": 1,
    "page_size": 10,
    "list": [
      {
        "id": "plan_001",
        "plan_id": "EP-2024001",
        "name": "火灾事故应急预案",
        "type": "fire",
        "department": "安全管理部门",
        "create_date": "2024-01-15",
        "update_date": "2024-06-20",
        "status": "active"
      }
    ]
  }
}
```

### 获取应急演练计划

**接口名称：" 获取应急演练计划
**功能描述：" 获取应急演练安排信息
**接口地址：" /api/emergency/drills
**请求方式：" GET

#### 返回参数
```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": "drill_001",
      "name": "消防应急演练",
      "date": "2024-06-15",
      "location": "生产车间A区",
      "participant_count": 86,
      "score": 92,
      "status": "completed"
    }
  ]
}
```

---

## 事故管理模块

### 获取事故列表

**接口名称：" 获取事故列表
**功能描述：" 分页获取事故信息
**接口地址：" /api/accidents/list
**请求方式：" GET

#### 功能说明
查询企业的事故记录信息。

#### 请求参数
```json
{
  "page": 1,
  "page_size": 10,
  "type": "injury",
  "status": "investigating"
}
```

| 参数名 | 类型 | 必填 | 说明 | 示例值 |
|-------|------|-----|------|--------|
| type | string | 否 | 事故类型 | injury/equipment/fire/other |
| status | string | 否 | 处理状态 | pending/investigating/completed |

#### 返回参数
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 2,
    "page": 1,
    "page_size": 10,
    "list": [
      {
        "id": "accident_001",
        "accident_id": "AC-2024072001",
        "description": "设备操作不当导致轻微划伤",
        "type": "injury",
        "occurrence_time": "2024-07-20 14:30",
        "location": "生产车间A区",
        "severity": "minor",
        "status": "investigating"
      }
    ]
  }
}
```

### 获取事故调查详情

**接口名称：" 获取事故调查详情
**功能描述：" 获取具体事故的调查详细信息
**接口地址：" /api/accidents/{id}/details
**请求方式：" GET

#### 功能说明
查询特定事故的详细调查信息。

#### 请求参数
路径参数：
- id: 事故ID

#### 返回参数
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": "accident_001",
    "basic_info": {
      "accident_id": "AC-2024072001",
      "occurrence_time": "2024-07-20 14:30",
      "location": "生产车间A区 - 数控机床操作台",
      "type": "injury",
      "severity": "minor"
    },
    "details": {
      "injured_person": "张三（操作工）",
      "injury_description": "右手轻微划伤，已进行包扎处理",
      "direct_cause": "操作人员在设备运行过程中未按规定佩戴防护手套",
      "indirect_cause": [
        "安全培训不到位",
        "现场监督不严格",
        "防护用品配备不足"
      ]
    },
    "corrective_actions": [
      {
        "action": "加强安全操作规程培训",
        "department": "人力资源部",
        "responsible_person": "王五",
        "deadline": "2024-07-25",
        "status": "in_progress"
      }
    ]
  }
}
```

---

## 通用接口

### 获取统计数据

**接口名称：" 获取统计数据
**功能描述：" 获取各模块的统计指标
**接口地址：" /api/dashboard/stats
**请求方式：" GET

#### 返回参数
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "pending_hazards": 12,
    "resolved_hazards": 156,
    "in_progress_hazards": 8,
    "overdue_hazards": 4,
    "monthly_accidents": 2,
    "processed_accidents": 8,
    "investigating_accidents": 1,
    "major_accidents": 0
  }
}
```

## 📋 错误码说明

| 错误码 | 说明 | 处理建议 |
|-------|------|----------|
| 200 | 请求成功 | - |
| 400 | 请求参数错误 | 检查请求参数格式 |
| 401 | 未授权访问 | 检查登录状态 |
| 403 | 权限不足 | 检查用户权限 |
| 404 | 资源不存在 | 检查请求路径 |
| 500 | 服务器内部错误 | 联系系统管理员 |

## 🔐 安全要求

1. 所有接口需要身份验证
2. 敏感数据需要进行加密传输
3. 重要操作需要记录操作日志
4. 接口调用频率需要限制
5. 数据权限需要按角色控制

## 📝 更新记录

| 版本 | 日期 | 更新内容 | 更新人 |
|------|------|----------|--------|
| v1.0 | 2024-07-20 | 初始版本创建 | 系统管理员 |