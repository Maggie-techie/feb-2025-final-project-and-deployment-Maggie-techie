// Cart functionality
let cart = [];

// Load cart from localStorage
function loadCart() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartDisplay();
  }
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
}

// Add item to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    saveCart();
  }
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
}

// Update cart display
function updateCartDisplay() {
  const cartItems = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');
  
  // Update cart count
  cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
  
  // Update cart items
  if (cartItems) {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div>
          <h4>${item.name}</h4>
          <p>$${item.price} x ${item.quantity}</p>
        </div>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `).join('');
  }
  
  // Update total
  if (cartTotal) {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
  }
}

// Toggle cart sidebar
function toggleCart() {
  const cartSidebar = document.getElementById('cart-sidebar');
  cartSidebar.classList.toggle('open');
}

// Display products
function displayProducts(productList, containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = productList.map(product => `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `).join('');
  }
}

// Filter products by category
function filterProducts() {
  const category = document.getElementById('category-filter').value;
  const filteredProducts = category === 'all' 
    ? products 
    : products.filter(product => product.category === category);
  displayProducts(filteredProducts, 'all-products');
}

// Initialize page
function initializePage() {
  loadCart();
  
  // Display featured products on home page
  const featuredProducts = products.filter(product => product.featured);
  displayProducts(featuredProducts, 'featured-products');
  
  // Display all products on products page
  displayProducts(products, 'all-products');
}

// Checkout function
function checkout() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  
  alert('Thank you for your purchase!');
  cart = [];
  saveCart();
  toggleCart();
}

// Handle contact form submission
function handleSubmit(event) {
  event.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  // In a real application, you would send this data to a server
  alert(`Thank you for your message, ${name}! We'll get back to you soon.`);
  
  // Clear the form
  event.target.reset();
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializePage);