/**
 * DHAGO - Shopping Cart Drawer Logic
 */

class CartManager {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem('dhago_cart')) || [];
    this.initElements();
    this.bindEvents();
    this.updateCartUI();
  }

  initElements() {
    this.cartDrawer = document.getElementById('cartDrawer');
    this.cartOverlay = document.getElementById('cartOverlay');
    this.cartToggleBtn = document.getElementById('cartToggleBtn');
    this.closeCartBtn = document.getElementById('closeCartBtn');
    this.cartItemsContainer = document.getElementById('cartItemsContainer');
    this.cartCountBadges = document.querySelectorAll('.cart-count-badge');
    this.cartSubtotalEl = document.getElementById('cartSubtotal');
    this.cartTaxEl = document.getElementById('cartTax');
    this.cartTotalEl = document.getElementById('cartTotal');
    this.checkoutBtn = document.getElementById('checkoutBtn');
    this.checkoutModal = document.getElementById('checkoutModal');
    this.closeCheckoutBtn = document.getElementById('closeCheckoutBtn');
    this.checkoutForm = document.getElementById('checkoutForm');
  }

  bindEvents() {
    if (this.cartToggleBtn) {
      this.cartToggleBtn.addEventListener('click', () => this.openCart());
    }
    if (this.closeCartBtn) {
      this.closeCartBtn.addEventListener('click', () => this.closeCart());
    }
    if (this.cartOverlay) {
      this.cartOverlay.addEventListener('click', () => this.closeCart());
    }
    if (this.checkoutBtn) {
      this.checkoutBtn.addEventListener('click', () => this.openCheckout());
    }
    if (this.closeCheckoutBtn) {
      this.closeCheckoutBtn.addEventListener('click', () => this.closeCheckout());
    }
    if (this.checkoutForm) {
      this.checkoutForm.addEventListener('submit', (e) => this.handleCheckoutSubmit(e));
    }
  }

  saveCart() {
    localStorage.setItem('dhago_cart', JSON.stringify(this.cart));
    this.updateCartUI();
  }

  addItem(productId, selectedSize = 'M', selectedColor = null, quantity = 1) {
    const product = DHAGO_DATA.products.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = this.cart.findIndex(
      item => item.id === productId && item.size === selectedSize && item.color === selectedColor
    );

    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: selectedSize || (product.sizes ? product.sizes[0] : 'M'),
        color: selectedColor || (product.colors ? product.colors[0] : '#1A1A1A'),
        quantity: quantity
      });
    }

    this.saveCart();
    this.showToast(`Added "${product.name}" to bag!`);
    this.openCart();
  }

  removeItem(index) {
    const item = this.cart[index];
    if (item) {
      this.cart.splice(index, 1);
      this.saveCart();
      this.showToast(`Removed "${item.name}" from bag.`);
    }
  }

  updateQuantity(index, change) {
    if (this.cart[index]) {
      this.cart[index].quantity += change;
      if (this.cart[index].quantity <= 0) {
        this.removeItem(index);
      } else {
        this.saveCart();
      }
    }
  }

  openCart() {
    if (this.cartDrawer) this.cartDrawer.classList.add('active');
    if (this.cartOverlay) this.cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeCart() {
    if (this.cartDrawer) this.cartDrawer.classList.remove('active');
    if (this.cartOverlay) this.cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  updateCartUI() {
    const totalCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    this.cartCountBadges.forEach(badge => {
      badge.textContent = totalCount;
      badge.style.display = totalCount > 0 ? 'flex' : 'none';
    });

    if (!this.cartItemsContainer) return;

    if (this.cart.length === 0) {
      this.cartItemsContainer.innerHTML = `
        <div class="empty-cart-state">
          <div class="empty-cart-icon">🛍️</div>
          <h3>Your shopping bag is empty</h3>
          <p>Explore our handcrafted Dhaka & Pashmina collections to get started.</p>
          <button class="btn btn-primary" onclick="cartManager.closeCart(); appManager.navigateTo('shop');">
            Browse Shop
          </button>
        </div>
      `;
      if (this.cartSubtotalEl) this.cartSubtotalEl.textContent = 'Rs. 0';
      if (this.cartTaxEl) this.cartTaxEl.textContent = 'Rs. 0';
      if (this.cartTotalEl) this.cartTotalEl.textContent = 'Rs. 0';
      if (this.checkoutBtn) this.checkoutBtn.disabled = true;
      return;
    }

    if (this.checkoutBtn) this.checkoutBtn.disabled = false;

    let subtotal = 0;
    this.cartItemsContainer.innerHTML = this.cart.map((item, index) => {
      const itemSubtotal = item.price * item.quantity;
      subtotal += itemSubtotal;
      return `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-details">
            <h4 class="cart-item-title">${item.name}</h4>
            <div class="cart-item-meta">
              <span>Size: <strong>${item.size}</strong></span>
              <span class="color-swatch-sm" style="background-color: ${item.color}"></span>
            </div>
            <div class="cart-item-price">Rs. ${item.price.toLocaleString()}</div>
            <div class="cart-item-controls">
              <div class="qty-btn-group">
                <button onclick="cartManager.updateQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="cartManager.updateQuantity(${index}, 1)">+</button>
              </div>
              <button class="cart-remove-btn" onclick="cartManager.removeItem(${index})">Remove</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    const tax = Math.round(subtotal * 0.13); // 13% VAT in Nepal
    const total = subtotal + tax;

    if (this.cartSubtotalEl) this.cartSubtotalEl.textContent = `Rs. ${subtotal.toLocaleString()}`;
    if (this.cartTaxEl) this.cartTaxEl.textContent = `Rs. ${tax.toLocaleString()} (13% VAT)`;
    if (this.cartTotalEl) this.cartTotalEl.textContent = `Rs. ${total.toLocaleString()}`;
  }

  openCheckout() {
    if (this.cart.length === 0) return;
    this.closeCart();
    if (this.checkoutModal) {
      const summaryList = document.getElementById('checkoutSummaryList');
      const checkoutTotal = document.getElementById('checkoutFinalTotal');

      const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const tax = Math.round(subtotal * 0.13);
      const total = subtotal + tax;

      if (summaryList) {
        summaryList.innerHTML = this.cart.map(item => `
          <div class="checkout-summary-row">
            <span>${item.name} (x${item.quantity})</span>
            <strong>Rs. ${(item.price * item.quantity).toLocaleString()}</strong>
          </div>
        `).join('');
      }

      if (checkoutTotal) {
        checkoutTotal.textContent = `Rs. ${total.toLocaleString()}`;
      }

      this.checkoutModal.classList.add('active');
    }
  }

  closeCheckout() {
    if (this.checkoutModal) this.checkoutModal.classList.remove('active');
  }

  handleCheckoutSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('chkName').value;
    const phone = document.getElementById('chkPhone').value;
    const city = document.getElementById('chkCity').value;

    if (!name || !phone || !city) {
      alert('Please complete all required shipping fields.');
      return;
    }

    this.closeCheckout();
    this.cart = [];
    this.saveCart();

    const successModal = document.getElementById('orderSuccessModal');
    if (successModal) {
      document.getElementById('orderCustomerName').textContent = name;
      document.getElementById('orderRefId').textContent = 'DHAGO-' + Math.floor(100000 + Math.random() * 900000);
      successModal.classList.add('active');
    }
  }

  showToast(message) {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>🛍️</span> ${message}`;
    container.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

const cartManager = new CartManager();
