/**
 * DHAGO - Main Web Application Script
 * Routing, Product Filtering, Interactive Controls & Contact Validation
 */

class AppManager {
  constructor() {
    this.currentCategory = 'All';
    this.currentCollection = 'All';
    this.maxPrice = 15000;
    this.searchQuery = '';
    this.sortBy = 'featured';

    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupFilters();
    this.setupContactForm();
    this.setupFAQ();
    this.renderHome();
    this.renderShop();
    this.renderCollections();

    // Check URL hash for direct routing if any
    const hash = window.location.hash.replace('#', '');
    if (['home', 'shop', 'collection', 'about', 'contact'].includes(hash)) {
      this.navigateTo(hash);
    } else {
      this.navigateTo('home');
    }
  }

  setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.getAttribute('data-page');
        if (page) {
          this.navigateTo(page);
          // close mobile nav if open
          const mobileMenu = document.getElementById('mobileNav');
          if (mobileMenu) mobileMenu.classList.remove('active');
        }
      });
    });

    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener('click', () => {
        const mobileMenu = document.getElementById('mobileNav');
        if (mobileMenu) mobileMenu.classList.toggle('active');
      });
    }
  }

  navigateTo(pageId) {
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(sec => sec.classList.remove('active'));

    const targetSection = document.getElementById(`page-${pageId}`);
    if (targetSection) {
      targetSection.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      if (link.getAttribute('data-page') === pageId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    window.location.hash = pageId;
  }

  setupFilters() {
    // Search inputs (Header search & shop page search)
    const shopSearchInput = document.getElementById('shopSearchInput');
    if (shopSearchInput) {
      shopSearchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderShop();
      });
    }

    // Category Buttons
    const categoryBtnsContainer = document.getElementById('categoryFilters');
    if (categoryBtnsContainer) {
      const categories = ['All', 'Outerwear', 'Knitwear', 'Streetwear', 'Accessories', 'Shirts', 'Bottoms'];
      categoryBtnsContainer.innerHTML = categories.map(cat => `
        <button class="filter-pill ${cat === this.currentCategory ? 'active' : ''}" 
                onclick="appManager.setCategory('${cat}', this)">
          ${cat}
        </button>
      `).join('');
    }

    // Price Range Slider
    const priceSlider = document.getElementById('priceRangeSlider');
    const priceValueDisplay = document.getElementById('priceRangeVal');
    if (priceSlider && priceValueDisplay) {
      priceSlider.addEventListener('input', (e) => {
        this.maxPrice = parseInt(e.target.value);
        priceValueDisplay.textContent = `Rs. ${this.maxPrice.toLocaleString()}`;
        this.renderShop();
      });
    }

    // Sort Dropdown
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.sortBy = e.target.value;
        this.renderShop();
      });
    }

    // Clear Filters
    const clearBtn = document.getElementById('clearFiltersBtn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        this.currentCategory = 'All';
        this.currentCollection = 'All';
        this.maxPrice = 15000;
        this.searchQuery = '';
        this.sortBy = 'featured';

        if (shopSearchInput) shopSearchInput.value = '';
        if (priceSlider) priceSlider.value = 15000;
        if (priceValueDisplay) priceValueDisplay.textContent = 'Rs. 15,000';
        if (sortSelect) sortSelect.value = 'featured';

        const pills = document.querySelectorAll('.filter-pill');
        pills.forEach(p => p.classList.remove('active'));
        if (pills[0]) pills[0].classList.add('active');

        this.renderShop();
      });
    }
  }

  setCategory(category, btnElement) {
    this.currentCategory = category;
    const pills = document.querySelectorAll('.filter-pill');
    pills.forEach(p => p.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');
    this.renderShop();
  }

  filterByCollection(collectionId) {
    this.currentCollection = collectionId;
    this.navigateTo('shop');
    this.renderShop();
  }

  getFilteredProducts() {
    return DHAGO_DATA.products.filter(p => {
      const matchesCategory = (this.currentCategory === 'All') || (p.category === this.currentCategory);
      const matchesCollection = (this.currentCollection === 'All') || (p.collectionId === this.currentCollection);
      const matchesPrice = p.price <= this.maxPrice;
      const matchesSearch = !this.searchQuery ||
        p.name.toLowerCase().includes(this.searchQuery) ||
        p.category.toLowerCase().includes(this.searchQuery) ||
        p.description.toLowerCase().includes(this.searchQuery);

      return matchesCategory && matchesCollection && matchesPrice && matchesSearch;
    }).sort((a, b) => {
      if (this.sortBy === 'price-low') return a.price - b.price;
      if (this.sortBy === 'price-high') return b.price - a.price;
      if (this.sortBy === 'rating') return b.rating - a.rating;
      return 0; // default featured order
    });
  }

  renderHome() {
    // Featured grid on home section
    const featuredContainer = document.getElementById('homeFeaturedProducts');
    if (!featuredContainer) return;

    const featuredList = DHAGO_DATA.products.slice(0, 4);
    featuredContainer.innerHTML = featuredList.map(p => this.createProductCardHTML(p)).join('');

    // Featured collections preview
    const homeCollectionsContainer = document.getElementById('homeCollectionsGrid');
    if (homeCollectionsContainer) {
      homeCollectionsContainer.innerHTML = DHAGO_DATA.collections.map(c => `
        <div class="collection-card" onclick="appManager.filterByCollection('${c.id}')">
          <img src="${c.image}" alt="${c.title}" class="collection-card-img">
          <div class="collection-card-overlay">
            <span class="badge badge-primary">${c.badge}</span>
            <h3 class="collection-card-title">${c.title}</h3>
            <p class="collection-card-sub">${c.subtitle}</p>
            <button class="btn btn-outline-light btn-sm">Explore Collection →</button>
          </div>
        </div>
      `).join('');
    }
  }

  renderShop() {
    const shopContainer = document.getElementById('shopProductsGrid');
    const resultsCountEl = document.getElementById('shopResultsCount');
    if (!shopContainer) return;

    const products = this.getFilteredProducts();

    if (resultsCountEl) {
      resultsCountEl.textContent = `Showing ${products.length} item${products.length !== 1 ? 's' : ''}`;
    }

    if (products.length === 0) {
      shopContainer.innerHTML = `
        <div class="no-results-state">
          <div class="no-results-icon">🔍</div>
          <h3>No matching items found</h3>
          <p>Try adjusting your search criteria or price range.</p>
          <button class="btn btn-primary" onclick="document.getElementById('clearFiltersBtn').click()">Reset Filters</button>
        </div>
      `;
      return;
    }

    shopContainer.innerHTML = products.map(p => this.createProductCardHTML(p)).join('');
  }

  renderCollections() {
    const collectionPageGrid = document.getElementById('collectionPageGrid');
    if (!collectionPageGrid) return;

    collectionPageGrid.innerHTML = DHAGO_DATA.collections.map(c => {
      const itemsInCol = DHAGO_DATA.products.filter(p => p.collectionId === c.id);
      return `
        <div class="collection-full-banner">
          <div class="col-banner-content">
            <span class="badge badge-gold">${c.badge}</span>
            <h2>${c.title}</h2>
            <p class="col-subtitle">${c.subtitle}</p>
            <p class="col-desc">${c.description}</p>
            <button class="btn btn-primary" onclick="appManager.filterByCollection('${c.id}')">
              Shop ${c.title} (${itemsInCol.length} Items) →
            </button>
          </div>
          <div class="col-banner-media">
            <img src="${c.image}" alt="${c.title}">
          </div>
        </div>
      `;
    }).join('');
  }

  createProductCardHTML(p) {
    return `
      <div class="product-card">
        <div class="product-img-wrapper">
          <img src="${p.image}" alt="${p.name}" class="product-img" loading="lazy">
          <div class="product-badges">
            ${p.isNew ? '<span class="badge badge-new">New</span>' : ''}
            ${p.isBestSeller ? '<span class="badge badge-hot">Best Seller</span>' : ''}
          </div>
          <div class="product-overlay-actions">
            <button class="action-btn" onclick="modalManager.openQuickView('${p.id}')" title="Quick View">
              👁️ Quick View
            </button>
            <button class="action-btn primary" onclick="cartManager.addItem('${p.id}')" title="Add to Cart">
              🛍️ Add to Bag
            </button>
          </div>
        </div>

        <div class="product-info">
          <div class="product-meta">
            <span class="product-category">${p.category}</span>
            <span class="product-rating">★ ${p.rating}</span>
          </div>

          <h3 class="product-name" onclick="modalManager.openQuickView('${p.id}')">${p.name}</h3>

          <div class="product-price-row">
            <span class="price-current">Rs. ${p.price.toLocaleString()}</span>
            ${p.originalPrice ? `<span class="price-original">Rs. ${p.originalPrice.toLocaleString()}</span>` : ''}
          </div>

          <div class="product-color-dots">
            ${p.colors ? p.colors.map(c => `<span class="color-dot" style="background-color: ${c}"></span>`).join('') : ''}
          </div>
        </div>
      </div>
    `;
  }

  setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cntName').value.trim();
      const email = document.getElementById('cntEmail').value.trim();
      const message = document.getElementById('cntMessage').value.trim();

      if (!name || !email || !message) {
        alert('Please fill out all fields.');
        return;
      }

      const responseEl = document.getElementById('contactResponse');
      if (responseEl) {
        responseEl.innerHTML = `
          <div class="alert alert-success">
            <strong>Dhanyabad ${name}!</strong> Your inquiry has been sent to our Kathmandu team. We will get back to you within 24 hours at <strong>${email}</strong>.
          </div>
        `;
        responseEl.scrollIntoView({ behavior: 'smooth' });
      }

      contactForm.reset();
    });
  }

  setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const header = item.querySelector('.faq-question');
      if (header) {
        header.addEventListener('click', () => {
          const isOpen = item.classList.contains('active');
          faqItems.forEach(i => i.classList.remove('active'));
          if (!isOpen) item.classList.add('active');
        });
      }
    });
  }
}

let appManager;
document.addEventListener('DOMContentLoaded', () => {
  appManager = new AppManager();
});
