import './styles/main.css'
import 'flyonui/flyonui'

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    if (window.HSStaticMethods && typeof window.HSStaticMethods.autoInit === 'function') {
      window.HSStaticMethods.autoInit()
    }
  }, 100)
})

