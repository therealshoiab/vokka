// VÖKKA Thai Aqua 100ml EDP - Official Store Logic

// State management
let currentSelectedVariant = 'Single Bottle (100ml)';
let currentSelectedPrice = 600;
let currentPaymentMethod = 'Cash on Delivery (COD)';
const SELLER_WHATSAPP_NUMBER = '919419600518'; // Seller's WhatsApp destination

/**
 * Open Checkout Drawer with selected variant
 */
function openCheckoutDrawer(variantName, price) {
  if (variantName) currentSelectedVariant = variantName;
  if (price) currentSelectedPrice = price;

  const backdrop = document.getElementById('checkout-backdrop');
  const variantTitle = document.getElementById('drawer-variant-title');
  const variantPrice = document.getElementById('drawer-variant-price');
  const btnText = document.getElementById('drawer-btn-text');
  const formContainer = document.getElementById('drawer-form-container');
  const successState = document.getElementById('drawer-success-state');

  if (variantTitle) variantTitle.textContent = currentSelectedVariant;
  if (variantPrice) variantPrice.textContent = `₹${currentSelectedPrice}`;
  if (btnText) btnText.textContent = `Confirm & Send Order via WhatsApp (₹${currentSelectedPrice})`;

  if (formContainer) formContainer.style.display = 'block';
  if (successState) successState.style.display = 'none';

  if (backdrop) {
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Close Checkout Drawer
 */
function closeCheckoutDrawer(e) {
  if (e && e.target && !e.target.classList.contains('drawer-backdrop') && !e.target.classList.contains('drawer-close-btn') && !e.target.closest('.drawer-close-btn')) {
    return;
  }

  const backdrop = document.getElementById('checkout-backdrop');
  if (backdrop) {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/**
 * Select Payment Method
 */
function selectPaymentMethod(element, method) {
  document.querySelectorAll('.pay-radio-card').forEach(card => {
    card.classList.remove('active');
    const radio = card.querySelector('input[type="radio"]');
    if (radio) radio.checked = false;
  });

  element.classList.add('active');
  const radio = element.querySelector('input[type="radio"]');
  if (radio) radio.checked = true;

  currentPaymentMethod = (method === 'COD') ? 'Cash on Delivery (COD)' : 'UPI / Online';

  const btnText = document.getElementById('drawer-btn-text');
  if (btnText) {
    btnText.textContent = `Confirm & Send Order via WhatsApp (₹${currentSelectedPrice})`;
  }
}

/**
 * Process Order & Send Directly to WhatsApp (9419600518)
 */
function processSimulatedOrder(e) {
  e.preventDefault();

  const name = document.getElementById('cust-name')?.value.trim() || '';
  const phone = document.getElementById('cust-phone')?.value.trim() || '';
  const building = document.getElementById('cust-building')?.value.trim() || '';
  const area = document.getElementById('cust-area')?.value.trim() || '';
  const pincode = document.getElementById('cust-pincode')?.value.trim() || '';
  const city = document.getElementById('cust-city')?.value.trim() || '';
  const state = document.getElementById('cust-state')?.value.trim() || '';
  const landmark = document.getElementById('cust-landmark')?.value.trim() || '';

  if (!name || !phone || !building || !area || !pincode || !city || !state) {
    alert('Please fill in all required delivery address fields.');
    return;
  }

  // Generate Tracking ID
  const trackingNum = 'VK-' + Math.floor(10000 + Math.random() * 90000);
  const orderTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  // Format WhatsApp Message directly for seller 9419600518
  const whatsappMsg = 
`*🛍️ NEW ORDER: VÖKKA THAI AQUA 100ML EDP*
---------------------------------------
*Order Tracking ID:* #${trackingNum}
*Package Selected:* ${currentSelectedVariant}
*Amount Payable:* ₹${currentSelectedPrice} (${currentPaymentMethod})
*Order Time:* ${orderTime}

*👤 CUSTOMER DETAILS:*
• *Name:* ${name}
• *Contact Number:* ${phone}

*📍 DELIVERY ADDRESS:*
• *House no. / Building:* ${building}
• *Road / Area / Colony:* ${area}
• *Nearby Famous Place / Landmark:* ${landmark || 'N/A'}
• *City:* ${city}
• *State:* ${state}
• *Pincode:* ${pincode}

---------------------------------------
_Sent automatically from VÖKKA Official Store_`;

  // Encode message for WhatsApp URL
  const encodedMsg = encodeURIComponent(whatsappMsg);
  const whatsappUrl = `https://wa.me/${SELLER_WHATSAPP_NUMBER}?text=${encodedMsg}`;

  // Open WhatsApp in new tab/app to deliver order directly
  window.open(whatsappUrl, '_blank');

  // Update UI Success View
  const formContainer = document.getElementById('drawer-form-container');
  const successState = document.getElementById('drawer-success-state');
  const successName = document.getElementById('success-cust-name');
  const successTrack = document.getElementById('success-track-id');
  const successPrice = document.getElementById('success-total-price');

  if (successName) successName.textContent = name;
  if (successTrack) successTrack.textContent = `#${trackingNum}`;
  if (successPrice) successPrice.textContent = `₹${currentSelectedPrice} (${currentPaymentMethod})`;

  if (formContainer) formContainer.style.display = 'none';
  if (successState) successState.style.display = 'block';
}

/**
 * Sticky Bar Visibility
 */
function initStickyBar() {
  const stickyBar = document.getElementById('sticky-bar');
  const heroSection = document.getElementById('hero-panorama');

  if (!heroSection) return;

  window.addEventListener('scroll', () => {
    const heroRect = heroSection.getBoundingClientRect();
    const isPastHero = heroRect.bottom < 150;

    if (isPastHero) {
      if (stickyBar) stickyBar.classList.add('visible');
    } else {
      if (stickyBar) stickyBar.classList.remove('visible');
    }
  });
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initStickyBar();
});
