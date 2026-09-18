const emojiMap = [
  { match: /spray|gel/i, icon: '✨' },
  { match: /tablet|dapoxetine|tadalafil|surge/i, icon: '💊' },
  { match: /condom/i, icon: '🛡️' },
  { match: /shilajit/i, icon: '⚡' },
  { match: /pack|combo/i, icon: '🚀' },
  { match: /forever|stamina|capsule|oil|churan/i, icon: '🌿' },
]

export function productIcon(name) {
  const found = emojiMap.find((entry) => entry.match.test(name))
  return found ? found.icon : '🧴'
}

export function formatINR(amount) {
  return `₹${amount.toLocaleString('en-IN')}`
}

export function isOutOfStock(product) {
  if (!product) return false
  if (product.inStock === false) return true
  if (typeof product.stock === 'number' && product.stock <= 0) return true
  return false
}
