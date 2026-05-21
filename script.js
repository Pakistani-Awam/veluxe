// ===== Initialize AOS Animation Library =====
document.addEventListener('DOMContentLoaded', function() {
    // Hide preloader
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.classList.add('hidden');
            setTimeout(() => preloader.remove(), 500);
        }
    }, 1500);

    // Initialize AOS with subtle settings
    AOS.init({
        duration: 600,
        easing: 'ease-out',
        once: true,
        offset: 80
    });
    
    // Initialize all features
    initCart();
    initParticles();
    initBackToTop();
    initSearchFilter();
    initNewsletterForm();
    initGSAPAnimations();
    setupQuickViewListeners();
    setupCardClickListeners();
});

// ===== GSAP ANIMATIONS =====
function initGSAPAnimations() {
    if (typeof gsap === 'undefined') return;
    
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate stat numbers on scroll
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        ScrollTrigger.create({
            trigger: stat,
            start: 'top 80%',
            onEnter: () => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            },
            once: true
        });
    });
    
    // Subtle parallax effect on hero
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        gsap.to(heroBg, {
            yPercent: 15,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }
    
    // Smooth stagger animations for feature cards
    gsap.from('.feature-card', {
        scrollTrigger: {
            trigger: '.features-grid',
            start: 'top 85%'
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
    });
    
    // Car cards entrance animation
    gsap.from('.car-card', {
        scrollTrigger: {
            trigger: '.cars-grid, .cars-collection',
            start: 'top 85%'
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out'
    });
}

// ===== PARTICLES BACKGROUND =====
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position and animation
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.opacity = Math.random() * 0.3 + 0.1;
    particle.style.width = Math.random() * 4 + 2 + 'px';
    particle.style.height = particle.style.width;
    
    container.appendChild(particle);
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    if (!backToTop) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== SEARCH AND FILTER =====
function initSearchFilter() {
    const searchInput = document.getElementById('car-search');
    const searchClear = document.getElementById('search-clear');
    const resultsCount = document.getElementById('results-count');
    const noResults = document.getElementById('no-results');
    const carsGrid = document.getElementById('cars-grid');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', filterCars);
    
    if (searchClear) {
        searchClear.addEventListener('click', () => {
            searchInput.value = '';
            filterCars();
        });
    }
    
    function filterCars() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeFilter = document.querySelector('.filter-btn.active');
        const filterValue = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
        const carCards = document.querySelectorAll('.car-card');
        
        let visibleCount = 0;
        
        carCards.forEach(card => {
            const brand = card.dataset.brand?.toLowerCase() || '';
            const model = card.dataset.model?.toLowerCase() || '';
            const categories = card.getAttribute('data-category')?.toLowerCase() || '';
            
            const matchesSearch = brand.includes(searchTerm) || 
                                  model.includes(searchTerm) || 
                                  categories.includes(searchTerm);
            const matchesFilter = filterValue === 'all' || categories.includes(filterValue);
            
            if (matchesSearch && matchesFilter) {
                card.style.display = 'block';
                card.style.animation = 'fadeUp 0.5s ease forwards';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        if (resultsCount) {
            resultsCount.textContent = visibleCount;
        }
        
        if (noResults) {
            if (visibleCount === 0) {
                noResults.classList.add('visible');
                if (carsGrid) carsGrid.style.display = 'none';
            } else {
                noResults.classList.remove('visible');
                if (carsGrid) carsGrid.style.display = 'grid';
            }
        }
    }
}

function resetFilters() {
    const searchInput = document.getElementById('car-search');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    if (searchInput) searchInput.value = '';
    
    filterBtns.forEach(btn => {
        if (btn.dataset.filter === 'all') {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Show all cards
    const carCards = document.querySelectorAll('.car-card');
    carCards.forEach(card => {
        card.style.display = 'block';
        card.style.animation = 'fadeUp 0.5s ease forwards';
    });
    
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) resultsCount.textContent = carCards.length;
    
    const noResults = document.getElementById('no-results');
    const carsGrid = document.getElementById('cars-grid');
    if (noResults) noResults.classList.remove('visible');
    if (carsGrid) carsGrid.style.display = 'grid';
}

// ===== NEWSLETTER FORM =====
function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        if (email) {
            showNotification('Thank you for subscribing! Check your email for exclusive updates.', 'success');
            this.reset();
        }
    });
}

// ===== SHOPPING CART SYSTEM =====
let cart = JSON.parse(localStorage.getItem('veluxeCart')) || [];

function initCart() {
    updateCartUI();
    setupCartListeners();
    setupBuyNowListeners();
}

function setupCartListeners() {
    // Cart toggle button
    const cartToggle = document.getElementById('cart-toggle');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartClose = document.getElementById('cart-close');
    const cartCheckout = document.getElementById('cart-checkout');
    
    if (cartToggle) {
        cartToggle.addEventListener('click', () => openCart());
    }
    
    if (cartClose) {
        cartClose.addEventListener('click', () => closeCart());
    }
    
    if (cartOverlay) {
        cartOverlay.addEventListener('click', () => closeCart());
    }
    
    if (cartCheckout) {
        cartCheckout.addEventListener('click', () => {
            if (cart.length > 0) {
                closeCart();
                showNotification('Redirecting to checkout...', 'success');
                setTimeout(() => {
                    showNotification('Thank you! Our team will contact you shortly.', 'success');
                    clearCart();
                }, 1500);
            } else {
                showNotification('Your cart is empty!', 'error');
            }
        });
    }
    
    // Add to cart buttons
    const addToCartBtns = document.querySelectorAll('.btn-add-cart');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const carCard = this.closest('.car-card');
            addToCart(carCard, this);
        });
    });
}

function setupBuyNowListeners() {
    const buyNowBtns = document.querySelectorAll('.btn-buy-now');
    const buyModal = document.getElementById('buy-modal');
    const modalClose = document.getElementById('modal-close');
    const buyForm = document.getElementById('buy-form');
    
    let currentCarData = null;
    
    buyNowBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const carCard = this.closest('.car-card');
            currentCarData = getCarData(carCard);
            openBuyModal(currentCarData);
        });
    });
    
    if (modalClose) {
        modalClose.addEventListener('click', () => closeBuyModal());
    }
    
    if (buyModal) {
        buyModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeBuyModal();
            }
        });
    }
    
    if (buyForm) {
        buyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            processPurchase(currentCarData);
        });
    }
}

function setupQuickViewListeners() {
    const quickViewBtns = document.querySelectorAll('.car-quick-view');

    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();

            const carCard = this.closest('.car-card');
            if (!carCard) return;

            openCarDetails(carCard);
        });
    });
}

function setupCardClickListeners() {
    // Use delegated listener on document to handle dynamically added cards
    document.addEventListener('click', function(e) {
        const card = e.target.closest('.car-card');
        if (!card) return;

        // Ignore clicks originating from interactive elements
        if (e.target.closest('button, a, .btn, .car-quick-view')) return;

        openCarDetails(card);
    });
}

function getCarData(carCard) {
    return {
        id: carCard.dataset.id,
        brand: carCard.dataset.brand,
        model: carCard.dataset.model,
        price: parseInt(carCard.dataset.price),
        image: carCard.dataset.image,
        year: carCard.dataset.year || '2024',
        engine: carCard.dataset.engine || 'N/A',
        transmission: carCard.dataset.transmission || 'N/A',
        drivetrain: carCard.dataset.drivetrain || 'N/A',
        power: carCard.dataset.power || 'N/A',
        torque: carCard.dataset.torque || 'N/A',
        topspeed: carCard.dataset.topspeed || 'N/A',
        acceleration: carCard.dataset.acceleration || 'N/A',
        fuel: carCard.dataset.fuel || 'N/A',
        weight: carCard.dataset.weight || 'N/A'
    };
}

function addToCart(carCard, btn) {
    const carData = getCarData(carCard);
    
    // Check if already in cart
    const existingItem = cart.find(item => item.id === carData.id);
    if (existingItem) {
        showNotification('This car is already in your cart!', 'error');
        return;
    }
    
    // Add to cart
    cart.push(carData);
    saveCart();
    updateCartUI();
    
    // Button animation
    btn.classList.add('added');
    btn.innerHTML = '<i class="fas fa-check"></i> Added';
    
    setTimeout(() => {
        btn.classList.remove('added');
        btn.innerHTML = '<i class="fas fa-shopping-bag"></i> Add to Cart';
    }, 2000);
    
    // Pulse cart count
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.classList.add('pulse');
        setTimeout(() => cartCount.classList.remove('pulse'), 400);
    }
    
    showNotification(`${carData.brand} ${carData.model} added to cart!`, 'success');
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartUI();
    showNotification('Item removed from cart', 'success');
}

function clearCart() {
    cart = [];
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('veluxeCart', JSON.stringify(cart));
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    // Update count
    if (cartCount) {
        cartCount.textContent = cart.length;
        if (cart.length > 0) {
            cartCount.classList.add('visible');
        } else {
            cartCount.classList.remove('visible');
        }
    }
    
    // Update cart items
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="cart-empty">
                    <i class="fas fa-shopping-bag"></i>
                    <p>Your cart is empty</p>
                    <a href="cars.html" class="btn btn-secondary" style="display: inline-flex;">Browse Cars</a>
                </div>
            `;
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.brand} ${item.model}">
                    </div>
                    <div class="cart-item-details">
                        <span class="cart-item-brand">${item.brand}</span>
                        <h4 class="cart-item-model">${item.model}</h4>
                        <span class="cart-item-price">$${item.price.toLocaleString()}</span>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `).join('');
        }
    }
    
    // Update total
    if (cartTotal) {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotal.textContent = `$${total.toLocaleString()}`;
    }
}

function openCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    
    if (cartSidebar && cartOverlay) {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    
    if (cartSidebar && cartOverlay) {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function openBuyModal(carData) {
    const buyModal = document.getElementById('buy-modal');
    const modalCarInfo = document.getElementById('modal-car-info');
    
    if (modalCarInfo) {
        modalCarInfo.innerHTML = `
            <div class="modal-car-image">
                <img src="${carData.image}" alt="${carData.brand} ${carData.model}">
            </div>
            <div class="modal-car-details">
                <h4>${carData.brand}</h4>
                <h3>${carData.model}</h3>
                <span class="price">$${carData.price.toLocaleString()}</span>
            </div>
        `;
    }
    
    if (buyModal) {
        buyModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeBuyModal() {
    const buyModal = document.getElementById('buy-modal');
    if (buyModal) {
        buyModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function processPurchase(carData) {
    const submitBtn = document.getElementById('modal-submit');
    const modalBody = document.getElementById('modal-body');
    
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    }
    
    // Simulate processing
    setTimeout(() => {
        if (modalBody) {
            modalBody.innerHTML = `
                <div class="success-checkmark">
                    <i class="fas fa-check"></i>
                </div>
                <div class="success-message">
                    <h3>Purchase Initiated!</h3>
                    <p>Thank you for choosing ${carData.brand} ${carData.model}. Our luxury concierge team will contact you within 24 hours to finalize your purchase.</p>
                </div>
            `;
        }
        
        // Reset and close after delay
        setTimeout(() => {
            closeBuyModal();
            setTimeout(() => {
                location.reload();
            }, 300);
        }, 3000);
    }, 2000);
}

// ===== CAR DETAILS MODAL =====
function openCarDetails(carCard) {
    const modal = document.getElementById('car-details-modal');
    const modalTitle = document.getElementById('car-details-title');
    const modalBody = document.getElementById('car-details-body');
    
    if (!modal || !modalBody) return;
    
    const carData = getCarData(carCard);
    
    if (modalTitle) {
        modalTitle.textContent = `${carData.brand} ${carData.model}`;
    }
    
    modalBody.innerHTML = `
        <div class="car-details-grid">
            <div class="car-details-image">
                <img src="${carData.image}" alt="${carData.brand} ${carData.model}">
            </div>
            <div class="car-details-info">
                <span class="car-details-brand">${carData.brand}</span>
                <h2>${carData.model}</h2>
                <div class="car-details-price">$${carData.price.toLocaleString()}</div>
                
                <div class="specs-grid">
                    <div class="spec-item">
                        <span class="spec-item-value">${carData.power} HP</span>
                        <span class="spec-item-label">Horsepower</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-item-value">${carData.torque} lb-ft</span>
                        <span class="spec-item-label">Torque</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-item-value">${carData.topspeed} mph</span>
                        <span class="spec-item-label">Top Speed</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-item-value">${carData.acceleration}s</span>
                        <span class="spec-item-label">0-60 mph</span>
                    </div>
                </div>
                
                <div class="car-details-features">
                    <h4>Specifications</h4>
                    <ul>
                        <li><strong>Year:</strong> ${carData.year}</li>
                        <li><strong>Engine:</strong> ${carData.engine}</li>
                        <li><strong>Transmission:</strong> ${carData.transmission}</li>
                        <li><strong>Drivetrain:</strong> ${carData.drivetrain}</li>
                        <li><strong>Fuel Economy:</strong> ${carData.fuel}</li>
                        <li><strong>Weight:</strong> ${carData.weight} lbs</li>
                    </ul>
                </div>
                
                <div class="car-details-actions">
                    <button class="btn btn-primary" onclick="addToCartFromDetails('${carData.id}')">
                        <i class="fas fa-shopping-bag"></i>
                        Add to Cart
                    </button>
                    <button class="btn btn-secondary" onclick="closeCarDetails(); document.querySelector('.btn-buy-now[data-id=\\'${carData.id}\\']').click();">
                        <i class="fas fa-bolt"></i>
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCarDetails() {
    const modal = document.getElementById('car-details-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function addToCartFromDetails(carId) {
    const carCard = document.querySelector(`.car-card[data-id="${carId}"]`);
    const addBtn = carCard?.querySelector('.btn-add-cart');
    
    if (carCard && addBtn) {
        addToCart(carCard, addBtn);
        closeCarDetails();
    }
}

// Close car details modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('car-details-modal');
    if (e.target === modal) {
        closeCarDetails();
    }
});

// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Mobile Navigation Toggle =====
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (navToggle && navMenu) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// ===== Active Navigation Link Highlighting =====
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

setActiveNavLink();

// ===== Animated Counter for Statistics =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Fallback counter animation if GSAP not available
if (typeof gsap === 'undefined') {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });
}

// ===== Car Filter Functionality =====
const filterButtons = document.querySelectorAll('.filter-btn');
const carCards = document.querySelectorAll('.car-card');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get filter value
        const filterValue = this.getAttribute('data-filter');
        
        // Get search term if exists
        const searchInput = document.getElementById('car-search');
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        
        let visibleCount = 0;
        
        // Filter cards
        carCards.forEach(card => {
            const categories = card.getAttribute('data-category') || '';
            const brand = card.dataset.brand?.toLowerCase() || '';
            const model = card.dataset.model?.toLowerCase() || '';
            
            const matchesFilter = filterValue === 'all' || categories.includes(filterValue);
            const matchesSearch = !searchTerm || 
                                  brand.includes(searchTerm) || 
                                  model.includes(searchTerm) || 
                                  categories.includes(searchTerm);
            
            if (matchesFilter && matchesSearch) {
                card.style.display = 'block';
                card.style.animation = 'fadeUp 0.5s ease forwards';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update results count
        const resultsCount = document.getElementById('results-count');
        if (resultsCount) resultsCount.textContent = visibleCount;
        
        // Show/hide no results message
        const noResults = document.getElementById('no-results');
        const carsGrid = document.getElementById('cars-grid');
        if (noResults) {
            if (visibleCount === 0) {
                noResults.classList.add('visible');
                if (carsGrid) carsGrid.style.display = 'none';
            } else {
                noResults.classList.remove('visible');
                if (carsGrid) carsGrid.style.display = 'grid';
            }
        }
    });
});

// ===== Contact Form Handling (Formspree) =====
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const interest = document.getElementById('interest').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !interest || !message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                showNotification('Thank you for your message! We will be in touch soon.', 'success');
                contactForm.reset();
            } else {
                showNotification('Something went wrong. Please try again.', 'error');
            }
        } catch (error) {
            showNotification('Something went wrong. Please try again.', 'error');
        }
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

// ===== Notification System =====
function showNotification(message, type = 'success') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#1a472a' : '#4a1a1a'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        border-left: 4px solid ${type === 'success' ? '#d4af37' : '#ff4444'};
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ===== Smooth Scroll for Internal Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Parallax Effect for Hero Section (Fallback) =====
if (typeof gsap === 'undefined') {
    const heroSection = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-bg');

    if (heroSection && heroBg) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    }
}

// ===== Reveal Animation on Scroll =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// ===== Image Lazy Loading =====
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => {
    imageObserver.observe(img);
});

// ===== Floating Label Input Effect =====
const formInputs = document.querySelectorAll('.form-input, .form-textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// ===== Add CSS Animations Dynamically =====
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes fadeUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(styleSheet);

// ===== Keyboard Navigation =====
document.addEventListener('keydown', function(e) {
    // Close modals on Escape
    if (e.key === 'Escape') {
        closeCart();
        closeBuyModal();
        closeCarDetails();
        
        // Close mobile menu
        if (navToggle && navMenu) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// ===== Console Signature =====
console.log('%c Veluxe Motors ', 'background: linear-gradient(135deg, #d4af37, #b8962e); color: #0f0f0f; font-size: 24px; font-weight: bold; padding: 15px 30px; border-radius: 8px;');
console.log('%c Experience Automotive Luxury ', 'color: #b3b3b3; font-size: 14px;');
console.log('%c Website enhanced with premium animations ', 'color: #d4af37; font-size: 12px;');
