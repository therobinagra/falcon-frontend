let scriptPromise = null

const candidates = [
  import.meta.env.VITE_FASTRR_SDK_URL,
  'https://checkout.shiprocket.in/api/v1/v2/checkout/sdk.js',
  'https://checkout-ui.shiprocket.com/checkout.js',
].filter(Boolean)

export const hasFastrrSdk = () =>
  typeof window !== 'undefined' && Boolean(window.HeadlessCheckout || window.FastrrCheckout)

export function loadFastrrSdk() {
  if (hasFastrrSdk()) return Promise.resolve()
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise((resolve) => {
    const tryLoad = (index) => {
      if (index >= candidates.length) return resolve(false)

      const script = document.createElement('script')
      script.src = candidates[index]
      script.async = true
      script.onload = () => {
        setTimeout(() => resolve(hasFastrrSdk()), 400)
      }
      script.onerror = () => tryLoad(index + 1)
      document.head.appendChild(script)
    }
    tryLoad(0)
  })

  return scriptPromise
}