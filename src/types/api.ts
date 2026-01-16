// API响应契约
export interface APIResponse<T> {
  code: number          // 状态码：200=成功，400=参数错误，401=未授权，500=服务器错误
  message: string       // 返回消息
  data: T               // 业务数据
  timestamp: string     // 响应时间戳（ISO格式）
}

// 分页参数标准
export interface PaginationParams {
  page: number          // 页码，从1开始
  page_size: number     // 每页数量，默认10
  [key: string]: any    // 其他查询参数
}

// 分页响应标准
export interface PaginationResponse<T> {
  total: number         // 总记录数
  page: number          // 当前页码
  page_size: number     // 每页数量
  list: T[]             // 数据列表
}

// 错误码类型
export type ErrorCode = 200 | 400 | 401 | 403 | 404 | 500