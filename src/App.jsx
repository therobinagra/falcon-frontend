import { motion } from 'framer-motion'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartProvider'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/layout/Layout'
import ScrollToTop from './components/ui/ScrollToTop'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductPage from './pages/ProductPage'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Checkout from './pages/Checkout'
import TrackOrder from './pages/TrackOrder'
import PrivacyPolicy from './pages/PrivacyPolicy'
import ReturnsPolicy from './pages/ReturnsPolicy'
import ShippingPolicy from './pages/ShippingPolicy'
import TermsConditions from './pages/TermsConditions'
import Profile from './pages/Profile'
import MyOrders from './pages/MyOrders'
import AdminLayout from './admin/AdminLayout'
import AdminLogin from './admin/AdminLogin'
import Dashboard from './admin/Dashboard'
import AdminProducts from './admin/AdminProducts'
import AdminOrders from './admin/AdminOrders'
import AdminUsers from './admin/AdminUsers'
import AdminCategories from './admin/AdminCategories'
import AdminBlogs from './admin/AdminBlogs'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-white font-sans text-ink"
        >
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/track-order" element={<TrackOrder />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/returns-refunds" element={<ReturnsPolicy />} />
                <Route path="/shipping-policy" element={<ShippingPolicy />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />
                <Route path="/my-orders" element={<MyOrders />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="categories" element={<AdminCategories />} />
                <Route path="blogs" element={<AdminBlogs />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </motion.div>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
