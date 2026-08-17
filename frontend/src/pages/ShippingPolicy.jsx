import PolicyPage from '../components/legal/PolicyPage'

const sections = [
  {
    title: 'Delivery in India',
    body: 'Generally, the estimated delivery time is 5-7 working days. This time may vary according to your delivery location.',
  },
  {
    title: 'Delivery via VPP',
    body: 'In case your location is not served by our courier partners, then we will be dispatching your order through Value Payable Post (VPP). In such cases, delivery duration may vary from 7-10 days or more depending on the delivery location.',
  },
  {
    title: 'Note',
    body: 'Delivery timelines are estimates and may be affected by courier availability, remote locations, and unforeseen circumstances. Customers are requested to ensure that correct delivery details are provided at the time of ordering.',
  },
]

function ShippingPolicy() {
  return (
    <PolicyPage
      title="Shipping Policy"
      intro="We deliver our products across India. Here’s everything you need to know about our shipping timelines."
      updated="12 August 2026"
      sections={sections}
    />
  )
}

export default ShippingPolicy
