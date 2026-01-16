# 📖 安全生产管理系统 API 文档

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
**请求方式：" GET

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