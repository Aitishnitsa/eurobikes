// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

const navToggleButton = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const headerMenu = document.querySelector('.header-menu');
const nav = document.querySelector(".navigation");
const readMoreButton = document.querySelector("#read-more-header-button");

const searchImg = document.querySelector('.search-image');
const searchBar = document.querySelector('.search-input');

const svgPath = document.getElementById("svg-path");

const productsContainer = document.getElementById('products-container');
const cartTable = document.querySelector('.cart-items');
const list = document.querySelector(".products-list");
const category = document.querySelector('#category');
const sortingSelect = document.querySelector('#sorting');
const quantityPerPage = document.querySelector('#quantityPerPage');
const submitButton = document.querySelector('#submit-btn');
const clearButton = document.querySelector('#clear-btn');
const content = document.querySelector("#content");

const minPriceField = document.getElementById("minPrice");
const maxPriceField = document.getElementById("maxPrice");

const paginator = document.querySelector("#paginator");

let bikesPerPage = 6;
let presentPage = 1;
let bikesPrice = 0;
let countBikes = 0;

let bikesArray = [];
let filteredBikes = [];
let cart = [ 
  {
    id: 0,
    imageUrl: "https://eurobikes.com.ua/components/com_jshopping/files/img_products/thumb_IMG_20230719_200919.jpg",
    name: "Велосипед складний CITY STAR",
    price: 7000,
    category: 1,
    rating: 4
  },
  {
    id: 1,
    imageUrl: "https://eurobikes.com.ua/components/com_jshopping/files/img_products/thumb_IMG_20230728_191748.jpg",
    name: "Велосипед PEGASUS Milano",
    price: 8000,
    category: 1,
    rating: 5
  }
];

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

const searchItem = (input) => {
  let searchItems = bikesArray.filter(bike => bike.name.toLowerCase().includes(input.toLowerCase()));

  filteredBikes = searchItems;

  list.innerHTML = "";

  if (searchItems.length === 0) { 
    list.innerHTML = "Не знайдено товарів за вашим пошуковим запитом :(";
  }

  presentPage = 1;
  renderPaginator(filteredBikes.length);
  createProductElement(getBikesByPage(presentPage));

  productsContainer.scrollIntoView({ behavior: 'smooth' });
}

searchImg.addEventListener('click', () => {
  const input = searchBar.value.trim();

  if (input === '') { return; }

  searchItem(input);

  searchBar.value = ''; 
});

searchBar.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault(); 
    searchImg.click(); 
  }
});

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
    });

    product.append(name, img, price, buyButton);
    list.appendChild(product);
  });
}

// fetch('./bikes.json')
//   .then(response => response.json())
//   .then(json => {
//     bikesArray = json;
//     filteredBikes = bikesArray;
//     createProductElement(filteredBikes);
//   });

  fetch('./bikes.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(json => {
    bikesArray = json;
    filteredBikes = bikesArray;
    renderPaginator(filteredBikes.length);
    createProductElement(getBikesByPage(1));
  });

const sortItems = () => {
  if (sortingSelect.value === "2") {
    filteredBikes.sort((a, b) => a.price - b.price);
  } else if (sortingSelect.value === "3") {
    filteredBikes.sort((b, a) => a.price - b.price);
  }

  list.innerHTML = "";

  presentPage = 1;
  renderPaginator(filteredBikes.length);
  createProductElement(getBikesByPage(presentPage));
}

const autoSelectCategory = (value, event) => {
  event.preventDefault();

  category.value = value;
  filter(event);
  
  productsContainer.scrollIntoView({ behavior: 'smooth' });
}

const filter = (event) => {
  // event.preventDefault();

  const selectedCategory = +category.value;
  const minPrice = parseFloat(minPriceField.value) || 0;
  const maxPrice = parseFloat(maxPriceField.value) || Number.POSITIVE_INFINITY;

  if (selectedCategory == "0") {
    filteredBikes = bikesArray;
  } else {
    filteredBikes = bikesArray.filter(bike => bike.category === selectedCategory);
  }

  if (!isNaN(minPrice) && !isNaN(maxPrice)) {
    filteredBikes = filteredBikes.filter(bike => bike.price >= minPrice && bike.price <= maxPrice);
  }

  list.innerHTML = "";

  if (filteredBikes.length === 0) { 
    list.innerHTML = "Не знайдено товарів за вашими критеріями :(";
    renderPaginator(0); 
    return;
  }
  
  renderPaginator(filteredBikes.length); 
  createProductElement(getBikesByPage(1)); 
  sortItems();
};

const clearFields = (event) => {
  event.preventDefault();

  if (category.value !== "0" || minPrice.value != '' || maxPrice.value != '') {
    category.value = "0";
    minPriceField.value = "";
    maxPriceField.value = "";
  }

}

const getBikesByPage = (page) => {
  bikesPerPage = quantityPerPage.value;
  const data = filteredBikes.length ? filteredBikes : bikesArray;
  startIndex = (page - 1) * bikesPerPage;
  return data.slice(startIndex, startIndex + bikesPerPage);
}

const renderPaginator = (amount) => {
  bikesPerPage = quantityPerPage.value;
  const numberOfPages = Math.ceil(amount / bikesPerPage);
  let rawHTML = "";
  
  for (let i = 1; i <= numberOfPages; i++) {
    rawHTML += `<li><a class="pagination-item" href="#" data-page="${i}">${i}</a></li>`;
  }
  
  paginator.innerHTML = rawHTML;
}

const refreshBikesListPerPage = (event) => {
  event.preventDefault();

  list.innerHTML = "";

  if (event.target.tagName !== "A") { return; }

  presentPage = event.target.dataset.page;
  createProductElement(getBikesByPage(presentPage));
}

const createCartElement = (array) => {
  const table = document.createElement('table');

  const tableHeader = 
  `<tr class="table-element">
    <th>Фото</th>
    <th>Назва</th>
    <th>Кількість</th>
    <th>Ціна</th>
    <th>Усього</th>
  </tr>`;
  const row1 = document.createElement('tr');
  row1.classList.add("table-element");
  table.append(row1);

  array.forEach(item => {
    const row2 = document.createElement('tr');
    const col1 = document.createElement('td');
    const col2 = document.createElement('td');
    const col3 = document.createElement('td');
    const col4 = document.createElement('td');
    const col5 = document.createElement('td');

    const img = document.createElement('img');

    row2.classList.add("table-element");

    img.src = item.imageUrl;
    row1.innerHTML = tableHeader;
    col2.innerText = item.name;
    col3.innerText = 1;
    col4.innerText = item.price;
    col5.innerText = item.price * col3.textContent;

    bikesPrice += +col5.textContent;
    countBikes += +col3.innerText;

    col1.appendChild(img);
    row2.append(col1, col2, col3, col4, col5);
    table.append(row2);
    cartTable.appendChild(table);
  });

  countPrice(bikesPrice);
}

const deliveryPriceNP = 200; // йой, най буде
let promocodes = new Map([
  ['promo5',   5],
  ['promo10', 10],
  ['promo25',   25]
]);

const countPrice = (bPrice) => {
  const bikesPrice = document.getElementById("bikesPrice");
  const discount = document.getElementById("discount");
  const deliveryPrice = document.getElementById("deliveryPrice");
  const fullPrice = document.getElementById("fullPrice");
  const promo = document.getElementById("promo");
  const refresh = document.getElementById('refresh-button');

  bikesPrice.innerHTML = bPrice;
  discount.innerHTML = '-0%';
  deliveryPrice.innerHTML = countBikes * deliveryPriceNP;

  let discountValue = 0;
  
  refresh.addEventListener("click", (event) => {
    event.preventDefault();
    let input = promo.value;

    promocodes.forEach( (value, key) => {
      if (key == input) { 
        discountValue = value;
        discount.innerHTML = `-${discountValue}%`;
      }
      fullPrice.innerHTML = ( bPrice / 100 ) * ( 100 - discountValue ) + +deliveryPrice.innerText;
    });
  });
  
  fullPrice.innerHTML = bPrice + +deliveryPrice.innerText;
}

const setPostCompany = () => {
  const novaPoshtaRadio = document.getElementById('novaPoshta');
  const ukrPoshtaRadio = document.getElementById('ukrPoshta');
  const selfDeliveryRadio = document.getElementById('selfDelivery');
  const postCompanySpan = document.querySelectorAll('#post-company');
  const refresh = document.getElementById('refresh-button');

  refresh.addEventListener('change', () => {
    if (selfDeliveryRadio.checked) {
      postCompanySpan.innerHTML = 'Самовивіз';
    }
    else if (ukrPoshtaRadio.checked) {
      postCompanySpan.innerHTML = 'Укрпошта';
    }
    else {
      postCompanySpan.innerHTML = 'Нова пошта';
    }
  });

}

document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("scroll", () => {
    const top = document.querySelector(".go-top");

    if (window.scrollY >= 100 && !isMenuOpen) {
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

document.addEventListener('click', ($event) => outsideClickSearchBarClose($event));

navToggleButton.addEventListener('click', ($event) => menuOpen($event));

paginator.addEventListener("click", (event) => { refreshBikesListPerPage(event) });

clearButton.addEventListener('click', (event) => clearFields(event));

submitButton.addEventListener('click', (event) => { 
  filter(event); 
  renderPaginator(filteredBikes.length); 
  refreshBikesListPerPage(event);
  createProductElement(getBikesByPage(1)); 
});

sortingSelect.addEventListener('change', sortItems);
quantityPerPage.addEventListener('change', (event) => {
  renderPaginator(filteredBikes.length); 
  refreshBikesListPerPage(event);
  createProductElement(getBikesByPage(1)); 
});

readMoreButton.addEventListener('click', (event) => {
  event.preventDefault();
  content.scrollIntoView({ behavior: 'smooth' });
});

// setPostCompany();
// createCartElement(cart);
