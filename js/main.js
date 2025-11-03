(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".sticky-top").addClass("shadow-sm").css("top", "0px");
    } else {
      $(".sticky-top").removeClass("shadow-sm").css("top", "-100px");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });

  const PLACE_ID = "ChIJYTp_Hy0TX0YRwOHKkjbyvko";
  const AUTH_TOKEN = "vikingasecret@2025";

  const testimonial_template = `<div class="testimonial-item text-center">
                            <div class="position-relative mb-5">
                                <img class="img-fluid rounded-circle mx-auto" src="{AUTHOR_PHOTO}" alt="">
                                <div class="position-absolute top-100 start-50 translate-middle d-flex align-items-center justify-content-center bg-white rounded-circle"
                                    style="width: 60px; height: 60px;">
                                    <i class="fa fa-quote-left fa-2x text-primary"></i>
                                </div>
                            </div>
                            <p class="fs-4">{REVIEW_TEXT}
                            </p>
                            <hr class="w-25 mx-auto">
                            <h5>{AUTHOR_NAME}</h5>
                            <p>{RATING}</p>
                        </div>`;

  var testimonial_html = "";

  fetch(
    `https://stalwart-mandazi-521745.netlify.app/.netlify/functions/reviews?place_id=${PLACE_ID}&auth=${AUTH_TOKEN}`
  )
    .then((res) => res.json())
    .then((data) => {
      const reviews = data.result?.reviews;
      if (reviews) {
        reviews.forEach((review) => {
          if (review.rating > 4) {
            let star_html = "";
            for (let i = 1; i <= 5; i++) {
              star_html += `<span class="fa fa-star ${
                i <= review.rating ? "checked" : ""
              }"></span>`;
            }

            let testimonial = testimonial_template
              .replace("{AUTHOR_PHOTO}", review.profile_photo_url)
              .replace("{REVIEW_TEXT}", review.text)
              .replace("{AUTHOR_NAME}", review.author_name)
              .replace("{RATING}", star_html);
            testimonial_html += testimonial;
          }
        });

        $(".owl-carousel").append(testimonial_html);
        $(".testimonial-carousel").owlCarousel({
          autoplay: true,
          smartSpeed: 1000,
          items: 1,
          dots: true,
          loop: true,
        });
        $("#testimonial-section").fadeIn();
      }
    })
    .catch((err) => console.error("Error loading reviews:", err));

  // Testimonials carousel
})(jQuery);
