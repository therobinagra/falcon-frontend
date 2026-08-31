import { useEffect, useSyncExternalStore } from 'react'
import { products as localProducts } from './data/products'

const API = import.meta.env.VITE_API_URL || 'https://falcon-backend-bty7.onrender.com/api'
const TOKEN_KEY = 'falcon-token'

// Requests timeout quickly instead of hanging (e.g. Render free-tier cold starts).
const TIMEOUT_MS = 8000

// Simple in-memory cache so repeat-independent reads don't refetch the backend.
const cache = new Map()
const listeners = new Set()

// Stable snapshots for useSyncExternalStore — recomputed only on cache changes.
// Without this, getSnapshot returns a new array each call and React errors out.
const derived = new Map()

function clearDerived() {
  derived.clear()
}

function emit() {
  clearDerived()
  listeners.forEach((fn) => fn())
}

// Subscribe to cache changes (e.g. remote data arriving after local-first render).
export function subscribeCache(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || ''
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

export function invalidateCache() {
  cache.clear()
  emit()
}

async function request(path, options = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), options.timeout ?? TIMEOUT_MS)

  const token = getToken()
  const headers = { ...(options.headers || {}) }
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }
  if (token) headers['Authorization'] = `Bearer ${token}`

  try {
    const res = await fetch(`${API}${path}`, {
      ...options,
      headers,
      signal: controller.signal,
    })

    if (!res.ok) {
      let message = `Request failed (${res.status})`
      try {
        const data = await res.json()
        if (data.message) message = data.message
      } catch {
        // ignore
      }
      const error = new Error(message)
      error.status = res.status
      throw error
    }

    return res.status === 204 ? null : res.json()
  } finally {
    clearTimeout(timer)
  }
}

// Fetches a public read into the cache. Resolves with the cached/fallback data
// immediately-ish and refreshes the cache in the background once a slow backend
// finally responds. Never rejects for public reads.
async function softRead(path, fallback) {
  const fromCache = cache.get(path)
  if (fromCache) return fromCache

  request(path)
    .then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        cache.set(path, data)
        emit()
      }
    })
    .catch(() => {})
  return fallback
}

const localCategories = () => [...new Set(localProducts.map((p) => p.category))]

export const getProducts = async (category) => {
  const filtered = (list) =>
    !category || category === 'All Products'
      ? list
      : list.filter((p) => p.category === category)

  const remote = await softRead('/products', null)
  return remote ? filtered(remote) : filtered(localProducts)
}

export const getProduct = async (id) => {
  const locale = localProducts.find((p) => p._id === id)
  const fromRemote = await softRead(`/products/${id}`, null)
  if (fromRemote && fromRemote._id) return fromRemote
  return locale ?? null
}

export const getCategories = async () => {
  const remote = await softRead('/categories', null)
  if (remote && Array.isArray(remote) && remote.length > 0) {
    return remote.map((c) => c.name || c)
  }
  return localCategories()
}

export const getHealth = async () => {
  try {
    return await request('/health')
  } catch {
    return { status: 'ok', offline: true }
  }
}

export const authApi = {
  login: (email, password) => request('/users/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (payload) => request('/users/register', { method: 'POST', body: JSON.stringify(payload) }),
  me: () => request('/users/me'),
  updateMe: (payload) => request('/users/me', { method: 'PUT', body: JSON.stringify(payload) }),
}

export const orderApi = {
  createOrder: (payload) => request('/orders', { method: 'POST', body: JSON.stringify(payload) }),
  getMyOrders: () => request('/orders/my'),
  trackOrder: (id, phone) => {
    const params = new URLSearchParams({ phone })
    if (id) params.set('id', id)
    return request(`/orders/track?${params.toString()}`)
  },
}

export const blogApi = {
  getBlogs: () => softRead('/blogs', []),
  getBlog: (id) => request(`/blogs/${id}`),
  createBlog: (payload) => request('/blogs', { method: 'POST', body: JSON.stringify(payload) }),
  updateBlog: (id, payload) => request(`/blogs/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteBlog: (id) => request(`/blogs/${id}`, { method: 'DELETE' }),
}

export const adminApi = {
  stats: () => request('/admin/stats'),
  getProducts: () => request('/products'),
  createProduct: (payload) => request('/products', { method: 'POST', body: payload }),
  updateProduct: (id, payload) => request(`/products/${id}`, { method: 'PUT', body: payload }),
  deleteProduct: (id) => request(`/products/${id}`, { method: 'DELETE' }),
  getCategories: () => request('/categories'),
  createCategory: (payload) => request('/categories', { method: 'POST', body: JSON.stringify(payload) }),
  updateCategory: (id, payload) => request(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteCategory: (id) => request(`/categories/${id}`, { method: 'DELETE' }),
  getOrders: () => request('/orders'),
  getOrder: (id) => request(`/orders/${id}`),
  updateOrder: (id, payload) => request(`/orders/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteOrder: (id) => request(`/orders/${id}`, { method: 'DELETE' }),
  getUsers: () => request('/users'),
  updateUser: (id, payload) => request(`/users/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteUser: (id) => request(`/users/${id}`, { method: 'DELETE' }),
}

export const leadApi = {
  submit: (payload) => request('/leads', { method: 'POST', body: JSON.stringify(payload) }),
  getAll: () => request('/leads'),
  updateStatus: (id, status) => request(`/leads/${id}`, { method: 'PUT', body: JSON.stringify({ status }) }),
  delete: (id) => request(`/leads/${id}`, { method: 'DELETE' }),
}

// React hook: reads products local-first and re-renders when the remote copy
// arrives. Returns a stable array (cached || local fallback).
export function useCachedList(category) {
  const key = category || 'all'

  const getSnapshot = () => {
    if (derived.has(key)) return derived.get(key)
    const remote = cache.get('/products')
    const list = remote && remote.length ? remote : localProducts
    const result =
      key === 'all'
        ? list
        : list.filter((p) => p.category === category)
    derived.set(key, result)
    return result
  }

  // Fetch remote copy in the background (no-op if already cached).
  useEffect(() => {
    softRead('/products', null)
  }, [])

  return useSyncExternalStore(subscribeCache, getSnapshot, getSnapshot)
}

// React hook: cached blogs, local-first, auto-refresh when remote arrives.
export function useCachedBlogs() {
  const getSnapshot = () => {
    if (derived.has('blogs')) return derived.get('blogs')
    const value = cache.get('/blogs') || []
    derived.set('blogs', value)
    return value
  }

  useEffect(() => {
    softRead('/blogs', [])
  }, [])

  return useSyncExternalStore(subscribeCache, getSnapshot, getSnapshot)
}
