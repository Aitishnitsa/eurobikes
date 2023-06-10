const reviewsContainer = document.getElementById("reviews");

const convertReviewsToHTML = (reviews) => {
    let html = "";
    for (let review of reviews) {
        html += `<div class="review"> 
      <p>Name: ${review.name} </p>
      <p>Desciption: ${review.description}</p>
      <p>Grade: ${review.grade}</p>   
    </div>`;
    }
    return html;
};

const handleGetAllReviews = () => {
    fetch(API_URL)
        .then(response => response.json())
        .then(reviews => {
            const html = convertReviewsToHTML(reviews);
            reviewsContainer.innerHTML = html;
        })
        .catch(error => {
            console.error('Error:', error);
        });
};

handleGetAllReviews();
