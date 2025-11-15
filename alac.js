    function formatNaira(amount) {
        return '₦' + amount.toLocaleString('en-NG');
    }

    // Product data with direct Naira prices
    const products = [
        {
                id: 1,
                name: "Itel Star 20000mAh",
                price: 15000,
                oldPrice: 18000,
                image: "https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/22/4608882/1.jpg?7089",
                description: "High-quality sound with noise cancellation",
                category: "electronics",
                rating: 4.5,
                badge: "Sale"
            },
            {
                id: 2,
                name: "Itel Power Tank",
                price: 330000,
                oldPrice: 350000,
                image: "https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/25/9197814/1.jpg?4795",
                description: "Track your fitness and receive notifications",
                category: "electronics",
                rating: 4.3,
                badge: "New"
            },
            {
                id: 3,
                name: "Premium Laptop Backpack",
                price: 7500,
                oldPrice: 10500,
                image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                description: "Durable and water-resistant with multiple compartments",
                category: "fashion",
                rating: 4.7,
                badge: "Popular"
            },
            {
                id: 4,
                name: "Smartphone with Dual Camera",
                price: 900000,
                oldPrice: 1050000,
                image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                description: "Latest model with advanced features",
                category: "electronics",
                rating: 4.8,
                badge: "Hot"
            },
            {
                id: 5,
                name: "Bluetooth Rechargeable Mouse with Led Light",
                price: 6000,
                oldPrice: 7500,
                image: "https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/09/5968804/1.jpg?1944",
                description: "Precision gaming mouse with RGB lighting",
                category: "electronics",
                rating: 4.4,
                badge: "Sale"
            },
            {
                id: 6,
                name: "Zealot S67 Portable 60W Wireless Bluetooth Speaker",
                price: 64000,
                oldPrice: 75000,
                image: "https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/55/1298553/1.jpg?2950",
                description: "360° sound with deep bass and long battery life",
                category: "electronics",
                rating: 4.6,
                badge: "New"
            },
               {
                id: 6,
                name: "Zealot S67 Portable 60W Wireless Bluetooth Speaker",
                price: 64000,
                oldPrice: 75000,
                image: "https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/55/1298553/1.jpg?2950",
                description: "360° sound with deep bass and long battery life",
                category: "electronics",
                rating: 4.6,
                badge: "New"
            }
            
        ];

    // Cart functionality
    let cart = [];
    const cartIcon = document.getElementById('cart-icon');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCart = document.getElementById('close-cart');
    const overlay = document.getElementById('overlay');
    const productsContainer = document.getElementById('products-container');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.querySelector('.cart-count');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const checkoutBtn = document.getElementById('checkout-btn');
    const shopNowBtn = document.getElementById('shop-now-btn');
    const toast = document.getElementById('toast');
    const navLinks = document.querySelectorAll('.nav-link');

    // Display products
    function displayProducts(productsToDisplay = products) {
        productsContainer.innerHTML = '';
        
        if (productsToDisplay.length === 0) {
            productsContainer.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                    <i class="fas fa-search" style="font-size: 64px; color: #cbd5e1; margin-bottom: 20px;"></i>
                    <h3 style="color: #64748b; margin-bottom: 10px;">No products found</h3>
                    <p style="color: #94a3b8;">Try adjusting your search terms or browse other categories</p>
                </div>
            `;
            return;
        }
        
        productsToDisplay.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            // Generate star rating
            const stars = generateStarRating(product.rating);
            
            productCard.innerHTML = `
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-rating">${stars}</div>
                    <p class="product-price">
                        ${formatNaira(product.price)}
                        ${product.oldPrice ? `<span class="old-price">${formatNaira(product.oldPrice)}</span>` : ''}
                    </p>
                    <p class="product-description">${product.description}</p>
                    <button class="add-to-cart" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            `;
            productsContainer.appendChild(productCard);
        });
    }

    // Generate star rating HTML
    function generateStarRating(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    }

    // Search functionality
    function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            displayProducts(products);
            // Remove search results message if it exists
            const existingMessage = document.querySelector('.search-results-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            return;
        }
        
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
        
        displayProducts(filteredProducts);
        
        // Show search results message
        showSearchResultsMessage(filteredProducts.length, searchTerm);
    }

    // Show search results message
    function showSearchResultsMessage(count, searchTerm) {
        // Remove existing message
        const existingMessage = document.querySelector('.search-results-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const message = document.createElement('div');
        message.className = 'search-results-message';
        message.innerHTML = `Found ${count} product${count !== 1 ? 's' : ''} for "${searchTerm}"`;
        
        const sectionTitle = document.querySelector('.section-title');
        sectionTitle.parentNode.insertBefore(message, sectionTitle.nextSibling);
    }

    // Add to cart
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        updateCart();
        showToast(`${product.name} added to cart!`);
    }

    // Remove from cart
    function removeFromCart(productId) {
        const product = cart.find(item => item.id === productId);
        cart = cart.filter(item => item.id !== productId);
        updateCart();
        showToast(`${product.name} removed from cart`);
    }

    // Update quantity
    function updateQuantity(productId, change) {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                removeFromCart(productId);
            } else {
                updateCart();
            }
        }
    }

    // Update cart display
    function updateCart() {
        // Update cart items
        cartItemsContainer.innerHTML = '';
        let total = 0;
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Your cart is empty</h3>
                    <p>Add some products to get started</p>
                </div>
            `;
            checkoutBtn.disabled = true;
            checkoutBtn.style.opacity = '0.6';
            checkoutBtn.style.cursor = 'not-allowed';
        } else {
            checkoutBtn.disabled = false;
            checkoutBtn.style.opacity = '1';
            checkoutBtn.style.cursor = 'pointer';
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.name}</h4>
                        <p class="cart-item-price">${formatNaira(item.price)}</p>
                        <div class="cart-item-actions">
                            <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn increase" data-id="${item.id}">+</button>
                            <button class="remove-item" data-id="${item.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
        }
        
        // Update total - THIS IS THE FIXED LINE
        cartTotal.textContent = formatNaira(total);
        
        // Update cart count
        const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = itemCount;
    }

    // Show toast notification
    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Handle checkout
    function handleCheckout() {
        if (cart.length === 0) {
            showToast('Your cart is empty!');
            return;
        }
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        // THIS IS THE FIXED LINE
        showToast(`Order placed! Total: ${formatNaira(total)}`);
        
        // Clear cart
        cart = [];
        updateCart();
        
        // Close cart sidebar
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
    }

    // Event listeners
    document.addEventListener('DOMContentLoaded', () => {
        displayProducts();
        
        // Search functionality
        searchButton.addEventListener('click', handleSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
        
        // Add to cart buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart') || e.target.parentElement.classList.contains('add-to-cart')) {
                const button = e.target.classList.contains('add-to-cart') ? e.target : e.target.parentElement;
                const productId = parseInt(button.getAttribute('data-id'));
                addToCart(productId);
                
                // Show feedback on button
                const originalText = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i> Added!';
                button.style.background = '#06d6a0';
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.style.background = '';
                }, 1500);
            }
        });
        
        // Cart icon click
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            cartSidebar.classList.add('active');
            overlay.classList.add('active');
        });
        
        // Close cart
        closeCart.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
        
        // Overlay click
        overlay.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
        
        // Cart item actions
        cartItemsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('decrease') || e.target.parentElement.classList.contains('decrease')) {
                const productId = parseInt(e.target.getAttribute('data-id') || e.target.parentElement.getAttribute('data-id'));
                updateQuantity(productId, -1);
            }
            
            if (e.target.classList.contains('increase') || e.target.parentElement.classList.contains('increase')) {
                const productId = parseInt(e.target.getAttribute('data-id') || e.target.parentElement.getAttribute('data-id'));
                updateQuantity(productId, 1);
            }
            
            if (e.target.classList.contains('remove-item') || e.target.parentElement.classList.contains('remove-item')) {
                const productId = parseInt(e.target.getAttribute('data-id') || e.target.parentElement.getAttribute('data-id'));
                removeFromCart(productId);
            }
        });
        
        // Checkout button
        checkoutBtn.addEventListener('click', handleCheckout);
        
        // Shop now button
        shopNowBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Scroll to products section
            document.querySelector('.products').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
        
        // Navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                link.classList.add('active');
                
                // Filter products by category if not Home
                if (link.textContent !== 'Home') {
                    const category = link.textContent.toLowerCase();
                    const filteredProducts = products.filter(product => 
                        product.category.toLowerCase() === category
                    );
                    displayProducts(filteredProducts);
                    showSearchResultsMessage(filteredProducts.length, category);
                } else {
                    displayProducts(products);
                    // Remove search results message if it exists
                    const existingMessage = document.querySelector('.search-results-message');
                    if (existingMessage) {
                        existingMessage.remove();
                    }
                }
            });
        });
        
        // User and wishlist icons
        document.getElementById('user-icon').addEventListener('click', (e) => {
            e.preventDefault();
            showToast('User profile coming soon!');
        });
        
        document.getElementById('wishlist-icon').addEventListener('click', (e) => {
            e.preventDefault();
            showToast('Wishlist feature coming soon!');
        });
    });