import PolicyPage from '../components/legal/PolicyPage'

const sections = [
  {
    title: 'No Return & No Refund Policy',
    body: 'We value our customers and strive to provide high-quality products and a smooth shopping experience. Before placing an order on our website, customers are requested to carefully review the product description, images, specifications, size, color, quantity, pricing, and other available details. Once an order has been successfully placed and confirmed, it is considered final and cannot be cancelled, exchanged, returned, or refunded.',
  },
  {
    title: 'Orders Are Final',
    body: 'Customers are therefore advised to make their purchase only after carefully checking all information and ensuring that the selected product meets their requirements. Our website follows a strict No Return and No Refund policy, and we do not accept requests for returns or refunds due to a change of mind, personal preference, incorrect selection, dissatisfaction with the product, or any other reason after the order has been confirmed. Shipping, delivery, handling, and other applicable charges are also non-refundable.',
  },
  {
    title: 'Customer Responsibility',
    body: 'Customers are responsible for providing correct delivery details, including name, address, phone number, and other required information. We will not be responsible for delays, failed deliveries, or additional costs caused by incorrect, incomplete, or inaccurate information provided by the customer.',
  },
  {
    title: 'Damaged or Defective Products',
    body: 'In exceptional circumstances, if a product is received damaged, defective, or significantly different from the product ordered, the customer may contact our support team within the specified time period with appropriate photographs, videos, order details, and other required proof. Any replacement or resolution in such exceptional cases will be reviewed and approved solely at our discretion and will be subject to product availability and verification.',
  },
  {
    title: 'Exclusions',
    body: 'Products damaged because of misuse, negligence, improper storage, normal wear and tear, unauthorized modification, or incorrect handling will not qualify for any replacement or compensation. We reserve the right to reject any request that does not satisfy our applicable conditions or verification requirements.',
  },
  {
    title: 'Acceptance & Updates',
    body: 'By placing an order on our website, the customer confirms that they have read, understood, and agreed to these terms and acknowledges that purchases are subject to our No Return and No Refund Policy. We reserve the right to amend, update, or modify this policy at any time without prior notice, and the updated policy will apply to future purchases made through our website.',
  },
]

function ReturnsPolicy() {
  return (
    <PolicyPage
      title="No Return & No Refund Policy"
      intro="We follow a strict No Return and No Refund policy. Please read carefully before placing an order."
      updated="12 August 2026"
      sections={sections}
    />
  )
}

export default ReturnsPolicy
