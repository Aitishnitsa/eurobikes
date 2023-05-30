let review = {};
const API_URL = "https://6474cf8b7de100807b1bcc3e.mockapi.io/bikes";

const nameField = document.getElementById("name");
const gradeField = document.getElementById("grade");
const descriptionField = document.getElementById("description");
const addReviewButton = document.getElementById("add-review");
const reviewsDiv = document.getElementById("reviews");

const handleGetReviews = () => {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let reviews = JSON.parse(this.responseText);
      let div = `<div>				
				 </div>`;

      for (let review of reviews) {
        div += `<div class="review"> 
		  <p>Name: ${review.name} </p>
		  <p>Desciption: ${review.description}</p>
		  <p>Grade: ${review.grade}</p>   
		  </div>`;
      }
      reviewsDiv.innerHTML = div;
    }
  };
  xhttp.open("GET", API_URL, true);
  xhttp.send();
};

const handlePostReview = () => {
  let post = JSON.stringify(review);
  const url = API_URL;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  xhr.send(post);
  xhr.onload = function () {
    if (xhr.status === 201) {
      console.log("Post successfully created!");
    }
  };
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

addReviewButton.addEventListener("click", () => {
  handleCreateReview();
  handleGetReviews();
});
handleGetReviews();
