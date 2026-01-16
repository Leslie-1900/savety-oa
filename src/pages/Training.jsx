import React, { useState } from 'react'
import Card from '../components/common/Card'
import StatCard from '../components/common/StatCard'
import Button from '../components/common/Button'

const Training = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: '新员工安全入职培训',
      type: '新员工培训',
      duration: '2小时',
      participants: 86,
      rating: 4.8,
      progress: 100,
      status: 'completed',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 2,
      title: '消防安全知识培训',
      type: '年度复训',
      duration: '3小时',
      participants: 45,
      rating: 4.6,
      progress: 85,
      status: 'inProgress',
      gradient: 'from-pink-400 to-red-500'
    },
    {
      id: 3,
      title: '高处作业安全培训',
      type: '特种作业',
      duration: '4小时',
      participants: 32,
      rating: 4.7,
      progress: 60,
      status: 'notStarted',
      gradient: 'from-blue-400 to-cyan-400'
    },
    {
      id: 4,
      title: '化学品安全使用培训',
      type: '专项培训',
      duration: '2.5小时',
      participants: 28,
      rating: 4.5,
      progress: 30,
      status: 'notStarted',
      gradient: 'from-green-400 to-blue-500'
    }
  ])

  const [stats, setStats] = useState({
    totalCourses: 28,
    completed: 156,
    inProgress: 5,
    pending: 12
  })

  const getStatusBadgeClass = (status) => {
    const statusClasses = {
      completed: 'bg-green-100 text-green-800 border-green-200',
      inProgress: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      notStarted: 'bg-blue-100 text-blue-800 border-blue-200'
    }
    return `px-2 py-1 text-xs font-medium rounded border ${statusClasses[status] || statusClasses.notStarted}`
  }

  const getStatusText = (status) => {
    const statusTexts = {
      completed: '已完成',
      inProgress: '进行中',
      notStarted: '未开始'
    }
    return statusTexts[status] || '未开始'
  }

  const getProgressColor = (progress) => {
    if (progress >= 90) return 'bg-green-500'
    if (progress >= 70) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">教育培训管理</h1>
        <p className="page-description">管理安全培训课程、在线学习和考试评估</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon="book"
          number={stats.totalCourses}
          label="培训课程"
          color="blue"
        />
        <StatCard 
          icon="user-graduate"
          number={stats.completed}
          label="已完成培训"
          color="green"
        />
        <StatCard 
          icon="clipboard-list"
          number={stats.inProgress}
          label="进行中培训"
          color="yellow"
        />
        <StatCard 
          icon="exclamation-circle"
          number={stats.pending}
          label="待参加培训"
          color="red"
        />
      </div>

      {/* 操作工具栏 */}
      <Card>
        <div className="flex flex-wrap gap-3 items-center">
          <Button variant="primary" icon="plus">
            新增课程
          </Button>
          <Button variant="success" icon="tasks">
            培训计划
          </Button>
          <Button variant="warning" icon="file-alt">
            创建考试
          </Button>
          <Button variant="outline" icon="chart-bar">
            培训统计
          </Button>
          
          <div className="flex-1"></div>
          
          <select className="w-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>全部类型</option>
            <option>新员工培训</option>
            <option>特种作业</option>
            <option>年度复训</option>
            <option>专项培训</option>
          </select>
          
          <select className="w-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>全部状态</option>
            <option>进行中</option>
            <option>已完成</option>
            <option>未开始</option>
          </select>
        </div>
      </Card>

      {/* 课程列表 */}
      <Card 
        title="培训课程列表"
        actions={
          <div className="flex gap-2">
            <span className={getStatusBadgeClass('completed')}>已完成 18</span>
            <span className={getStatusBadgeClass('inProgress')}>进行中 5</span>
            <span className={getStatusBadgeClass('notStarted')}>未开始 5</span>
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              {/* 课程头部 */}
              <div className={`h-20 bg-gradient-to-r ${course.gradient} p-4 text-white`}>
                <div className="flex justify-between items-start">
                  <div className="font-semibold text-lg">{course.title}</div>
                  <span className="bg-white/20 px-2 py-1 rounded text-xs">{course.type}</span>
                </div>
              </div>
              
              {/* 课程内容 */}
              <div className="p-4">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <i className="fas fa-clock text-blue-500 mb-1"></i>
                    <div className="text-sm text-gray-600">{course.duration}</div>
                  </div>
                  <div className="text-center">
                    <i className="fas fa-users text-green-500 mb-1"></i>
                    <div className="text-sm text-gray-600">{course.participants}人</div>
                  </div>
                  <div className="text-center">
                    <i className="fas fa-star text-yellow-500 mb-1"></i>
                    <div className="text-sm text-gray-600">{course.rating}分</div>
                  </div>
                </div>
                
                {/* 进度条 */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>完成率</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getProgressColor(course.progress)}`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* 操作按钮 */}
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 flex items-center justify-center gap-1">
                    <i className="fas fa-eye"></i>
                    查看详情
                  </button>
                  <button className="flex-1 px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 flex items-center justify-center gap-1">
                    <i className="fas fa-chart-bar"></i>
                    统计分析
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default Training