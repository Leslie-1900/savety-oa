import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 应用全局状态管理
export const useAppStore = create(
  persist(
    (set, get) => ({
      // 用户信息
      user: null,
      setUser: (user) => set({ user }),
      
      // 界面状态
      sidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ 
        sidebarCollapsed: !state.sidebarCollapsed 
      })),
      
      // 主题设置
      theme: 'light',
      setTheme: (theme) => set({ theme }),
      
      // 通知消息
      notifications: [],
      addNotification: (notification) => set((state) => ({
        notifications: [...state.notifications, notification]
      })),
      clearNotifications: () => set({ notifications: [] }),
      
      // 加载状态
      loading: false,
      setLoading: (loading) => set({ loading }),
      
      // 错误信息
      error: null,
      setError: (error) => set({ error }),
      clearError: () => set({ error: null })
    }),
    {
      name: 'app-storage', // localStorage key
      partialize: (state) => ({
        user: state.user,
        theme: state.theme,
        sidebarCollapsed: state.sidebarCollapsed
      })
    }
  )
)

// 用户状态管理
export const useUserStore = create((set) => ({
  profile: null,
  permissions: [],
  
  setProfile: (profile) => set({ profile }),
  setPermissions: (permissions) => set({ permissions }),
  
  hasPermission: (permission) => {
    const state = useUserStore.getState()
    return state.permissions.includes(permission)
  }
}))