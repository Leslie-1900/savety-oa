import React, { useState } from 'react'
import Card from '../components/common/Card'
import StatCard from '../components/common/StatCard'
import Button from '../components/common/Button'

const Equipment = () => {
  const [equipments, setEquipments] = useState([
    {
      id: 1,
      code: 'EQ-2024-001',
      name: '数控机床',
      model: 'CK6150',
      type: '生产设备',
      department: '生产车间',
      responsible: '张三',
      lastInspection: '2024-07-15',
      status: 'normal'
    },
    {
      id: 2,
      code: 'EQ-2024-002',
      name: '空压机',
      model: 'GA37',
      type: '生产设备',
      department: '生产车间',
      responsible: '李四',
      lastInspection: '2024-07-10',
      status: 'maintenance'
    },
    {
      id: 3,
      code: 'EQ-2024-003',
      name: '消防水泵',
      model: 'XBD5.0/40',
      type: '安全设备',
      department: '安全管理部门',
      responsible: '王五',
      lastInspection: '2024-07-18',
      status: 'normal'
    },
    {
      id: 4,
      code: 'EQ-2024-004',
      name: '气体检测仪',
      model: 'GT-1000',
      type: '检测设备',
      department: '安全监督',
      responsible: '赵六',
      lastInspection: '2024-07-12',
      status: 'pending'
    }
  ])

  const [stats, setStats] = useState({
    total: 156,
    normal: 142,
    maintenance: 8,
    pending: 6
  })

  const getStatusBadgeClass = (status) => {
    const statusClasses = {
      normal: 'bg-green-100 text-green-800 border-green-200',
      maintenance: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      pending: 'bg-red-100 text-red-800 border-red-200'
    }
    return `px-2 py-1 text-xs font-medium rounded border ${statusClasses[status] || statusClasses.normal}`
  }

  const getStatusText = (status) => {
    const statusTexts = {
      normal: '正常运行',
      maintenance: '维修中',
      pending: '待检修'
    }
    return statusTexts[status] || '正常运行'
  }

  const getActionIcon = (status) => {
    const actionIcons = {
      normal: 'edit',
      maintenance: 'tools',
      pending: 'tools'
    }
    return actionIcons[status] || 'edit'
  }

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">现场设备管理</h1>
        <p className="page-description">管理设备设施、巡检计划和危险作业审批</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon="cogs"
          number={stats.total}
          label="设备总数"
          color="blue"
        />
        <StatCard 
          icon="check-circle"
          number={stats.normal}
          label="正常运行"
          color="green"
        />
        <StatCard 
          icon="tools"
          number={stats.maintenance}
          label="维修中"
          color="yellow"
        />
        <StatCard 
          icon="exclamation-triangle"
          number={stats.pending}
          label="待检修"
          color="red"
        />
      </div>

      {/* 操作工具栏 */}
      <Card>
        <div className="flex flex-wrap gap-3 items-center">
          <Button variant="primary" icon="plus">
            新增设备
          </Button>
          <Button variant="success" icon="clipboard-check">
            巡检计划
          </Button>
          <Button variant="warning" icon="file-alt">
            作业票管理
          </Button>
          <Button variant="outline" icon="history">
            维护记录
          </Button>
          
          <div className="flex-1"></div>
          
          <select className="w-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>全部设备</option>
            <option>生产设备</option>
            <option>检测设备</option>
            <option>安全设备</option>
          </select>
          
          <select className="w-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>全部状态</option>
            <option>正常运行</option>
            <option>维修中</option>
            <option>待检修</option>
          </select>
        </div>
      </Card>

      {/* 设备列表 */}
      <Card 
        title="设备列表"
        actions={
          <div className="flex gap-2">
            <span className={getStatusBadgeClass('normal')}>正常 {stats.normal}</span>
            <span className={getStatusBadgeClass('maintenance')}>维修 {stats.maintenance}</span>
            <span className={getStatusBadgeClass('pending')}>待修 {stats.pending}</span>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">设备编号</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">设备名称</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">设备类型</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">所属部门</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">责任人</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">上次巡检</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {equipments.map((equipment) => (
                <tr key={equipment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{equipment.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900">{equipment.name}</div>
                      <div className="text-sm text-gray-500">型号：{equipment.model}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{equipment.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{equipment.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{equipment.responsible}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{equipment.lastInspection}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={getStatusBadgeClass(equipment.status)}>
                      {getStatusText(equipment.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-1">
                      <button className="px-2 py-1 border border-gray-300 rounded text-xs hover:bg-gray-50">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="px-2 py-1 border border-gray-300 rounded text-xs hover:bg-gray-50">
                        <i className={`fas fa-${getActionIcon(equipment.status)}`}></i>
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
  )
}

export default Equipment