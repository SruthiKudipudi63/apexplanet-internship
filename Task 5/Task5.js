const products = [
  { id: 1, name: "Men's T-Shirt", price: 799, category: "men", img: "men tshirt.jpg_.webp", desc: "Classic cotton t-shirt for men.", rating: 4.5 },
  { id: 2, name: "Women's Kurti", price: 999, category: "women", img: "women kurthi.jpg", desc: "Comfortable printed kurti.", rating: 4.2 },
  { id: 3, name: "Kid's Jacket", price: 699, category: "kids", img: "kida jac.jpg", desc: "Warm and cozy jacket for kids.", rating: 4.7 },
  { id: 4, name: "Men's Jeans", price: 1299, category: "men", img: "mens-jeans.webp", desc: "Stylish denim jeans.", rating: 4.3 },
  { id: 5, name: "Women's Saree", price: 1499, category: "women", img: "women saree.jpg", desc: "Elegant festive saree.", rating: 4.6 },
  { id: 6, name: "Kid's Dress", price: 599, category: "kids", img: "kids dress.jpg", desc: "Cute dress for kids.", rating: 4.4 }
];

let cart = [];

function loadProducts(category = 'all') {
  const sections = {
    men: document.getElementById("men-products"),
    women: document.getElementById("women-products"),
    kids: document.getElementById("kids-products")
  };

  // Clear existing content
  Object.keys(sections).forEach(cat => sections[cat].innerHTML = "");

  const filtered = category === 'all' ? products : products.filter(p => p.category === category);

  filtered.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}" loading="lazy">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <small>⭐ ${product.rating} / 5</small>
      <p style="font-size: 0.85rem; color: #ccc;">${product.desc}</p>
      <label>Size:
        <select>
          <option>S</option>
          <option>M</option>
          <option>L</option>
        </select>
      </label>
      <label>Color:
        <select>
          <option>Black</option>
          <option>Blue</option>
          <option>Red</option>
        </select>
      </label>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
      <button class="wishlist-btn" onclick="addToWishlist('${product.name}')">❤</button>
    `;
    sections[product.category].appendChild(card);
  });
}

function addToCart(id) {
  const item = products.find(p => p.id === id);
  cart.push(item);
  updateCart();
  alert(`${item.name} added to cart!`);
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name} - ₹${item.price}</span>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItems.appendChild(div);
  });

  cartTotal.textContent = `₹${total}`;
  cartCount.textContent = cart.length;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function toggleCart() {
  document.getElementById("cart-panel").classList.toggle("visible");
}

function searchProducts() {
  const keyword = document.getElementById("search").value.toLowerCase();
  
  ["men", "women", "kids"].forEach(cat => {
    const section = document.getElementById(`${cat}-products`);
    section.innerHTML = "";

    products.filter(p => p.category === cat && p.name.toLowerCase().includes(keyword)).forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.img}" alt="${product.name}" loading="lazy">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <small>⭐ ${product.rating} / 5</small>
        <p style="font-size: 0.85rem; color: #ccc;">${product.desc}</p>
        <label>Size:
          <select><option>S</option><option>M</option><option>L</option></select>
        </label>
        <label>Color:
          <select><option>Black</option><option>Blue</option><option>Red</option></select>
        </label>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
        <button class="wishlist-btn" onclick="addToWishlist('${product.name}')">❤</button>
      `;
      section.appendChild(card);
    });
  });
}

function addToWishlist(name) {
  alert(`${name} added to wishlist!`);
}

// Initial Load
loadProducts();
