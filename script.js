const navToggleButton = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const headerMenu = document.querySelector('.header-menu');
const nav = document.querySelector(".navigation");

const searchImg = document.querySelector('.search-image');
const searchBar = document.querySelector('.search-input');

const svgPath = document.getElementById("svg-path");

const cartTable = document.querySelector('.cart-items');
const list = document.querySelector(".products-list");
const category = document.querySelector('#category');
const sortingSelect = document.querySelector('#sorting');
const submitButton = document.querySelector('#submit-btn');

let cart = [];

let isMenuOpen = false;

const menuOpen = ($event) => {
  if (!mobileMenu) { return; }
  svgPath.setAttribute("d", "M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z");
  mobileMenu.classList.add('opened');
  headerMenu.classList.add('fixed');
  nav.classList.remove("to-top");
  $event.stopPropagation();

  if (!isMenuOpen) {
    navToggleButton.addEventListener('click', menuClose);
    isMenuOpen = true;
  }
}

const menuClose = () => {
  if (!mobileMenu) { return; }
  svgPath.setAttribute("d", "M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z");
  mobileMenu.classList.remove('opened');
  headerMenu.classList.remove('fixed');

  if (isMenuOpen) {
    navToggleButton.removeEventListener('click', menuClose);
    isMenuOpen = false;
  }
}

navToggleButton.addEventListener('click', ($event) => menuOpen($event));

const showSearchBar = ($event) => {
  searchBar.classList.add('opened');
  $event.stopPropagation();
}

const outsideClickSearchBarClose = ($event) => {
  const target = $event.target;
  if (!searchBar?.contains(target)) {
    searchBar?.classList.remove('opened');
  }
}

document.addEventListener('click', ($event) => outsideClickSearchBarClose($event));

let bikesArray = [];

const createProductElement = (array) => {
  array.forEach(item => {
    const product = document.createElement("div");
    const name = document.createElement("h2");
    const img = document.createElement("img");
    const price = document.createElement("span");
    const buyButton = document.createElement("a");

    product.classList.add("product");
    name.classList.add("product-name");
    img.classList.add("product-img");
    price.classList.add("product-price");
    buyButton.classList.add("product-buy-button");

    name.innerHTML = item.name;
    img.src = item.imageUrl;
    price.innerHTML = item.price + ".00 грн";
    buyButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" 
      width="16" height="16" fill="currentColor" class="bi bi-cart" 
      viewBox="0 0 16 16"> <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 
      0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 
      13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 
      1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 
      0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 
      0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/> 
      </svg>` + "Придбати";

    buyButton.addEventListener("click", () => {
      cart.push(item);
      console.log(cart);
      addItemToCart(cart);
    });

    product.append(name, img, price, buyButton);
    list.appendChild(product);
  });
}

fetch('./bikes.json')
.then(response => response.json())
.then(json => {
  bikesArray = json;
  createProductElement(bikesArray);
});

const sortItems = () => {
  if (sortingSelect.value === "2") {
    console.log("2");
    bikesArray.sort((a, b) => a.price - b.price); 
  } else if (sortingSelect.value === "3") {
    console.log("3");
    bikesArray.sort((b, a) => a.price - b.price); 
  } 
  
  list.innerHTML = "";
  
  createProductElement(bikesArray);
}

const filter = (event) => {
  event.preventDefault();
  
  sortItems();
  
  const selectedCategory = +category.value;
  const minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
  const maxPrice = parseFloat(document.getElementById("maxPrice").value) || Number.POSITIVE_INFINITY;

  let filteredBikes = [];

  if (selectedCategory == "0") {
    filteredBikes = bikesArray; 
  } else {
    filteredBikes = bikesArray.filter(bike => bike.category === selectedCategory);
  }
  
  if (!isNaN(minPrice) && !isNaN(maxPrice)) {
    filteredBikes = filteredBikes.filter(bike => bike.price >= minPrice && bike.price <= maxPrice);
  }
  
  list.innerHTML = "";
  
  createProductElement(filteredBikes);
};

submitButton.addEventListener('click', (event) => filter(event));
sortingSelect.addEventListener('change', sortItems());

const addItemToCart = (array) => {
  array.forEach(item => {
    console.log("addItemToCart");

    const table = document.createElement('table');

    const row = document.createElement('tr');
    const col1 = document.createElement('td');
    const col2 = document.createElement('td');
    const col3 = document.createElement('td');
    const col4 = document.createElement('td');

    const img = document.createElement('img');

    img.src = item.imageUrl;
    col1.innerHTML = img;
    col2.innerText = item.name;
    col3.innerText = item.price;
    col4.innerText = item.price;

    row.append(col1, col2, col3, col4);
    table.append(row);
    cartTable.appendChild(table);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("scroll", () => {
    const top = document.querySelector(".go-top");

    if(window.scrollY >= 100 && !isMenuOpen) {
      nav.classList.add("to-top");
    } else {
      nav.classList.remove("to-top");
    }

    if (window.scrollY >= 600 && !isMenuOpen) {
      if (top.classList.contains("no-active")) {
        top.classList.remove("no-active");
        top.classList.add("active");
      }
    } else {
      if (top.classList.contains("active")) {
        top.classList.remove("active");
        top.classList.add("no-active");
      }
    }
  });

  document.querySelector(".go-top").addEventListener("click", () => {
    scrollToTop(800);
  });

  function scrollToTop(duration) {
    let scrollStep = -window.scrollY / (duration / 15);
    let scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  }
});

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
