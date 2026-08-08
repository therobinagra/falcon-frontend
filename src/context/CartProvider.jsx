import { useEffect, useMemo, useState } from 'react'
import { CartContext } from './cartContext'

const STORAGE_KEY = 'falcon-cart'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    } catch {
      return []
    }
  })
  const [isOpen, setIsOpen] = useState(false)
  const [wishlist, setWishlist] = useState([])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    )
  }

  const addItem = (product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item._id === product._id)
      if (existing) {
        return prev.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + qty } : item
        )
      }
      return [...prev, { ...product, qty }]
    })
    setIsOpen(true)
  }

  const removeItem = (id) => setItems((prev) => prev.filter((item) => item._id !== id))

  const updateQty = (id, qty) => {
    setItems((prev) =>
      prev.map((item) => (item._id === id ? { ...item, qty: Math.max(1, qty) } : item))
    )
  }

  const clearCart = () => setItems([])

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.qty, 0), [items])

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items]
  )

  return (
    <CartContext.Provider
      value={{ items, isOpen, setIsOpen, addItem, removeItem, updateQty, clearCart, totalItems, subtotal, wishlist, toggleWishlist }}
    >
      {children}
    </CartContext.Provider>
  )
}
