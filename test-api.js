// API服务验证脚本
import('vite').then(async (vite) => {
  try {
    // 创建Vite服务器来解析模块
    const server = await vite.createServer({
      configFile: false,
      root: process.cwd(),
      server: {
        middlewareMode: true
      },
      resolve: {
        alias: {
          '@': '/src'
        }
      }
    })

    // 使用Vite的模块解析
    const apiModule = await server.ssrLoadModule('./src/services/index.ts')
    
    console.log('✅ API模块加载成功')
    console.log('API结构:', Object.keys(apiModule.default || apiModule))
    
    // 测试Mock服务
    console.log('\n🧪 测试Mock服务...')
    
    try {
      const orgTree = await apiModule.default.organization.getTree()
      console.log('✅ 组织架构API测试通过')
      console.log('   响应数据:', {
        code: orgTree.code,
        message: orgTree.message,
        dataKeys: Object.keys(orgTree.data)
      })
    } catch (error) {
      console.log('❌ 组织架构API测试失败:', error.message)
    }

    try {
      const targets = await apiModule.default.targets.getTargets({ page: 1, page_size: 5 })
      console.log('✅ 安全目标API测试通过')
      console.log('   数据数量:', targets.data.list.length)
    } catch (error) {
      console.log('❌ 安全目标API测试失败:', error.message)
    }

    // 检查环境变量
    console.log('\n🌐 环境变量检查:')
    console.log('   VITE_API_BASE:', process.env.VITE_API_BASE || '未设置')
    console.log('   VITE_ENABLE_MOCK:', process.env.VITE_ENABLE_MOCK || '未设置')
    
    server.close()
    
  } catch (error) {
    console.log('❌ 验证失败:', error.message)
    process.exit(1)
  }
})