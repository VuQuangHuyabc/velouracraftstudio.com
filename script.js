// Shopping Cart Management
let cart = JSON.parse(localStorage.getItem('veloura-cart')) || [];

// Product Data
const products = [
    {
        id: 1,
        name: "Elegant Pearl Necklace",
        price: 89.99,
        originalPrice: 129.99,
        image: "Products/1/variant-image-1.jpeg",
        images: [
            "Products/1/variant-image-1.jpeg",
            "Products/1/variant-image-2.jpeg",
            "Products/1/variant-image-3.jpeg",
            "Products/1/variant-image-4.jpeg",
            "Products/1/variant-image-5.jpeg"
        ],
        description: "A beautiful pearl necklace perfect for any occasion.",
        variants: [
            { color: "#FFFFFF", name: "White Pearl" },
            { color: "#FFE4B5", name: "Cream Pearl" },
            { color: "#FFB6C1", name: "Pink Pearl" }
        ],
        badge: "Sale"
    },
    {
        id: 2,
        name: "Crystal Heart Necklace",
        price: 79.99,
        originalPrice: 99.99,
        image: "Products/2/main-image-1.jpeg",
        images: [
            "Products/2/main-image-1.jpeg",
            "Products/2/main-image-2.jpeg",
            "Products/2/main-image-3.jpeg",
            "Products/2/main-image-4.jpeg",
            "Products/2/main-image-5.jpeg"
        ],
        description: "Stunning crystal heart necklace that sparkles with elegance.",
        variants: [
            { color: "#FF1493", name: "Pink Crystal" },
            { color: "#4169E1", name: "Blue Crystal" },
            { color: "#C0C0C0", name: "Silver Crystal" }
        ],
        badge: "Popular"
    },
    {
        id: 3,
        name: "Vintage Gold Chain",
        price: 119.99,
        originalPrice: 159.99,
        image: "Products/3/variant-image-1.jpeg",
        images: [
            "Products/3/variant-image-1.jpeg",
            "Products/3/variant-image-2.jpeg",
            "Products/3/variant-image-3.jpeg",
            "Products/3/variant-image-4.jpeg",
            "Products/3/variant-image-5.jpeg"
        ],
        description: "Classic vintage gold chain necklace.",
        variants: [
            { color: "#FFD700", name: "Gold" },
            { color: "#C0C0C0", name: "Silver" },
            { color: "#B8860B", name: "Rose Gold" }
        ],
        badge: "Limited"
    },
    {
        id: 4,
        name: "Bohemian Beaded Necklace",
        price: 49.99,
        originalPrice: 69.99,
        image: "Products/4/variant-image-1.jpeg",
        images: [
            "Products/4/variant-image-1.jpeg",
            "Products/4/variant-image-2.jpeg",
            "Products/4/variant-image-3.jpeg",
            "Products/4/variant-image-4.jpeg",
            "Products/4/variant-image-5.jpeg"
        ],
        description: "Colorful bohemian style beaded necklace.",
        variants: [
            { color: "#FF6347", name: "Red Beads" },
            { color: "#4169E1", name: "Blue Beads" },
            { color: "#32CD32", name: "Green Beads" }
        ],
        badge: "New"
    },
    {
        id: 5,
        name: "Minimalist Silver Bar",
        price: 59.99,
        originalPrice: 79.99,
        image: "Products/5/main-image-1.jpeg",
        images: [
            "Products/5/main-image-1.jpeg",
            "Products/5/main-image-2.jpeg",
            "Products/5/main-image-3.jpeg",
            "Products/5/main-image-4.jpeg",
            "Products/5/main-image-5.jpeg"
        ],
        description: "Simple and elegant silver bar necklace.",
        variants: [
            { color: "#C0C0C0", name: "Silver" },
            { color: "#FFD700", name: "Gold" },
            { color: "#B8860B", name: "Rose Gold" }
        ],
        badge: "Minimalist"
    },
    {
        id: 6,
        name: "Statement Gemstone Necklace",
        price: 149.99,
        originalPrice: 199.99,
        image: "Products/6/variant-image-1.jpeg",
        images: [
            "Products/6/variant-image-1.jpeg",
            "Products/6/variant-image-2.jpeg",
            "Products/6/variant-image-3.jpeg",
            "Products/6/variant-image-4.jpeg",
            "Products/6/variant-image-5.jpeg"
        ],
        description: "Bold statement necklace with genuine gemstones.",
        variants: [
            { color: "#8B008B", name: "Amethyst" },
            { color: "#008080", name: "Turquoise" },
            { color: "#DC143C", name: "Ruby" }
        ],
        badge: "Luxury"
    }
];

// Initialize cart count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Add to cart function
function addToCart(productId, variant = null, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => 
        item.id === productId && (!variant || item.variant === variant)
    );

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity,
            variant: variant || product.variants[0].name
        });
    }

    localStorage.setItem('veloura-cart', JSON.stringify(cart));
    updateCartCount();
    showToast(`${product.name} added to cart!`);
}

// Remove from cart function
function removeFromCart(productId, variant = null) {
    cart = cart.filter(item => 
        !(item.id === productId && (!variant || item.variant === variant))
    );
    localStorage.setItem('veloura-cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
    showToast('Item removed from cart');
}

// Update quantity function
function updateQuantity(productId, variant, newQuantity) {
    const item = cart.find(item => 
        item.id === productId && item.variant === variant
    );
    
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId, variant);
        } else {
            item.quantity = newQuantity;
            localStorage.setItem('veloura-cart', JSON.stringify(cart));
            updateCartCount();
            renderCart();
        }
    }
}

// Calculate cart total
function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Render cart items
function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-cart-x display-1 text-muted"></i>
                <h3 class="mt-3">Your cart is empty</h3>
                <p class="text-muted">Add some beautiful necklaces to get started!</p>
                <a href="products.html" class="btn btn-primary">Shop Now</a>
            </div>
        `;
        if (cartTotal) cartTotal.textContent = '$0.00';
        return;
    }

    cartContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="row align-items-center">
                <div class="col-md-2">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                </div>
                <div class="col-md-4">
                    <h5>${item.name}</h5>
                    <p class="text-muted mb-1">Variant: ${item.variant}</p>
                    <p class="fw-bold">$${item.price.toFixed(2)}</p>
                </div>
                <div class="col-md-3">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, '${item.variant}', ${item.quantity - 1})">-</button>
                        <span class="mx-2">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, '${item.variant}', ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <div class="col-md-2">
                    <p class="fw-bold mb-0">$${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div class="col-md-1">
                    <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${item.id}, '${item.variant}')">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    if (cartTotal) {
        cartTotal.textContent = `$${calculateTotal().toFixed(2)}`;
    }
}

// Show toast notification
function showToast(message, type = 'success') {
    const toastContainer = document.querySelector('.toast-container') || createToastContainer();
    
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="bi bi-check-circle-fill text-success me-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function createToastContainer() {
    const container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
}

// Load featured products on home page
function loadFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;

    const featuredProducts = products.slice(0, 3);
    
    container.innerHTML = featuredProducts.map(product => `
        <div class="col-md-4">
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">
                        $${product.price.toFixed(2)}
                        ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                    </div>
                    <p class="text-muted">${product.description}</p>
                    <div class="d-grid gap-2">
                        <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                        <a href="product-detail.html?id=${product.id}" class="btn btn-outline-primary">View Details</a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Load all products on products page
function loadAllProducts() {
    const container = document.getElementById('products-container');
    if (!container) return;

    container.innerHTML = products.map(product => `
        <div class="col-md-4 col-lg-3">
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">
                        $${product.price.toFixed(2)}
                        ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                    </div>
                    <p class="text-muted">${product.description}</p>
                    <div class="d-grid gap-2">
                        <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                        <a href="product-detail.html?id=${product.id}" class="btn btn-outline-primary">View Details</a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Load product detail page
function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (!productId) return;
    
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Update page title
    document.title = `${product.name} - Veloura Craft Studio LLC`;

    // Load main image
    const mainImage = document.getElementById('main-image');
    if (mainImage) {
        mainImage.src = product.images[0];
        mainImage.alt = product.name;
    }

    // Load thumbnails
    const thumbnailContainer = document.getElementById('thumbnail-container');
    if (thumbnailContainer) {
        thumbnailContainer.innerHTML = product.images.map((img, index) => `
            <img src="${img}" alt="${product.name} - View ${index + 1}" 
                 class="thumbnail ${index === 0 ? 'active' : ''}" 
                 onclick="changeMainImage('${img}', this)">
        `).join('');
    }

    // Load product info
    const productName = document.getElementById('product-name');
    const productPrice = document.getElementById('product-price');
    const productDescription = document.getElementById('product-description');
    
    if (productName) productName.textContent = product.name;
    if (productPrice) {
        productPrice.innerHTML = `
            $${product.price.toFixed(2)}
            ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
        `;
    }
    if (productDescription) productDescription.textContent = product.description;

    // Load variants
    const variantContainer = document.getElementById('variant-container');
    if (variantContainer && product.variants) {
        variantContainer.innerHTML = product.variants.map(variant => `
            <button class="variant-btn" 
                    style="background-color: ${variant.color}" 
                    title="${variant.name}"
                    onclick="selectVariant('${variant.name}', this)"></button>
        `).join('');
    }

    // Setup add to cart button
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.onclick = () => {
            const selectedVariant = document.querySelector('.variant-btn.active');
            const variantName = selectedVariant ? selectedVariant.title : product.variants[0].name;
            addToCart(productId, variantName);
        };
    }
}

// Change main image
function changeMainImage(imageSrc, thumbnail) {
    const mainImage = document.getElementById('main-image');
    if (mainImage) {
        mainImage.src = imageSrc;
        
        // Update active thumbnail
        document.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.classList.remove('active');
        });
        thumbnail.classList.add('active');
    }
}

// Select variant
function selectVariant(variantName, button) {
    document.querySelectorAll('.variant-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');
}

// Newsletter form submission
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart count
    updateCartCount();

    // Load products based on current page
    if (document.getElementById('featured-products')) {
        loadFeaturedProducts();
    }
    
    if (document.getElementById('products-container')) {
        loadAllProducts();
    }
    
    if (document.getElementById('product-name')) {
        loadProductDetail();
    }
    
    if (document.getElementById('cart-items')) {
        renderCart();
    }

    // Newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            showToast('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }

    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('Your message has been sent successfully!');
            this.reset();
        });
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
