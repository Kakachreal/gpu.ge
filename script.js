const apiKey = 'e27b5acb5e1544c5bbf72758251903'; 
const city = 'Tbilisi'; 
const weatherWidget = document.getElementById('weather-widget');
const locationEl = document.getElementById('weather-location');
const tempEl = document.getElementById('weather-temp');
const descEl = document.getElementById('weather-desc');

function getWeather() {
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=ka`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const weather = data.current.condition;
      const main = data.current.temp_c;

      locationEl.textContent = data.location.name;
      tempEl.textContent = `${main}°C`;
      descEl.textContent = weather.text;

      weatherWidget.classList.remove('hidden');
    })
    .catch(error => {
      console.error("Weather API error:", error);
      locationEl.textContent = "Error fetching weather.";
    });
}

getWeather();

const products = [
  { id: 1, name: "PALIT RTX 5090", price: 3999.99, desc: "The absolute powerhouse. With unmatched performance, the RTX 5090 crushes 4K gaming, creative workloads, and AI tasks without breaking a sweat. Built for those who demand the best.", img: "img/rtx5090.png" },
  { id: 2, name: "PALIT RTX 5080", price: 1400.00, desc: "A performance beast for high-end gaming and rendering. The RTX 5080 delivers incredible speed, ray tracing realism, and future-ready power at a balanced price point.", img: "img/rtx5080.png" },
  { id: 3, name: "GIGABYTE RTX 5070TI", price: 960.99, desc: "Next-gen performance meets efficiency. The RTX 5070 Ti is perfect for 1440p and 4K gaming with ultra settings — smooth, fast, and cool under pressure.", img: "img/rtx5070ti.png" },
  { id: 4, name: "ASUS RTX 4060", price: 749.99, desc: "Affordable yet powerful, the RTX 4060 delivers excellent 1080p gaming performance with ray tracing and AI-enhanced graphics at a great price.", img: "img/rtx4060.png" },
  { id: 5, name: "MSI RTX 3050", price: 399.00, desc: "A budget-friendly GPU for casual gaming and creative tasks. The RTX 3050 offers impressive performance for 1080p gaming with great power efficiency.", img: "img/rtx3050.png" },
  { id: 6, name: "ZOTAC RTX 3060", price: 499.99, desc: "The RTX 3060 is a versatile mid-range GPU that handles 1080p and 1440p gaming with ease, making it the perfect choice for gamers on a budget.", img: "img/rtx3060.png" }
];

const cart = [];

const productList = document.getElementById("product-list");
const cartModal = document.getElementById("cart-modal");
const cartItemsEl = document.getElementById("cart-items");
const totalEl = document.getElementById("total");
const cartCount = document.getElementById("cart-count");
const closeBtn = document.getElementById("close-cart");


function renderProducts(filter = "") {
  productList.innerHTML = ""; 

  products
    .filter(product => product.name.toLowerCase().includes(filter.toLowerCase()))
    .forEach(product => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.desc}</p>
        <p><strong>$${product.price.toFixed(2)}</strong></p>
        <button onclick="addToCart(${product.id})">კალათაში დამატება</button>
      `;
      productList.appendChild(div);
    });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
}

function updateCart() {
  cartItemsEl.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "cart-item";
    li.innerHTML = `
      ${item.name} - $${item.price.toFixed(2)}
      <button onclick="removeFromCart(${index})">X</button>
    `;
    cartItemsEl.appendChild(li);
    total += item.price;
  });

  totalEl.textContent = total.toFixed(2);
  cartCount.textContent = cart.length;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

document.getElementById("toggle-cart").addEventListener("click", () => {
  cartModal.classList.remove("hidden");
});

closeBtn.addEventListener("click", () => {
  cartModal.classList.add("hidden");
});

window.addEventListener("click", (e) => {
  if (e.target === cartModal) {
    cartModal.classList.add("hidden");
  }
});

renderProducts();


document.getElementById("search-bar").addEventListener("input", (e) => {
  renderProducts(e.target.value);
});
