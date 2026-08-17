import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import CartDrawer from './CartDrawer'
import SearchModal from '../products/SearchModal'
import { useCart } from '../../context/cartContext'

function Layout() {
  const { addItem } = useCart()
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-ink">
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} onAdd={addItem} />
    </div>
  )
}

export default Layout
