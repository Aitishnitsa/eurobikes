const navToggleButton = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const headerMenu = document.querySelector('.header-menu')
const svgPath = document.getElementById("svg-path");
const article1 = document.getElementById('article-1');
const article2 = document.getElementById('article-2');
const article3 = document.getElementById('article-3');

const articleArray = [article1, article2, article3];

let isMenuOpen = false;

const menuOpen = ($event) => {
  if (!mobileMenu) { return; }
  svgPath.setAttribute("d", "M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z");
  mobileMenu.classList.add('opened');
  headerMenu.classList.add('fixed');
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

const searchImg = document.querySelector('.search-image');
const searchBar = document.querySelector('.search-input');

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

fetch('./bikes.json').then(response => response.json()).then(json => {
  const list = document.querySelector(".products-list");

  json.forEach(element => {
    const product = document.createElement("div");
    const name = document.createElement("h2");
    const img = document.createElement("img");
    const price = document.createElement("span");
  
    product.classList.add("product");
    name.classList.add("product-name");
    img.classList.add("product-img");
    price.classList.add("product-price");

    name.innerHTML = element.name;
    img.src = element.imageUrl;
    price.innerHTML = element.price + ".00 грн";

    product.append(name, img, price);
    list.appendChild(product);
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });

})

