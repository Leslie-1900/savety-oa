import React, { useState } from 'react'
import Card from '../components/common/Card'
import StatCard from '../components/common/StatCard'
import Button from '../components/common/Button'

const Emergency = () => {
  const [emergencyPlans, setEmergencyPlans] = useState([
    {
      id: 1,
      name: '火灾应急预案',
      type: '火灾',
      level: '一级',
      status: 'active',
      lastUpdate: '2024-01-15',
      nextDrill: '2024-02-20',
      responsiblePerson: '张三'
    },
    {
      id: 2,
      name: '化学品泄漏预案',
      type: '化学品',
      level: '二级',
      status: 'draft',
      lastUpdate: '2024-01-10',
      nextDrill: '2024-03-15',
      responsiblePerson: '李四'
    },
    {
      id: 3,
      name: '自然灾害应对方案',
      type: '自然灾害',
      level: '一级',
      status: 'active',
      lastUpdate: '2024-01-08',
      nextDrill: '2024-04-10',
      responsiblePerson: '王五'
    },
    {
      id: 4,
      name: '医疗急救预案',
      type: '医疗',
      level: '三级',
      status: 'inactive',
      lastUpdate: '2024-01-05',
      nextDrill: '2024-05-20',
      responsiblePerson: '赵六'
    }
  ])

  const [filterStatus, setFilterStatus] = useState('all')

  const filteredPlans = emergencyPlans.filter(plan => {
    if (filterStatus === 'all') return true
    return plan.status === filterStatus
  })

  const getStatusBadgeClass = (status) => {
    const statusClasses = {
      active: 'bg-green-100 text-green-800 border-green-200',
      draft: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      inactive: 'bg-gray-100 text-gray-800 border-gray-200'
    }
    return `px-2 py-1 text-xs font-medium rounded border ${statusClasses[status] || statusClasses.draft}`
  }

  const getLevelBadgeClass = (level) => {
    const levelClasses = {
      '一级': 'bg-red-100 text-red-800 border-red-200',
      '二级': 'bg-orange-100 text-orange-800 border-orange-200',
      '三级': 'bg-blue-100 text-blue-800 border-blue-200'
    }
    return `px-2 py-1 text-xs font-medium rounded border ${levelClasses[level] || levelClasses['三级']}`
  }

  const getStatusText = (status) => {
    const statusTexts = {
      active: '生效',
      draft: '草稿',
      inactive: '停用'
    }
    return statusTexts[status] || status
  }

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">应急管理</h1>
        <p className="page-description">制定和执行应急预案，提高应急响应能力</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="应急预案总数"
          number={emergencyPlans.length}
          icon="file-alt"
          color="blue"
        />
        <StatCard
          label="生效预案"
          number={emergencyPlans.filter(p => p.status === 'active').length}
          icon="check-circle"
          color="green"
        />
        <StatCard
          label="待演练预案"
          number={emergencyPlans.filter(p => new Date(p.nextDrill) > new Date()).length}
          icon="calendar-alt"
          color="orange"
        />
        <StatCard
          label="紧急预案"
          number={emergencyPlans.filter(p => p.level === '一级').length}
          icon="exclamation-triangle"
          color="red"
        />
      </div>

      <Card 
        title="应急预案列表"
        actions={
          <div className="flex gap-2">
            <Button variant="primary" size="sm">
              <i className="fas fa-plus mr-2"></i>
              新增预案
            </Button>
            <Button variant="outline" size="sm">
              <i className="fas fa-download mr-2"></i>
              导出
            </Button>
          </div>
        }
      >
        <div className="mb-4 flex flex-wrap gap-2">
          <button 
            className={`px-3 py-1 text-sm rounded border ${filterStatus === 'all' ? 'bg-blue-100 text-blue-800 border-blue-300' : 'bg-gray-100 text-gray-600 border-gray-300'}`}
            onClick={() => setFilterStatus('all')}
          >
            全部
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded border ${filterStatus === 'active' ? 'bg-green-100 text-green-800 border-green-300' : 'bg-gray-100 text-gray-600 border-gray-300'}`}
            onClick={() => setFilterStatus('active')}
          >
            生效
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded border ${filterStatus === 'draft' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' : 'bg-gray-100 text-gray-600 border-gray-300'}`}
            onClick={() => setFilterStatus('draft')}
          >
            草稿
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded border ${filterStatus === 'inactive' ? 'bg-gray-100 text-gray-800 border-gray-300' : 'bg-gray-100 text-gray-600 border-gray-300'}`}
            onClick={() => setFilterStatus('inactive')}
          >
            停用
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">预案名称</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">级别</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最后更新</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">下次演练</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">负责人</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPlans.map((plan) => (
                <tr key={plan.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{plan.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{plan.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getLevelBadgeClass(plan.level)}>
                      {plan.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadgeClass(plan.status)}>
                      {getStatusText(plan.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {plan.lastUpdate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {plan.nextDrill}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {plan.responsiblePerson}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <i className="fas fa-play"></i>
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPlans.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <i className="fas fa-search text-3xl mb-2"></i>
            <p>暂无应急预案数据</p>
          </div>
        )}
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="应急演练计划">
          <div className="space-y-4">
            {emergencyPlans
              .filter(p => new Date(p.nextDrill) > new Date())
              .sort((a, b) => new Date(a.nextDrill) - new Date(b.nextDrill))
              .slice(0, 3)
              .map(plan => (
                <div key={plan.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <div className="font-medium text-sm">{plan.name}</div>
                    <div className="text-xs text-gray-500">下次演练: {plan.nextDrill}</div>
                  </div>
                  <span className={getLevelBadgeClass(plan.level)}>
                    {plan.level}
                  </span>
                </div>
              ))}
          </div>
        </Card>

        <Card title="快速操作">
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="flex-col h-20">
              <i className="fas fa-file-medical text-xl mb-1"></i>
              <span className="text-xs">创建预案</span>
            </Button>
            <Button variant="outline" className="flex-col h-20">
              <i className="fas fa-calendar-check text-xl mb-1"></i>
              <span className="text-xs">安排演练</span>
            </Button>
            <Button variant="outline" className="flex-col h-20">
              <i className="fas fa-chart-bar text-xl mb-1"></i>
              <span className="text-xs">演练统计</span>
            </Button>
            <Button variant="outline" className="flex-col h-20">
              <i className="fas fa-download text-xl mb-1"></i>
              <span className="text-xs">导出报告</span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Emergency