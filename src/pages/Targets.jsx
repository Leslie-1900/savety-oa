import React, { useState } from 'react'
import Card from '../components/common/Card'
import StatCard from '../components/common/StatCard'
import Button from '../components/common/Button'

const Targets = () => {
  const [targets, setTargets] = useState([
    {
      id: 1,
      name: '重大事故为零',
      description: '杜绝重大生产安全事故',
      department: '安全管理部门',
      responsible: '张三',
      period: '2024.01-2024.12',
      progress: 100,
      status: 'completed'
    },
    {
      id: 2,
      name: '隐患整改率≥95%',
      description: '提高隐患整改效率',
      department: '各生产部门',
      responsible: '李四',
      period: '2024.01-2024.12',
      progress: 85,
      status: 'inProgress'
    },
    {
      id: 3,
      name: '安全培训覆盖率100%',
      description: '全员安全培训',
      department: '人力资源部',
      responsible: '王五',
      period: '2024.01-2024.12',
      progress: 92,
      status: 'completed'
    },
    {
      id: 4,
      name: '应急预案演练完成率100%',
      description: '年度应急演练计划',
      department: '安全管理部门',
      responsible: '张三',
      period: '2024.01-2024.12',
      progress: 45,
      status: 'lagging'
    }
  ])

  const [stats, setStats] = useState({
    totalTargets: 15,
    completed: 8,
    inProgress: 5,
    lagging: 2
  })

  const getStatusBadgeClass = (status) => {
    const statusClasses = {
      completed: 'bg-green-100 text-green-800 border-green-200',
      inProgress: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      lagging: 'bg-red-100 text-red-800 border-red-200'
    }
    return `px-2 py-1 text-xs font-medium rounded border ${statusClasses[status] || statusClasses.inProgress}`
  }

  const getStatusText = (status) => {
    const statusTexts = {
      completed: '已完成',
      inProgress: '进行中',
      lagging: '滞后'
    }
    return statusTexts[status] || '进行中'
  }

  const getProgressColor = (progress) => {
    if (progress >= 90) return 'bg-green-500'
    if (progress >= 70) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">安全目标管理</h1>
        <p className="page-description">制定、分解、跟踪和考核企业安全目标</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon="bullseye"
          number={stats.totalTargets}
          label="年度安全目标"
          color="blue"
        />
        <StatCard 
          icon="check-circle"
          number={stats.completed}
          label="已完成目标"
          color="green"
        />
        <StatCard 
          icon="spinner"
          number={stats.inProgress}
          label="进行中目标"
          color="yellow"
        />
        <StatCard 
          icon="exclamation-circle"
          number={stats.lagging}
          label="滞后目标"
          color="red"
        />
      </div>

      {/* 操作工具栏 */}
      <Card>
        <div className="flex flex-wrap gap-3 items-center">
          <Button variant="primary" icon="plus">
            新增目标
          </Button>
          <Button variant="success" icon="chart-line">
            目标分解
          </Button>
          <Button variant="warning" icon="clipboard-check">
            考核评估
          </Button>
          <Button variant="outline" icon="file-export">
            导出报表
          </Button>
          
          <div className="flex-1"></div>
          
          <select className="w-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>全部状态</option>
            <option>进行中</option>
            <option>已完成</option>
            <option>已滞后</option>
          </select>
          
          <select className="w-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>2024年度</option>
            <option>2023年度</option>
            <option>2022年度</option>
          </select>
        </div>
      </Card>

      {/* 目标列表 */}
      <Card 
        title="安全目标列表"
        actions={
          <div className="flex gap-2">
            <span className={getStatusBadgeClass('completed')}>已完成 {stats.completed}</span>
            <span className={getStatusBadgeClass('inProgress')}>进行中 {stats.inProgress}</span>
            <span className={getStatusBadgeClass('lagging')}>滞后 {stats.lagging}</span>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">目标名称</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">责任部门</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">责任人</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">计划周期</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">进度</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {targets.map((target) => (
                <tr key={target.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{target.name}</div>
                      <div className="text-sm text-gray-500">{target.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{target.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{target.responsible}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{target.period}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getProgressColor(target.progress)}`}
                          style={{ width: `${target.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">{target.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={getStatusBadgeClass(target.status)}>
                      {getStatusText(target.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-1">
                      <button className="px-2 py-1 border border-gray-300 rounded text-xs hover:bg-gray-50">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="px-2 py-1 border border-gray-300 rounded text-xs hover:bg-gray-50">
                        <i className="fas fa-chart-bar"></i>
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

export default Targets