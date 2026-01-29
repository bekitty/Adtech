import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, UserRole } from '@/types'
import { mockUsers } from '@/data/mock'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  selectedRole: UserRole | null
  login: (email: string, password: string) => Promise<boolean>
  loginWithGoogle: () => Promise<boolean>
  logout: () => void
  selectRole: (role: UserRole) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      selectedRole: null,

      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        // For demo, accept any email with password "password"
        if (password === 'password' || password.length >= 6) {
          // Find user or create mock user
          const existingUser = mockUsers.find(u => u.email === email)
          const user: User = existingUser || {
            id: `user-${Date.now()}`,
            email,
            name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
            role: 'advertiser', // Default role, will be selected after login
            createdAt: new Date().toISOString(),
          }

          set({ user, isAuthenticated: true })
          return true
        }
        return false
      },

      loginWithGoogle: async () => {
        // Simulate Google OAuth
        await new Promise((resolve) => setTimeout(resolve, 500))

        const user: User = {
          id: `user-google-${Date.now()}`,
          email: 'demo@gmail.com',
          name: 'Demo User',
          role: 'advertiser',
          createdAt: new Date().toISOString(),
        }

        set({ user, isAuthenticated: true })
        return true
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, selectedRole: null })
      },

      selectRole: (role: UserRole) => {
        set((state) => ({
          selectedRole: role,
          user: state.user ? { ...state.user, role } : null,
        }))
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)
