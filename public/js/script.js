document.addEventListener("DOMContentLoaded", function () {
  const stars = document.querySelectorAll(".rating-stars i");
  const ratingInput = document.getElementById("rating");

  if (stars.length > 0 && ratingInput) {
    stars.forEach((star) => {
      star.addEventListener("click", function () {
        const value = parseInt(this.getAttribute("data-value"));
        ratingInput.value = value;

        stars.forEach((s, index) => {
          if (index < value) {
            s.classList.add("fas", "active");
            s.classList.remove("far");
          } else {
            s.classList.add("far");
            s.classList.remove("fas", "active");
          }
        });
      });

      star.addEventListener("mouseover", function () {
        const value = parseInt(this.getAttribute("data-value"));

        stars.forEach((s, index) => {
          if (index < value) {
            s.classList.add("fas");
            s.classList.remove("far");
          }
        });
      });

      star.addEventListener("mouseout", function () {
        const currentRating = parseInt(ratingInput.value) || 0;

        stars.forEach((s, index) => {
          if (index >= currentRating) {
            s.classList.add("far");
            s.classList.remove("fas");
          }
        });
      });
    });
  }

  const reviewForm = document.getElementById("reviewForm");
  if (reviewForm) {
    reviewForm.addEventListener("submit", function (e) {
      const rating = document.getElementById("rating").value;
      if (!rating) {
        e.preventDefault();
        alert("Please select a rating by clicking the stars");
        return false;
      }
      return true;
    });
  }
});
