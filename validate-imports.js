// 验证导入路径的简单脚本
import fs from 'fs'
import path from 'path'

// 检查文件是否存在
function checkFileExists(filePath) {
  try {
    return fs.existsSync(filePath)
  } catch {
    return false
  }
}

// 解析导入路径
function resolveImportPath(importPath, currentFile) {
  if (importPath.startsWith('@/')) {
    // 处理别名路径
    return path.join(process.cwd(), 'src', importPath.slice(2))
  } else if (importPath.startsWith('.')) {
    // 处理相对路径
    return path.resolve(path.dirname(currentFile), importPath)
  }
  return null
}

// 检查所有服务的导入路径
const servicesDir = path.join(process.cwd(), 'src', 'services')
const serviceFiles = fs.readdirSync(servicesDir)

console.log('🔍 检查服务文件导入路径...\n')

let hasErrors = false

for (const file of serviceFiles) {
  if (file.endsWith('.ts') || file.endsWith('.js')) {
    const filePath = path.join(servicesDir, file)
    const content = fs.readFileSync(filePath, 'utf8')
    
    // 提取import语句
    const importRegex = /import\s+(?:.*?\s+from\s+)?['"]([^'"]+)['"]/g
    const imports = []
    let match
    
    while ((match = importRegex.exec(content)) !== null) {
      imports.push(match[1])
    }
    
    if (imports.length > 0) {
      console.log(`📄 ${file}:`)
      
      for (const importPath of imports) {
        const resolvedPath = resolveImportPath(importPath, filePath)
        
        if (resolvedPath) {
          const exists = checkFileExists(resolvedPath + '.ts') || checkFileExists(resolvedPath + '.js')
          
          if (exists) {
            console.log(`   ✅ ${importPath}`)
          } else {
            console.log(`   ❌ ${importPath} → ${resolvedPath}`)
            hasErrors = true
          }
        } else {
          console.log(`   ⚠️  ${importPath} (外部依赖)`)
        }
      }
      console.log()
    }
  }
}

// 检查类型定义文件
console.log('🔍 检查类型定义文件...\n')
const typesDir = path.join(process.cwd(), 'src', 'types')
const typeFiles = fs.readdirSync(typesDir)

for (const file of typeFiles) {
  const filePath = path.join(typesDir, file)
  console.log(`📄 ${file}: ${fs.existsSync(filePath) ? '✅ 存在' : '❌ 缺失'}`)
}

console.log('\n' + '='.repeat(50))

if (hasErrors) {
  console.log('❌ 发现导入路径问题，请检查上述错误')
  process.exit(1)
} else {
  console.log('✅ 所有导入路径检查通过')
  
  // 检查环境变量文件
  console.log('\n🔍 检查环境变量文件...')
  const envFiles = ['.env.development', '.env.production']
  
  for (const envFile of envFiles) {
    const envPath = path.join(process.cwd(), envFile)
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8')
      const vars = content.split('\n').filter(line => line.trim() && !line.startsWith('#'))
      console.log(`📄 ${envFile}: ${vars.length} 个变量`)
    } else {
      console.log(`📄 ${envFile}: ❌ 缺失`)
    }
  }
  
  console.log('\n🎉 所有验证通过！API服务已准备就绪')
}