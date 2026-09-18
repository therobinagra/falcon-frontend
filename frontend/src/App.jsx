import { lazy, Suspense, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BrowserRouter, Routes, Route, useNavigate, useSearchParams } from 'react-router-dom'
import { CartProvider } from './context/CartProvider'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/layout/Layout'
import ScrollToTop from './components/ui/ScrollToTop'
import Home from './pages/Home'
import { shiprocketApi } from './api'

// Code-split the rest so the initial bundle stays small and loads fast.
const About = lazy(() => import('./pages/About'))
const Products = lazy(() => import('./pages/Products'))
const ProductPage = lazy(() => import('./pages/ProductPage'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogDetail = lazy(() => import('./pages/BlogDetail'))
const Contact = lazy(() => import('./pages/Contact'))
const Login = lazy(() => import('./pages/Login'))
const Checkout = lazy(() => import('./pages/Checkout'))
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'))
const TrackOrder = lazy(() => import('./pages/TrackOrder'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const ReturnsPolicy = lazy(() => import('./pages/ReturnsPolicy'))
const ShippingPolicy = lazy(() => import('./pages/ShippingPolicy'))
const TermsConditions = lazy(() => import('./pages/TermsConditions'))
const Profile = lazy(() => import('./pages/Profile'))
const MyOrders = lazy(() => import('./pages/MyOrders'))
const AdminLayout = lazy(() => import('./admin/AdminLayout'))
const AdminLogin = lazy(() => import('./admin/AdminLogin'))
const Dashboard = lazy(() => import('./admin/Dashboard'))
const AdminProducts = lazy(() => import('./admin/AdminProducts'))
const AdminOrders = lazy(() => import('./admin/AdminOrders'))
const AdminUsers = lazy(() => import('./admin/AdminUsers'))
const AdminCategories = lazy(() => import('./admin/AdminCategories'))
const AdminBlogs = lazy(() => import('./admin/AdminBlogs'))
const AdminLeads = lazy(() => import('./admin/AdminLeads'))

function PageLoader({ children }) {
  return <Suspense fallback={<div className="min-h-[60vh]" />}>{children}</Suspense>
}

// Shiprocket redirects the customer back to `/?order=<id>` after payment.
// Confirm the payment here, then show the order success page.
const ORDER_KEY = 'falcon-order'

function PaymentReturnWatcher() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('order')

  useEffect(() => {
    if (!orderId) return
    let cancelled = false

    const run = async () => {
      try {
        const updated = await shiprocketApi.confirmPayment(orderId)
        if (!cancelled && updated) {
          sessionStorage.setItem(ORDER_KEY, JSON.stringify({ order: updated }))
        }
      } catch {
        // Keep what is already stored (if anything) — the success page retries.
      } finally {
        if (!cancelled) navigate('/order-success', { replace: true })
      }
    }

    run()
    return () => {
      cancelled = true
    }
  }, [orderId, navigate])

  return null
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen bg-white font-sans text-ink"
        >
          <BrowserRouter>
            <ScrollToTop />
            <PaymentReturnWatcher />
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<PageLoader><About /></PageLoader>} />
                <Route path="/products" element={<PageLoader><Products /></PageLoader>} />
                <Route path="/product/:id" element={<PageLoader><ProductPage /></PageLoader>} />
                <Route path="/blog" element={<PageLoader><Blog /></PageLoader>} />
                <Route path="/blog/:id" element={<PageLoader><BlogDetail /></PageLoader>} />
                <Route path="/contact" element={<PageLoader><Contact /></PageLoader>} />
                <Route path="/login" element={<PageLoader><Login /></PageLoader>} />
                <Route path="/checkout" element={<PageLoader><Checkout /></PageLoader>} />
                <Route path="/order-success" element={<PageLoader><OrderSuccess /></PageLoader>} />
                <Route path="/track-order" element={<PageLoader><TrackOrder /></PageLoader>} />
                <Route path="/privacy-policy" element={<PageLoader><PrivacyPolicy /></PageLoader>} />
                <Route path="/returns-refunds" element={<PageLoader><ReturnsPolicy /></PageLoader>} />
                <Route path="/shipping-policy" element={<PageLoader><ShippingPolicy /></PageLoader>} />
                <Route path="/terms-conditions" element={<PageLoader><TermsConditions /></PageLoader>} />
                <Route path="/my-orders" element={<PageLoader><MyOrders /></PageLoader>} />
                <Route path="/profile" element={<PageLoader><Profile /></PageLoader>} />
              </Route>
              <Route path="/admin/login" element={<PageLoader><AdminLogin /></PageLoader>} />
              <Route path="/admin" element={<PageLoader><AdminLayout /></PageLoader>}>
                <Route index element={<Dashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="categories" element={<AdminCategories />} />
                <Route path="blogs" element={<AdminBlogs />} />
                <Route path="leads" element={<AdminLeads />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </motion.div>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
