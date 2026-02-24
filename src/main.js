import './styles/main.css'
import 'flyonui/flyonui'

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    if (window.HSStaticMethods && typeof window.HSStaticMethods.autoInit === 'function') {
      window.HSStaticMethods.autoInit()
    }
  }, 100)
})

// Global state for store selection
let selectedStore = null;

// Copy coupon code to clipboard
window.copyCouponCode = function(code, button) {
  navigator.clipboard.writeText(code).then(() => {
    // Get the icons
    const copyIcon = button.querySelector('.copy-icon');
    const checkIcon = button.querySelector('.check-icon');
    
    // Toggle icons
    copyIcon.classList.add('hidden');
    checkIcon.classList.remove('hidden');
    
    // Add bounce animation to button
    button.classList.add('animate-bounce-in');
    
    // Reset after 2 seconds
    setTimeout(() => {
      copyIcon.classList.remove('hidden');
      checkIcon.classList.add('hidden');
      button.classList.remove('animate-bounce-in');
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy code:', err);
    alert('فشل نسخ الكود. حاول مرة أخرى.');
  });
};

// Select store (Salla or Zid)
window.selectStore = function(store) {
  selectedStore = store;
  
  const sallaBtn = document.getElementById('salla-btn');
  const zidBtn = document.getElementById('zid-btn');
  const useCodeBtn = document.getElementById('use-code-btn');
  
  // Reset both buttons to default state
  [sallaBtn, zidBtn].forEach(btn => {
    btn.classList.remove('bg-[#004956]', 'bg-[#1C0531]', 'text-white', 'border-[#004956]', 'border-[#1C0531]');
    btn.classList.add('bg-white', 'border-[#e5e5e5]', 'text-[#C3C9CA]');
  });
  
  // Highlight selected store with specific background color
  if (store === 'salla') {
    sallaBtn.classList.remove('bg-white', 'border-[#e5e5e5]', 'text-[#C3C9CA]');
    sallaBtn.classList.add('bg-[#004956]', 'text-white', 'border-[#004956]');
  } else if (store === 'zid') {
    zidBtn.classList.remove('bg-white', 'border-[#e5e5e5]', 'text-[#C3C9CA]');
    zidBtn.classList.add('bg-[#1C0531]', 'text-white', 'border-[#1C0531]');
  }
  
  // Enable the use code button
  useCodeBtn.disabled = false;
  useCodeBtn.classList.add('animate-pulse-subtle');
  setTimeout(() => {
    useCodeBtn.classList.remove('animate-pulse-subtle');
  }, 500);
};

// Redirect to selected store
window.redirectToStore = function() {
  if (!selectedStore) {
    alert('الرجاء اختيار المتجر أولاً');
    return;
  }
  
  const urls = {
    salla: 'https://apps.salla.sa/ar/app/240202805',
    zid: 'https://apps.zid.sa/application/3542'
  };
  
  const url = urls[selectedStore];
  if (url) {
    window.open(url, '_blank');
  }
};

// Default to the first store on load
document.addEventListener('DOMContentLoaded', () => {
  window.selectStore('salla');
});

