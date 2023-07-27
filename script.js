let review = {};
const API_URL = "https://6474cf8b7de100807b1bcc3e.mockapi.io/bikes";

const nameField = document.getElementById("name");
const gradeField = document.getElementById("grade");
const descriptionField = document.getElementById("description");
const addReviewButton = document.getElementById("add-review");
const reviewsDiv = document.getElementById("reviews");

const handleGetReviews = () => {
  fetch(API_URL)
    .then(response => response.json())
    .then(reviews => {
      let div = "";
      for (let review of reviews) {
        div += `<div class="review"> 
          <p>Name: ${review.name} </p>
          <p>Desciption: ${review.description}</p>
          <p>Grade: ${review.grade}</p>   
        </div>`;
      }
      reviewsDiv.innerHTML = div;
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

const handlePostReview = () => {
  fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(review)
  })
    .then(response => {
      if (response.status === 201) {
        console.log("Post successfully created!");
        handleGetAllReviews()
        handleShowReviews();
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

const handleCreateReview = () => {
  review = {
    name: nameField.value,
    grade: gradeField.value,
    description: descriptionField.value,
  };

  handlePostReview();

  review = {};
  nameField.value = "";
  gradeField.value = "";
  descriptionField.value = "";
};

const dt = new Date();
document.getElementById("datetime").innerHTML =
  ("0" + (dt.getMonth() + 1)).slice(-2) +
  "/" +
  ("0" + dt.getDate()).slice(-2) +
  "/" +
  dt.getFullYear();

addReviewButton.addEventListener("click", handleCreateReview);
handleGetReviews();
