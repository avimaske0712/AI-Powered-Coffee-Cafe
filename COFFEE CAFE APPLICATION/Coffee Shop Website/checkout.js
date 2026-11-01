/**
 * COFFEE CAFE - PAYMENT CHECKOUT ENGINE
 * Handles cart calculation, delivery option, payment methods,
 * interactive card formatting, promo codes, bean discounts,
 * and integration with the Real-Time Order Tracker.
 */

(function () {
  'use strict';

  // Default demo cart if none was initiated from menu
  const DEFAULT_CART_ITEMS = [
    {
      id: 'hazelnut-coffee',
      name: 'Hazelnut Coffee with Oat Milk',
      price: 159,
      qty: 1,
      image: './images/m4.png'
    },
    {
      id: 'cappuccino-coffee',
      name: 'Artisan Cappuccino Coffee',
      price: 130,
      qty: 1,
      image: './images/m3.png'
    }
  ];

  const CheckoutApp = {
    cart: [],
    deliveryType: 'delivery', // 'delivery' or 'pickup'
    deliveryFee: 40,
    appliedPromo: null,
    beansDiscount: 0,
    selectedPaymentMethod: 'upi',

    init: function () {
      CheckoutApp.loadCart();
      CheckoutApp.prefillUserData();
      CheckoutApp.bindEvents();
      CheckoutApp.render();
    },

    loadCart: function () {
      const stored = localStorage.getItem('cafe_checkout_cart');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            CheckoutApp.cart = parsed;
            return;
          }
        } catch (e) {
          console.error(e);
        }
      }
      CheckoutApp.cart = JSON.parse(JSON.stringify(DEFAULT_CART_ITEMS));
      CheckoutApp.saveCart();
    },

    saveCart: function () {
      localStorage.setItem('cafe_checkout_cart', JSON.stringify(CheckoutApp.cart));
    },

    prefillUserData: function () {
      const user = window.AuthManager ? window.AuthManager.getCurrentUser() : null;
      if (user) {
        const nameInput = document.getElementById('custName');
        const phoneInput = document.getElementById('custPhone');
        const emailInput = document.getElementById('custEmail');

        if (nameInput && !nameInput.value) nameInput.value = user.name;
        if (phoneInput && !phoneInput.value) phoneInput.value = user.phone || '+91 9876543210';
        if (emailInput && !emailInput.value) emailInput.value = user.email;

        // Loyalty callout
        const callout = document.getElementById('checkoutLoyaltyCallout');
        const userBeans = user.beans || 450;
        if (callout) {
          if (userBeans >= 100) {
            callout.style.display = 'flex';
            document.getElementById('checkoutUserBeansDisplay').textContent = `${userBeans} Beans available`;
          } else {
            callout.style.display = 'none';
          }
        }
      }
    },

    bindEvents: function () {
      // Delivery Type switcher
      const deliveryBtn = document.getElementById('typeDeliveryBtn');
      const pickupBtn = document.getElementById('typePickupBtn');
      const addressBox = document.getElementById('deliveryAddressGroup');

      if (deliveryBtn && pickupBtn) {
        deliveryBtn.addEventListener('click', function () {
          deliveryBtn.classList.add('active');
          pickupBtn.classList.remove('active');
          CheckoutApp.deliveryType = 'delivery';
          if (addressBox) addressBox.style.display = 'block';
          CheckoutApp.render();
        });

        pickupBtn.addEventListener('click', function () {
          pickupBtn.classList.add('active');
          deliveryBtn.classList.remove('active');
          CheckoutApp.deliveryType = 'pickup';
          if (addressBox) addressBox.style.display = 'none';
          CheckoutApp.render();
        });
      }

      // Payment Tabs
      const paymentTabs = document.querySelectorAll('.payment-tab-btn');
      paymentTabs.forEach(tab => {
        tab.addEventListener('click', function () {
          paymentTabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          const method = tab.getAttribute('data-method');
          CheckoutApp.selectedPaymentMethod = method;

          document.querySelectorAll('.payment-panel').forEach(p => p.classList.remove('active'));
          const targetPanel = document.getElementById('panel-' + method);
          if (targetPanel) targetPanel.classList.add('active');
        });
      });

      // Interactive Card Live Formatter
      const cardNumInput = document.getElementById('cardNumInput');
      const cardNameInput = document.getElementById('cardNameInput');
      const cardExpiryInput = document.getElementById('cardExpiryInput');

      if (cardNumInput) {
        cardNumInput.addEventListener('input', function (e) {
          let val = this.value.replace(/\D/g, '').substring(0, 16);
          let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
          this.value = formatted;
          const displayEl = document.getElementById('cardPreviewNum');
          if (displayEl) {
            displayEl.textContent = formatted || '•••• •••• •••• ••••';
          }

          // Brand detection
          const brandIcon = document.getElementById('cardPreviewBrand');
          if (brandIcon) {
            if (val.startsWith('4')) {
              brandIcon.className = 'fa-brands fa-cc-visa card-brand-logo';
            } else if (val.startsWith('5')) {
              brandIcon.className = 'fa-brands fa-cc-mastercard card-brand-logo';
            } else {
              brandIcon.className = 'fa-brands fa-cc-amazon-pay card-brand-logo';
            }
          }
        });
      }

      if (cardNameInput) {
        cardNameInput.addEventListener('input', function () {
          const displayEl = document.getElementById('cardPreviewName');
          if (displayEl) displayEl.textContent = this.value.toUpperCase() || 'YOUR NAME';
        });
      }

      if (cardExpiryInput) {
        cardExpiryInput.addEventListener('input', function () {
          let val = this.value.replace(/\D/g, '').substring(0, 4);
          if (val.length >= 3) {
            val = val.substring(0, 2) + '/' + val.substring(2, 4);
          }
          this.value = val;
          const displayEl = document.getElementById('cardPreviewExpiry');
          if (displayEl) displayEl.textContent = val || 'MM/YY';
        });
      }

      // Promo Code Apply
      const btnApplyPromo = document.getElementById('btnApplyPromo');
      if (btnApplyPromo) {
        btnApplyPromo.addEventListener('click', CheckoutApp.applyPromoCode);
      }

      // Redeem Points at Checkout
      const btnRedeemPoints = document.getElementById('btnRedeemPointsCheckout');
      if (btnRedeemPoints) {
        btnRedeemPoints.addEventListener('click', function () {
          CheckoutApp.beansDiscount = 50; // ₹50 off
          this.disabled = true;
          this.innerHTML = '<i class="fa-solid fa-check"></i> 100 Beans Applied (-₹50)';
          CheckoutApp.render();
        });
      }

      // Complete Checkout Button
      const btnPay = document.getElementById('btnCompletePayment');
      if (btnPay) {
        btnPay.addEventListener('click', CheckoutApp.processPayment);
      }
    },

    applyPromoCode: function () {
      const input = document.getElementById('promoCodeInput');
      if (!input) return;
      const code = input.value.trim().toUpperCase();
      const feedback = document.getElementById('promoFeedback');

      if (!code) return;

      if (code === 'COFFEEAI' || code === 'FIRSTSIP' || code === 'GOLDVIP') {
        CheckoutApp.appliedPromo = {
          code: code,
          discountPct: code === 'COFFEEAI' ? 0.20 : 0.15,
          flatDiscount: code === 'FIRSTSIP' ? 50 : 0
        };
        if (feedback) {
          feedback.style.color = '#27ae60';
          feedback.textContent = `Promo code ${code} applied successfully! ☕🎉`;
          feedback.style.display = 'block';
        }
      } else {
        if (feedback) {
          feedback.style.color = '#c0392b';
          feedback.textContent = 'Invalid promo code. Try "COFFEEAI" or "FIRSTSIP".';
          feedback.style.display = 'block';
        }
        CheckoutApp.appliedPromo = null;
      }

      CheckoutApp.render();
    },

    updateQty: function (index, delta) {
      if (!CheckoutApp.cart[index]) return;
      CheckoutApp.cart[index].qty += delta;
      if (CheckoutApp.cart[index].qty <= 0) {
        CheckoutApp.cart.splice(index, 1);
      }
      CheckoutApp.saveCart();
      CheckoutApp.render();
    },

    removeItem: function (index) {
      if (!CheckoutApp.cart[index]) return;
      CheckoutApp.cart.splice(index, 1);
      CheckoutApp.saveCart();
      CheckoutApp.render();
    },

    calculateTotals: function () {
      let subtotal = 0;
      CheckoutApp.cart.forEach(item => {
        subtotal += item.price * item.qty;
      });

      // Delivery fee is waived if pickup or order > ₹300
      let delivery = (CheckoutApp.deliveryType === 'pickup' || subtotal >= 300 || subtotal === 0) ? 0 : CheckoutApp.deliveryFee;

      // Promo discount
      let promoDiscount = 0;
      if (CheckoutApp.appliedPromo) {
        if (CheckoutApp.appliedPromo.discountPct) {
          promoDiscount = Math.round(subtotal * CheckoutApp.appliedPromo.discountPct);
        } else if (CheckoutApp.appliedPromo.flatDiscount) {
          promoDiscount = CheckoutApp.appliedPromo.flatDiscount;
        }
      }

      // Taxes (GST 5%)
      const taxes = Math.round(subtotal * 0.05);

      // Total
      const total = Math.max(0, subtotal + delivery + taxes - promoDiscount - CheckoutApp.beansDiscount);

      return {
        subtotal: subtotal,
        delivery: delivery,
        promoDiscount: promoDiscount,
        beansDiscount: CheckoutApp.beansDiscount,
        taxes: taxes,
        total: total
      };
    },

    render: function () {
      const listEl = document.getElementById('checkoutCartList');
      if (!listEl) return;

      if (CheckoutApp.cart.length === 0) {
        listEl.innerHTML = `
          <div class="text-center py-4 text-muted">
            <i class="fa-solid fa-mug-hot fa-2x mb-2" style="color: #b2744c;"></i>
            <p>Your coffee cart is empty!</p>
            <a href="index.html#menu" class="btn btn-sm btn-dark">Browse Menu</a>
          </div>
        `;
      } else {
        listEl.innerHTML = CheckoutApp.cart.map((item, idx) => {
          return `
            <div class="cart-item-row">
              <img src="${item.image}" class="cart-item-thumb" alt="${item.name}">
              <div class="cart-item-info">
                <h6 class="cart-item-title">${item.name}</h6>
                <div class="cart-item-price">₹${item.price} each</div>
              </div>
              <div class="cart-qty-controls">
                <button type="button" class="qty-btn" onclick="CheckoutApp.updateQty(${idx}, -1)">-</button>
                <span class="qty-count">${item.qty}</span>
                <button type="button" class="qty-btn" onclick="CheckoutApp.updateQty(${idx}, 1)">+</button>
              </div>
              <button type="button" class="btn-remove-item" onclick="CheckoutApp.removeItem(${idx})" title="Remove">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          `;
        }).join('');
      }

      // Calculations
      const totals = CheckoutApp.calculateTotals();

      document.getElementById('summarySubtotal').textContent = `₹${totals.subtotal}`;
      document.getElementById('summaryDelivery').textContent = totals.delivery === 0 ? 'FREE' : `₹${totals.delivery}`;
      document.getElementById('summaryTaxes').textContent = `₹${totals.taxes}`;
      document.getElementById('summaryTotal').textContent = `₹${totals.total}`;

      const promoRow = document.getElementById('summaryPromoRow');
      if (promoRow) {
        if (totals.promoDiscount > 0) {
          promoRow.style.display = 'flex';
          document.getElementById('summaryPromoVal').textContent = `-₹${totals.promoDiscount}`;
        } else {
          promoRow.style.display = 'none';
        }
      }

      const beansRow = document.getElementById('summaryBeansRow');
      if (beansRow) {
        if (totals.beansDiscount > 0) {
          beansRow.style.display = 'flex';
          document.getElementById('summaryBeansVal').textContent = `-₹${totals.beansDiscount}`;
        } else {
          beansRow.style.display = 'none';
        }
      }

      // Update Pay button text
      const btnPay = document.getElementById('btnCompletePayment');
      if (btnPay) {
        btnPay.innerHTML = `<span>Pay & Confirm Order (₹${totals.total})</span> <i class="fa-solid fa-lock ms-2"></i>`;
        btnPay.disabled = CheckoutApp.cart.length === 0;
      }
    },

    processPayment: function () {
      const totals = CheckoutApp.calculateTotals();
      if (totals.total <= 0 && CheckoutApp.cart.length === 0) return;

      const custName = document.getElementById('custName')?.value || 'Coffee Lover';
      const custPhone = document.getElementById('custPhone')?.value || '+91 9876543210';
      const custAddress = document.getElementById('custAddress')?.value || 'Table 4 / Counter Pickup';

      const btnPay = document.getElementById('btnCompletePayment');
      if (btnPay) {
        btnPay.disabled = true;
        btnPay.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i> Securing Payment & Notifying Barista...';
      }

      setTimeout(() => {
        // Generate new live order
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const orderId = `#CC-${randomNum}`;
        const mainDrink = CheckoutApp.cart[0]?.name || 'Artisan Coffee';
        const itemCount = CheckoutApp.cart.reduce((sum, item) => sum + item.qty, 0);
        const drinkTitle = itemCount > 1 ? `${mainDrink} + ${itemCount - 1} items` : mainDrink;
        const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Save into OrderTracker active order format
        const newOrder = {
          id: orderId,
          drinkName: drinkTitle,
          price: totals.total,
          step: 1, // Order Confirmed & Queued
          etaSeconds: 300,
          baristaName: 'Barista Arjun',
          placedTime: nowStr,
          deliveryAddress: custAddress,
          customerName: custName,
          events: [
            { time: nowStr, text: `Payment of ₹${totals.total} verified via ${CheckoutApp.selectedPaymentMethod.toUpperCase()}. Order ${orderId} queued!` }
          ]
        };

        localStorage.setItem('cafe_active_order', JSON.stringify(newOrder));

        // Award Bean Club points (+50% of total)
        const earnedPoints = Math.round(totals.total * 0.5);
        const currentBeans = parseInt(localStorage.getItem('cafe_loyalty_beans') || '450', 10);
        const finalBeans = currentBeans + earnedPoints - (CheckoutApp.beansDiscount > 0 ? 100 : 0);
        localStorage.setItem('cafe_loyalty_beans', finalBeans);

        // Clear cart
        localStorage.removeItem('cafe_checkout_cart');

        // Populate Success Modal
        document.getElementById('modalSuccessOrderId').textContent = orderId;
        document.getElementById('modalSuccessItem').textContent = drinkTitle;
        document.getElementById('modalSuccessTotal').textContent = `₹${totals.total}`;
        document.getElementById('modalSuccessBeans').textContent = `+${earnedPoints} Beans Earned! ☕`;

        // Show Modal
        const modalEl = document.getElementById('checkoutSuccessModal');
        if (modalEl && window.bootstrap) {
          const modal = new bootstrap.Modal(modalEl, { backdrop: 'static' });
          modal.show();
        }

      }, 1200);
    }
  };

  window.CheckoutApp = CheckoutApp;

  document.addEventListener('DOMContentLoaded', function () {
    CheckoutApp.init();
  });

})();

