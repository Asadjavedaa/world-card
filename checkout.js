/**
 * checkout.js - Interaction logic for the e-commerce checkout flow
 */

// State Management
let currentQty = 1;
const basePrice = 299.00;
const taxRate = 0.05; // 5%

// Select DOM Elements
const addBtn = document.getElementById('addBtn');
const qtySelector = document.getElementById('qtySelector');
const qtyValue = document.getElementById('qtyValue');
const subtotalEl = document.getElementById('subtotal');
const totalEl = document.getElementById('total');
const confirmBtn = document.getElementById('confirmBtn');
const successOverlay = document.getElementById('successOverlay');

/**
 * Handle Add to Cart Button Click
 * Transforms the button into a quantity selector
 */
addBtn.addEventListener('click', () => {
  addBtn.style.display = 'none';
  qtySelector.classList.add('is-active');
  updateSummary();
});

/**
 * Update Quantity
 * @param {number} delta - Amount to change quantity by
 */
window.updateQty = (delta) => {
  const newQty = currentQty + delta;
  
  if (newQty < 1) {
    // Revert to Add to Cart button if qty falls below 1
    qtySelector.classList.remove('is-active');
    setTimeout(() => {
      addBtn.style.display = 'flex';
    }, 100);
    currentQty = 1;
    qtyValue.innerText = currentQty;
  } else {
    currentQty = newQty;
    qtyValue.innerText = currentQty;
  }
  
  updateSummary();
};

/**
 * Select Payment Method
 * @param {HTMLElement} element - The clicked payment card
 */
window.selectPayment = (element) => {
  // Remove selection from all cards
  document.querySelectorAll('.payment-card').forEach(card => {
    card.classList.remove('is-selected');
    card.querySelector('input').checked = false;
  });
  
  // Add selection to clicked card
  element.classList.add('is-selected');
  element.querySelector('input').checked = true;
};

/**
 * Update Order Summary Totals
 */
function updateSummary() {
  const subtotal = currentQty * basePrice;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;
  
  subtotalEl.innerText = `$${subtotal.toFixed(2)}`;
  totalEl.innerText = `$${total.toFixed(2)}`;
  
  // Update button text to reflect price
  confirmBtn.innerText = `Confirm Order - $${total.toFixed(2)}`;
}

/**
 * Trigger Order Confirmation Success State
 */
confirmBtn.addEventListener('click', () => {
  // Add loading state to button
  confirmBtn.innerText = "Processing...";
  confirmBtn.disabled = true;
  
  // Simulate API call
  setTimeout(() => {
    successOverlay.classList.add('is-active');
    lucide.createIcons(); // Refresh icons inside the overlay
  }, 1500);
});

// Initial Summary Update
updateSummary();
