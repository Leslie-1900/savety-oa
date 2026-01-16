import React, { useState } from 'react'
import Card from '../components/common/Card'
import StatCard from '../components/common/StatCard'
import Button from '../components/common/Button'

const Risks = () => {
  const [hazards, setHazards] = useState([
    {
      id: 1,
      code: 'HD-2024072001',
      description: '生产车间设备漏电隐患',
      detail: '设备编号：EQ-2024-001',
      type: '设备隐患',
      reporter: '张三',
      reportTime: '2024-07-20 09:30',
      riskLevel: '重大风险',
      status: 'pending'
    },
    {
      id: 2,
      code: 'HD-2024071901',
      description: '消防通道堆放杂物',
      detail: '位置：生产车间B区',
      type: '环境隐患',
      reporter: '李四',
      reportTime: '2024-07-19 14:20',
      riskLevel: '较大风险',
      status: 'inProgress'
    },
    {
      id: 3,
      code: 'HD-2024071801',
      description: '高处作业未系安全带',
      detail: '作业人员：王五',
      type: '行为隐患',
      reporter: '赵六',
      reportTime: '2024-07-18 10:15',
      riskLevel: '重大风险',
      status: 'waiting'
    },
    {
      id: 4,
      code: 'HD-2024071701',
      description: '危险化学品存储不规范',
      detail: '仓库：化学品库',
      type: '管理隐患',
      reporter: '钱七',
      reportTime: '2024-07-17 16:45',
      riskLevel: '较大风险',
      status: 'completed'
    }
  ])

  const [stats, setStats] = useState({
    pending: 12,
    completed: 156,
    inProgress: 8,
    overdue: 4
  })

  const getStatusBadgeClass = (status) => {
    const statusClasses = {
      danger: 'bg-red-100 text-red-800 border-red-200',
      warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      info: 'bg-blue-100 text-blue-800 border-blue-200',
      success: 'bg-green-100 text-green-800 border-green-200'
    }
    return `px-2 py-1 text-xs font-medium rounded border ${statusClasses[status] || statusClasses.info}`
  }

  const getHazardStatusClass = (status) => {
    const statusClasses = {
      pending: 'danger',
      inProgress: 'warning',
      waiting: 'info',
      completed: 'success'
    }
    return statusClasses[status] || 'info'
  }

  const getHazardStatusText = (status) => {
    const statusTexts = {
      pending: '待处理',
      inProgress: '整改中',
      waiting: '待验收',
      completed: '已完成'
    }
    return statusTexts[status] || '待处理'
  }

  const getActionIcon = (status) => {
    const actionIcons = {
      pending: 'user-check',
      inProgress: 'check-circle',
      waiting: 'clipboard-check',
      completed: 'history'
    }
    return actionIcons[status] || 'eye'
  }

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">风险隐患管理</h1>
        <p className="page-description">风险识别评估、隐患上报、整改跟踪和统计分析</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon="exclamation-triangle"
          number={stats.pending}
          label="待处理隐患"
          color="blue"
        />
        <StatCard 
          icon="check-circle"
          number={stats.completed}
          label="已整改隐患"
          color="green"
        />
        <StatCard 
          icon="spinner"
          number={stats.inProgress}
          label="整改中"
          color="yellow"
        />
        <StatCard 
          icon="clock"
          number={stats.overdue}
          label="超期未整改"
          color="red"
        />
      </div>

      {/* 操作工具栏 */}
      <Card>
        <div className="flex flex-wrap gap-3 items-center">
          <Button variant="primary" icon="plus">
            隐患上报
          </Button>
          <Button variant="success" icon="search">
            风险识别
          </Button>
          <Button variant="warning" icon="chart-pie">
            统计分析
          </Button>
          <Button variant="outline" icon="file-export">
            导出报表
          </Button>
          
          <div className="flex-1"></div>
          
          <select className="w-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>全部类型</option>
            <option>设备隐患</option>
            <option>环境隐患</option>
            <option>管理隐患</option>
            <option>行为隐患</option>
          </select>
          
          <select className="w-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>全部状态</option>
            <option>待处理</option>
            <option>整改中</option>
            <option>待验收</option>
            <option>已完成</option>
          </select>
        </div>
      </Card>

      {/* 隐患列表 */}
      <Card 
        title="隐患列表"
        actions={
          <div className="flex gap-2">
            <span className={getStatusBadgeClass('danger')}>待处理 {stats.pending}</span>
            <span className={getStatusBadgeClass('warning')}>整改中 {stats.inProgress}</span>
            <span className={getStatusBadgeClass('info')}>待验收 5</span>
            <span className={getStatusBadgeClass('success')}>已完成 {stats.completed}</span>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">隐患编号</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">隐患描述</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">隐患类型</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">上报人</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">上报时间</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">风险等级</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">整改状态</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {hazards.map((hazard) => (
                <tr key={hazard.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{hazard.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900">{hazard.description}</div>
                      <div className="text-sm text-gray-500">{hazard.detail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={getStatusBadgeClass('info')}>{hazard.type}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{hazard.reporter}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{hazard.reportTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={getStatusBadgeClass(hazard.riskLevel === '重大风险' ? 'danger' : 'warning')}>
                      {hazard.riskLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={getStatusBadgeClass(getHazardStatusClass(hazard.status))}>
                      {getHazardStatusText(hazard.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-1">
                      <button className="px-2 py-1 border border-gray-300 rounded text-xs hover:bg-gray-50">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="px-2 py-1 border border-gray-300 rounded text-xs hover:bg-gray-50">
                        <i className={`fas fa-${getActionIcon(hazard.status)}`}></i>
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

export default Risks