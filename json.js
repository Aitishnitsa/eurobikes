const handleShowReviews = () => {
  fetch(API_URL)
    .then(response => response.json())
    .then(reviews => {
      console.log(JSON.stringify(reviews, null, 2));
      console.log(`Total reviews: ${reviews.length}`);
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

const handleGetNewReview = () => {
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
        handleShowReviews();
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

handleShowReviews();
