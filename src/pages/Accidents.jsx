import React, { useState } from 'react'
import Card from '../components/common/Card'
import StatCard from '../components/common/StatCard'
import Button from '../components/common/Button'

const Accidents = () => {
  const [accidents, setAccidents] = useState([
    {
      id: 1,
      title: '车间机械伤害事故',
      type: '机械伤害',
      level: '重大',
      status: 'investigating',
      date: '2024-01-15',
      location: '生产车间A区',
      responsiblePerson: '张三',
      injured: 1,
      economicLoss: 50000,
      description: '操作人员未按规定佩戴防护设备，导致手臂受伤'
    },
    {
      id: 2,
      title: '化学品泄漏事件',
      type: '化学品泄漏',
      level: '一般',
      status: 'rectifying',
      date: '2024-01-12',
      location: '化学品仓库',
      responsiblePerson: '李四',
      injured: 0,
      economicLoss: 20000,
      description: '存储容器老化导致少量化学品泄漏'
    },
    {
      id: 3,
      title: '电气火灾事故',
      type: '火灾',
      level: '较大',
      status: 'completed',
      date: '2024-01-08',
      location: '配电室',
      responsiblePerson: '王五',
      injured: 0,
      economicLoss: 80000,
      description: '线路老化短路引发小型火灾'
    },
    {
      id: 4,
      title: '高空坠落未遂事件',
      type: '高空作业',
      level: '轻微',
      status: 'preventing',
      date: '2024-01-05',
      location: '建筑工地',
      responsiblePerson: '赵六',
      injured: 0,
      economicLoss: 0,
      description: '安全绳检查发现隐患，及时整改'
    }
  ])

  const [filterStatus, setFilterStatus] = useState('all')
  const [filterLevel, setFilterLevel] = useState('all')

  const filteredAccidents = accidents.filter(accident => {
    if (filterStatus !== 'all' && accident.status !== filterStatus) return false
    if (filterLevel !== 'all' && accident.level !== filterLevel) return false
    return true
  })

  const getStatusBadgeClass = (status) => {
    const statusClasses = {
      investigating: 'bg-red-100 text-red-800 border-red-200',
      rectifying: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      completed: 'bg-green-100 text-green-800 border-green-200',
      preventing: 'bg-blue-100 text-blue-800 border-blue-200'
    }
    return `px-2 py-1 text-xs font-medium rounded border ${statusClasses[status] || statusClasses.investigating}`
  }

  const getLevelBadgeClass = (level) => {
    const levelClasses = {
      '重大': 'bg-red-100 text-red-800 border-red-200',
      '较大': 'bg-orange-100 text-orange-800 border-orange-200',
      '一般': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      '轻微': 'bg-blue-100 text-blue-800 border-blue-200'
    }
    return `px-2 py-1 text-xs font-medium rounded border ${levelClasses[level] || levelClasses['一般']}`
  }

  const getStatusText = (status) => {
    const statusTexts = {
      investigating: '调查中',
      rectifying: '整改中',
      completed: '已完成',
      preventing: '预防中'
    }
    return statusTexts[status] || status
  }

  const getInjuredText = (injured) => {
    return injured > 0 ? `${injured}人受伤` : '无人员受伤'
  }

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">事故管理</h1>
        <p className="page-description">记录和分析安全事故，制定整改措施</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="事故总数"
          number={accidents.length}
          icon="exclamation-triangle"
          color="red"
        />
        <StatCard
          label="重大事故"
          number={accidents.filter(a => a.level === '重大').length}
          icon="fire"
          color="orange"
        />
        <StatCard
          label="受伤人数"
          number={accidents.reduce((sum, a) => sum + a.injured, 0)}
          icon="user-injured"
          color="yellow"
        />
        <StatCard
          label="经济损失(万)"
          number={(accidents.reduce((sum, a) => sum + a.economicLoss, 0) / 10000).toFixed(1)}
          icon="money-bill-wave"
          color="green"
        />
      </div>

      <Card 
        title="事故记录列表"
        actions={
          <div className="flex gap-2">
            <Button variant="primary" size="sm">
              <i className="fas fa-plus mr-2"></i>
              新增事故
            </Button>
            <Button variant="outline" size="sm">
              <i className="fas fa-chart-line mr-2"></i>
              统计分析
            </Button>
          </div>
        }
      >
        <div className="mb-4 flex flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">状态:</span>
            <button 
              className={`px-3 py-1 text-sm rounded border ${filterStatus === 'all' ? 'bg-blue-100 text-blue-800 border-blue-300' : 'bg-gray-100 text-gray-600 border-gray-300'}`}
              onClick={() => setFilterStatus('all')}
            >
              全部
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded border ${filterStatus === 'investigating' ? 'bg-red-100 text-red-800 border-red-300' : 'bg-gray-100 text-gray-600 border-gray-300'}`}
              onClick={() => setFilterStatus('investigating')}
            >
              调查中
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded border ${filterStatus === 'rectifying' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' : 'bg-gray-100 text-gray-600 border-gray-300'}`}
              onClick={() => setFilterStatus('rectifying')}
            >
              整改中
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded border ${filterStatus === 'completed' ? 'bg-green-100 text-green-800 border-green-300' : 'bg-gray-100 text-gray-600 border-gray-300'}`}
              onClick={() => setFilterStatus('completed')}
            >
              已完成
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">级别:</span>
            <button 
              className={`px-3 py-1 text-sm rounded border ${filterLevel === 'all' ? 'bg-blue-100 text-blue-800 border-blue-300' : 'bg-gray-100 text-gray-600 border-gray-300'}`}
              onClick={() => setFilterLevel('all')}
            >
              全部
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded border ${filterLevel === '重大' ? 'bg-red-100 text-red-800 border-red-300' : 'bg-gray-100 text-gray-600 border-gray-300'}`}
              onClick={() => setFilterLevel('重大')}
            >
              重大
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded border ${filterLevel === '较大' ? 'bg-orange-100 text-orange-800 border-orange-300' : 'bg-gray-100 text-gray-600 border-gray-300'}`}
              onClick={() => setFilterLevel('较大')}
            >
              较大
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded border ${filterLevel === '一般' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' : 'bg-gray-100 text-gray-600 border-gray-300'}`}
              onClick={() => setFilterLevel('一般')}
            >
              一般
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">事故标题</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">级别</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">发生日期</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">地点</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">受伤情况</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">经济损失</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAccidents.map((accident) => (
                <tr key={accident.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{accident.title}</div>
                      <div className="text-xs text-gray-500 truncate max-w-xs">{accident.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{accident.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getLevelBadgeClass(accident.level)}>
                      {accident.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadgeClass(accident.status)}>
                      {getStatusText(accident.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {accident.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {accident.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getInjuredText(accident.injured)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {accident.economicLoss > 0 ? `¥${accident.economicLoss.toLocaleString()}` : '无'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <i className="fas fa-edit"></i>
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

        {filteredAccidents.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <i className="fas fa-search text-3xl mb-2"></i>
            <p>暂无事故记录数据</p>
          </div>
        )}
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="近期事故趋势">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">本月事故数量</span>
              <span className="text-lg font-bold text-red-600">3</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">较上月变化</span>
              <span className="text-sm text-green-600">↓ 25%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">重大事故比例</span>
              <span className="text-sm text-orange-600">25%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-red-500" style={{width: '25%'}}></div>
            </div>
          </div>
        </Card>

        <Card title="快速操作">
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="flex-col h-20">
              <i className="fas fa-clipboard-list text-xl mb-1"></i>
              <span className="text-xs">事故报告</span>
            </Button>
            <Button variant="outline" className="flex-col h-20">
              <i className="fas fa-chart-pie text-xl mb-1"></i>
              <span className="text-xs">统计分析</span>
            </Button>
            <Button variant="outline" className="flex-col h-20">
              <i className="fas fa-shield-alt text-xl mb-1"></i>
              <span className="text-xs">整改措施</span>
            </Button>
            <Button variant="outline" className="flex-col h-20">
              <i className="fas fa-file-export text-xl mb-1"></i>
              <span className="text-xs">导出数据</span>
            </Button>
          </div>
        </Card>
      </div>

      <Card title="事故预防建议">
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded">
            <i className="fas fa-exclamation-circle text-yellow-600 mt-1"></i>
            <div>
              <div className="font-medium text-sm">加强机械操作培训</div>
              <div className="text-xs text-gray-600">近期机械伤害事故频发，建议加强操作人员安全培训</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded">
            <i className="fas fa-tools text-blue-600 mt-1"></i>
            <div>
              <div className="font-medium text-sm">定期设备检查</div>
              <div className="text-xs text-gray-600">建议每月对生产设备进行一次全面安全检查</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-green-50 rounded">
            <i className="fas fa-user-shield text-green-600 mt-1"></i>
            <div>
              <div className="font-medium text-sm">完善应急预案</div>
              <div className="text-xs text-gray-600">针对化学品泄漏等突发事件，完善应急预案流程</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Accidents