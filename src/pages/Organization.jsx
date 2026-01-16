import React, { useState } from 'react'
import Card from '../components/common/Card'
import Button from '../components/common/Button'

const Organization = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: '张三',
      employeeId: 'EMP001',
      department: '安全管理部门',
      position: '安全专员',
      phone: '138****1234',
      status: '在职'
    },
    {
      id: 2,
      name: '李四',
      employeeId: 'EMP002',
      department: '生产车间',
      position: '操作工',
      phone: '139****5678',
      status: '在职'
    },
    {
      id: 3,
      name: '王五',
      employeeId: 'EMP003',
      department: '设备维护',
      position: '维修工程师',
      phone: '136****9012',
      status: '在职'
    }
  ])

  const [orgTree, setOrgTree] = useState([
    {
      id: 1,
      name: 'XX科技有限公司',
      icon: 'building',
      active: true,
      children: [
        {
          id: 2,
          name: '管理层',
          icon: 'users',
          count: 5,
          children: []
        },
        {
          id: 3,
          name: '生产部门',
          icon: 'industry',
          count: 86,
          expanded: true,
          children: [
            {
              id: 4,
              name: '生产车间',
              icon: 'cogs',
              count: 45,
              children: []
            },
            {
              id: 5,
              name: '仓储物流',
              icon: 'warehouse',
              count: 25,
              children: []
            },
            {
              id: 6,
              name: '设备维护',
              icon: 'tools',
              count: 16,
              children: []
            }
          ]
        },
        {
          id: 7,
          name: '安全管理部门',
          icon: 'shield-alt',
          count: 12,
          expanded: true,
          children: [
            {
              id: 8,
              name: '安全监督',
              icon: 'user-shield',
              count: 8,
              children: []
            },
            {
              id: 9,
              name: '应急管理',
              icon: 'first-aid',
              count: 4,
              children: []
            }
          ]
        },
        {
          id: 10,
          name: '人力资源部',
          icon: 'graduation-cap',
          count: 8,
          children: []
        },
        {
          id: 11,
          name: 'IT部门',
          icon: 'laptop',
          count: 6,
          children: []
        }
      ]
    }
  ])

  const getStatusBadgeClass = (status) => {
    const statusClasses = {
      success: 'bg-green-100 text-green-800 border-green-200',
      info: 'bg-blue-100 text-blue-800 border-blue-200'
    }
    return `px-2 py-1 text-xs font-medium rounded border ${statusClasses[status] || statusClasses.info}`
  }

  const renderOrgTree = (nodes, level = 0) => {
    return nodes.map((node) => (
      <div key={node.id}>
        <div className={`org-node flex items-center justify-between py-2 px-3 cursor-pointer transition-colors ${
          node.active ? 'bg-blue-50 border-l-2 border-blue-500' : 'hover:bg-gray-50'
        } ${level > 0 ? 'ml-6' : ''}`}>
          <div className="flex items-center gap-2">
            <i className={`fas fa-${node.icon} text-gray-500 w-4`}></i>
            <span className={node.expanded ? 'font-semibold' : ''}>{node.name}</span>
          </div>
          {node.count && (
            <span className="org-count text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {node.count}人
            </span>
          )}
        </div>
        {node.children && node.children.length > 0 && (
          <div className="org-children ml-6 border-l-2 border-gray-200 pl-4">
            {renderOrgTree(node.children, level + 1)}
          </div>
        )}
      </div>
    ))
  }

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">组织架构管理</h1>
        <p className="page-description">管理企业组织架构、部门设置和人员信息</p>
      </div>

      {/* 操作工具栏 */}
      <Card>
        <div className="flex flex-wrap gap-3 items-center">
          <Button variant="primary" icon="plus">
            新增部门
          </Button>
          <Button variant="success" icon="user-plus">
            新增人员
          </Button>
          <Button variant="outline" icon="sync">
            刷新数据
          </Button>
          
          <div className="flex-1"></div>
          
          <div className="relative">
            <input 
              type="text" 
              className="w-80 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              placeholder="搜索部门或人员..."
            />
            <i className="fas fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 组织树 */}
        <Card title="组织架构树">
          <div className="max-h-96 overflow-y-auto">
            <div className="org-tree text-sm">
              {renderOrgTree(orgTree)}
            </div>
          </div>
        </Card>

        {/* 人员列表 */}
        <Card 
          title="人员列表"
          actions={<span className={getStatusBadgeClass('info')}>共 {employees.length} 人</span>}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">姓名</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">工号</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">部门</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">岗位</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">联系方式</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="user-avatar w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                          {employee.name.charAt(0)}
                        </div>
                        <span className="text-sm text-gray-900">{employee.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.employeeId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.position}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={getStatusBadgeClass('success')}>{employee.status}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-1">
                        <button className="px-2 py-1 border border-gray-300 rounded text-xs hover:bg-gray-50">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="px-2 py-1 border border-gray-300 rounded text-xs hover:bg-gray-50">
                          <i className="fas fa-eye"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Organization