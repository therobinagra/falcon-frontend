import { motion } from 'framer-motion'
import ShopSection from '../components/products/ShopSection'

function Products() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-surface to-white pb-6 pt-32 sm:pt-36">
        <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-[600px] -translate-x-1/2 rounded-full bg-amber-200/40 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="max-w-2xl text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              All Products
            </h1>
          </motion.div>
        </div>
      </section>

      <ShopSection />
    </>
  )
}

export default Products
