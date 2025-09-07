const products = [
  { name: "iPhone 13", category: "smartphone", price: 60000, rating: 4.7, img: "iphone13.jpg" },
  { name: "Samsung Galaxy S21", category: "smartphone", price: 50000, rating: 4.5, img: "galaxyS21.jpg" },
  { name: "Dell XPS 13", category: "laptop", price: 90000, rating: 4.8, img: "dellxps13.webp" },
  { name: "MacBook Air", category: "laptop", price: 85000, rating: 4.9, img: "macbookair.jpeg" },
  { name: "Wireless Mouse", category: "accessory", price: 1200, rating: 4.3, img: "mouse.jpeg" },
  { name: "Bluetooth Headphones", category: "accessory", price: 3500, rating: 4.6, img: "headphones.jpeg" },
  { name: "USB-C Hub", category: "accessory", price: 2500, rating: 4.1, img: "usbc-hub.jpeg" }
];

const productGrid = document.getElementById("productGrid");
const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");
const sortOptions = document.getElementById("sortOptions");

function renderProducts(list) {
  productGrid.innerHTML = "";
  if (list.length === 0) {
    productGrid.innerHTML = "<p>No products found</p>";
    return;
  }
  list.forEach(p => {
    const product = document.createElement("div");
    product.classList.add("product");
    product.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <div class="product-details">
        <h4>${p.name}</h4>
        <p class="price">₹${p.price}</p>
        <p class="rating">⭐ ${p.rating}</p>
      </div>
    `;
    productGrid.appendChild(product);
  });
}

function applyFilters() {
  let filtered = [...products];

  const category = categoryFilter.value;
  if (category !== "all") {
    filtered = filtered.filter(p => p.category === category);
  }

  const price = priceFilter.value;
  if (price !== "all") {
    const [min, max] = price.split("-").map(Number);
    filtered = filtered.filter(p => {
      if (max) return p.price >= min && p.price <= max;
      return p.price < min;
    });
  }

  const sortValue = sortOptions.value;
  if (sortValue === "priceLow") filtered.sort((a, b) => a.price - b.price);
  if (sortValue === "priceHigh") filtered.sort((a, b) => b.price - a.price);
  if (sortValue === "rating") filtered.sort((a, b) => b.rating - a.rating);

  renderProducts(filtered);
}

categoryFilter.addEventListener("change", applyFilters);
priceFilter.addEventListener("change", applyFilters);
sortOptions.addEventListener("change", applyFilters);

renderProducts(products);