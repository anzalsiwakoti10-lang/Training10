/**
 * DHAGO - Quick View Modal & UI Helpers
 */

class ModalManager {
  constructor() {
    this.quickViewModal = document.getElementById('quickViewModal');
    this.closeQuickViewBtn = document.getElementById('closeQuickViewBtn');
    this.selectedSize = 'M';
    this.selectedColor = null;
    this.bindEvents();
  }

  bindEvents() {
    if (this.closeQuickViewBtn) {
      this.closeQuickViewBtn.addEventListener('click', () => this.closeQuickView());
    }
    if (this.quickViewModal) {
      this.quickViewModal.addEventListener('click', (e) => {
        if (e.target === this.quickViewModal) this.closeQuickView();
      });
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeQuickView();
        const successModal = document.getElementById('orderSuccessModal');
        if (successModal) successModal.classList.remove('active');
      }
    });
  }

  openQuickView(productId) {
    const product = DHAGO_DATA.products.find(p => p.id === productId);
    if (!product) return;

    this.selectedSize = product.sizes ? product.sizes[0] : 'M';
    this.selectedColor = product.colors ? product.colors[0] : null;

    const modalBody = document.getElementById('quickViewContent');
    if (!modalBody) return;

    modalBody.innerHTML = `
      <div class="qv-grid">
        <div class="qv-gallery">
          <img src="${product.image}" alt="${product.name}" class="qv-main-img" id="qvMainImg">
          <div class="qv-badges">
            ${product.isNew ? '<span class="badge badge-new">New</span>' : ''}
            ${product.isBestSeller ? '<span class="badge badge-hot">Best Seller</span>' : ''}
          </div>
        </div>

        <div class="qv-info">
          <div class="qv-category">${product.category}</div>
          <h2 class="qv-title">${product.name}</h2>
          
          <div class="qv-rating">
            <span class="stars">★★★★★</span>
            <span>${product.rating} (${product.reviewsCount} verified reviews)</span>
          </div>

          <div class="qv-price-row">
            <span class="qv-price">Rs. ${product.price.toLocaleString()}</span>
            ${product.originalPrice ? `<span class="qv-orig-price">Rs. ${product.originalPrice.toLocaleString()}</span>` : ''}
            ${product.originalPrice ? `<span class="qv-discount">${Math.round((1 - product.price / product.originalPrice) * 100)}% OFF</span>` : ''}
          </div>

          <p class="qv-description">${product.description}</p>

          <div class="qv-meta-details">
            <p><strong>Fabric:</strong> ${product.fabric}</p>
            <p><strong>Care Instructions:</strong> ${product.care}</p>
          </div>

          <div class="qv-options">
            <div class="qv-option-group">
              <label>Select Size:</label>
              <div class="size-selector">
                ${product.sizes.map(size => `
                  <button class="size-btn ${size === this.selectedSize ? 'active' : ''}" 
                          onclick="modalManager.selectSize('${size}', this)">
                    ${size}
                  </button>
                `).join('')}
              </div>
            </div>

            ${product.colors ? `
              <div class="qv-option-group">
                <label>Select Color Palette:</label>
                <div class="color-selector">
                  ${product.colors.map(color => `
                    <button class="color-btn ${color === this.selectedColor ? 'active' : ''}" 
                            style="background-color: ${color}"
                            onclick="modalManager.selectColor('${color}', this)"
                            title="${color}">
                    </button>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </div>

          <div class="qv-actions">
            <div class="qty-btn-group lg">
              <button onclick="modalManager.adjustQty(-1)">-</button>
              <span id="qvQtyVal">1</span>
              <button onclick="modalManager.adjustQty(1)">+</button>
            </div>

            <button class="btn btn-primary btn-block" onclick="modalManager.addToCartFromQV('${product.id}')">
              <span>🛍️</span> Add to Bag
            </button>
          </div>

          <div class="qv-guarantees">
            <div>🚀 Free Shipping across Nepal for orders over Rs. 5,000</div>
            <div>🔄 Easy 7-day Exchange Policy</div>
            <div>🇳🇵 100% Handcrafted by Artisans in Nepal</div>
          </div>
        </div>
      </div>
    `;

    if (this.quickViewModal) {
      this.quickViewModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  closeQuickView() {
    if (this.quickViewModal) {
      this.quickViewModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  selectSize(size, btnElement) {
    this.selectedSize = size;
    const buttons = btnElement.parentElement.querySelectorAll('.size-btn');
    buttons.forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');
  }

  selectColor(color, btnElement) {
    this.selectedColor = color;
    const buttons = btnElement.parentElement.querySelectorAll('.color-btn');
    buttons.forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');
  }

  adjustQty(change) {
    const qtyEl = document.getElementById('qvQtyVal');
    if (qtyEl) {
      let current = parseInt(qtyEl.textContent) || 1;
      current += change;
      if (current < 1) current = 1;
      qtyEl.textContent = current;
    }
  }

  addToCartFromQV(productId) {
    const qtyEl = document.getElementById('qvQtyVal');
    const qty = qtyEl ? parseInt(qtyEl.textContent) : 1;
    cartManager.addItem(productId, this.selectedSize, this.selectedColor, qty);
    this.closeQuickView();
  }
}

const modalManager = new ModalManager();
