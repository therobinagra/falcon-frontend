import HeroSection from '../components/home/HeroSection'
import FeaturedProducts from '../components/products/FeaturedProducts'
import CategoryGrid from '../components/sections/CategoryGrid'
import Stats from '../components/sections/Stats'
import Marquee from '../components/sections/Marquee'
import WhyUs from '../components/sections/WhyUs'
import Testimonials from '../components/sections/Testimonials'
import Articles from '../components/sections/Articles'
import FaqSection from '../components/sections/FaqSection'
import CTABanner from '../components/sections/CTABanner'

function Home() {
  return (
    <>
      <HeroSection />
      <Stats />
      <Marquee />
      <FeaturedProducts />
      <CategoryGrid />
      <Articles />
      <WhyUs />
      <Testimonials />
      <FaqSection />
      <CTABanner />
    </>
  )
}

export default Home
