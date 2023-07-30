// let review = {};
// const API_URL = "https://6474cf8b7de100807b1bcc3e.mockapi.io/bikes";

// const nameField = document.getElementById("name");
// const gradeField = document.getElementById("grade");
// const descriptionField = document.getElementById("description");
// const addReviewButton = document.getElementById("add-review");
// const reviewsDiv = document.getElementById("reviews");

// const handleGetReviews = () => {
//   fetch(API_URL)
//     .then(response => response.json())
//     .then(reviews => {
//       let div = "";
//       for (let review of reviews) {
//         div += `<div class="review"> 
//           <p>Name: ${review.name} </p>
//           <p>Desciption: ${review.description}</p>
//           <p>Grade: ${review.grade}</p>   
//         </div>`;
//       }
//       reviewsDiv.innerHTML = div;
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
// };

// const handlePostReview = () => {
//   fetch(API_URL, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(review)
//   })
//     .then(response => {
//       if (response.status === 201) {
//         console.log("Post successfully created!");
//         handleGetAllReviews()
//         handleShowReviews();
//       }
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
// };

// const handleCreateReview = () => {
//   review = {
//     name: nameField.value,
//     grade: gradeField.value,
//     description: descriptionField.value,
//   };

//   handlePostReview();

//   review = {};
//   nameField.value = "";
//   gradeField.value = "";
//   descriptionField.value = "";
// };

// // const dt = new Date();
// // document.getElementById("datetime").innerHTML =
// //   ("0" + (dt.getMonth() + 1)).slice(-2) +
// //   "/" +
// //   ("0" + dt.getDate()).slice(-2) +
// //   "/" +
// //   dt.getFullYear();

// addReviewButton.addEventListener("click", handleCreateReview);
// handleGetReviews();

const navToggleButton = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const svgPath = document.getElementById("svg-path");

let isMenuOpen = false;

const menuOpen = ($event) => {
  if (!mobileMenu) { return; }
  svgPath.setAttribute("d", "M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z");
  mobileMenu.classList.add('opened');
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

  if (isMenuOpen) {
    navToggleButton.removeEventListener('click', menuClose);
    isMenuOpen = false;
  }
}

navToggleButton.addEventListener('click', ($event) => menuOpen($event));

// const outsideClickMenuClose = ($event) => {
//   const target = $event.target;
//   if (!mobileMenu?.contains(target)) {
//     svgPath.setAttribute("d", "M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z");
//     mobileMenu?.classList.remove('opened');
//   }
// }

// document.addEventListener('click', ($event) => outsideClickMenuClose($event));
