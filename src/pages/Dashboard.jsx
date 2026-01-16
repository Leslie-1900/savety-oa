import React, { useState, useEffect } from 'react'
import Card from '../components/common/Card'
import StatCard from '../components/common/StatCard'
import Button from '../components/common/Button'

const Dashboard = () => {
  const [stats, setStats] = useState({
    pendingHazards: 12,
    resolvedHazards: 156,
    pendingWorkTickets: 8,
    monthlyAccidents: 2
  })

  const [todos, setTodos] = useState([
    { id: 1, task: '高处作业审批', type: '作业票', deadline: '今天 15:00', status: 'warning' },
    { id: 2, task: '设备巡检计划制定', type: '计划', deadline: '明天', status: 'info' },
    { id: 3, task: '安全隐患整改验收', type: '隐患', deadline: '今天 17:00', status: 'danger' },
    { id: 4, task: '安全培训课程审核', type: '培训', deadline: '本周五', status: 'success' },
    { id: 5, task: '应急预案修订', type: '应急', deadline: '下周一', status: 'warning' }
  ])

  const [activities, setActivities] = useState([
    { id: 1, user: '张三', action: '上报了新的安全隐患', details: '生产车间设备漏电隐患', time: '5分钟前', color: 'blue' },
    { id: 2, user: '李四', action: '完成了安全培训', details: '《消防安全知识》考试通过', time: '1小时前', color: 'green' },
    { id: 3, user: '王五', action: '提交了作业票申请', details: '动火作业审批', time: '2小时前', color: 'yellow' },
    { id: 4, user: '系统', action: '应急演练计划已发布', details: '消防应急演练', time: '3小时前', color: 'red' }
  ])

  useEffect(() => {
    // 模拟API调用
    const fetchDashboardData = async () => {
      // 实际项目中这里调用API
      console.log('Fetching dashboard data...')
    }
    
    fetchDashboardData()
  }, [])

  const getStatusBadgeClass = (status) => {
    const statusClasses = {
      danger: 'bg-red-100 text-red-800 border-red-200',
      warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      success: 'bg-green-100 text-green-800 border-green-200',
      info: 'bg-blue-100 text-blue-800 border-blue-200'
    }
    return `px-2 py-1 text-xs font-medium rounded border ${statusClasses[status] || statusClasses.info}`
  }

  const getColorDot = (color) => {
    const colorClasses = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      yellow: 'bg-yellow-500',
      red: 'bg-red-500'
    }
    return `w-2 h-2 rounded-full ${colorClasses[color] || colorClasses.blue}`
  }

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">安全生产管理驾驶舱</h1>
        <p className="page-description">实时监控企业安全生产状况，快速掌握关键指标</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon="exclamation-triangle"
          number={stats.pendingHazards}
          label="待处理隐患"
          color="blue"
        />
        <StatCard 
          icon="check-circle"
          number={stats.resolvedHazards}
          label="已整改隐患"
          color="green"
        />
        <StatCard 
          icon="tools"
          number={stats.pendingWorkTickets}
          label="待审批作业票"
          color="yellow"
        />
        <StatCard 
          icon="car-crash"
          number={stats.monthlyAccidents}
          label="本月事故数"
          color="red"
        />
      </div>

      {/* 快速操作 */}
      <Card title="快速操作">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="primary" icon="plus" className="w-full">
            新增隐患上报
          </Button>
          <Button variant="success" icon="file-alt" className="w-full">
            创建作业票
          </Button>
          <Button variant="warning" icon="bullhorn" className="w-full">
            应急响应
          </Button>
          <Button variant="outline" icon="chart-bar" className="w-full">
            生成报告
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 待办事项 */}
        <Card 
          title="待办事项"
          actions={<span className={getStatusBadgeClass('danger')}>{todos.length}项待处理</span>}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">事项</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">截止时间</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {todos.map((todo) => (
                  <tr key={todo.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{todo.task}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={getStatusBadgeClass(todo.status)}>
                        {todo.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{todo.deadline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* 最新动态 */}
        <Card title="最新动态">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={getColorDot(activity.color)}></div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{activity.user} {activity.action}</div>
                  <div className="text-sm text-gray-500">{activity.details} · {activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard