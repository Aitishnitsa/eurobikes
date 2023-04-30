const reviews = [];

const nameField = document.getElementById("name");
const gradeField = document.getElementById("grade");
const descriptionField = document.getElementById("description");
const addReviewButton = document.getElementById("add-review");
const reviewsDiv = document.getElementById("reviews");

const showReviews = () => {
  if (
    nameField.value === "" ||
    gradeField.value === "" ||
    descriptionField.value === ""
  ) {
    return null;
  }
  reviews.push({
    name: nameField.value,
    grade: gradeField.value,
    description: descriptionField.value,
  });

  let div = `<div>				
				</div>`;

  for (let r of reviews) {
    div += `<div class="review"> 
		 <p>Name: ${r.name} </p>
		 <p>Desciption: ${r.description}</p>
		 <p>Grade 1-5:${r.grade}</p>       
  
	</div>`;
  }

  reviewsDiv.innerHTML = div;
};

const dt = new Date();
document.getElementById("datetime").innerHTML =
  ("0" + (dt.getMonth() + 1)).slice(-2) +
  "/" +
  ("0" + dt.getDate()).slice(-2) +
  "/" +
  dt.getFullYear();

addReviewButton.addEventListener("click", showReviews);
