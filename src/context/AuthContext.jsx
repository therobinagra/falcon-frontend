import { createContext, useContext, useEffect, useState } from 'react'
import { authApi, setToken, getToken } from '../api'

const AuthContext = createContext(null)

const STORAGE_KEY = 'falcon-user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null
    } catch {
      return null
    }
  })
  const [loading, setLoading] = useState(Boolean(getToken()))

  useEffect(() => {
    let cancelled = false

    const restore = async () => {
      if (!getToken()) {
        setLoading(false)
        return
      }
      try {
        const me = await authApi.me()
        if (!cancelled) {
          setUser(me)
          localStorage.setItem(STORAGE_KEY, JSON.stringify(me))
        }
      } catch (err) {
        if (!cancelled) {
          const authError = err.status === 401 || err.status === 403
          if (authError) {
            setUser(null)
            localStorage.removeItem(STORAGE_KEY)
            setToken('')
          }
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    restore()
    return () => {
      cancelled = true
    }
  }, [])

  const persistUser = (data) => {
    setUser(data)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }

  const login = async (email, password) => {
    const data = await authApi.login(email, password)
    setToken(data.token)
    persistUser(data)
    return data
  }

  const register = async (payload) => {
    const data = await authApi.register(payload)
    setToken(data.token)
    persistUser(data)
    return data
  }

  const logout = () => {
    setUser(null)
    setToken('')
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, isAdmin: user?.role === 'admin' }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
