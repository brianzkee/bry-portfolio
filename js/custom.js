(function ($) {
  "use strict";

  // COLOR MODE
  $(".color-mode").click(function () {
    $(".color-mode-icon").toggleClass("active");
    $("body").toggleClass("dark-mode");
  });

  // HEADER
  $(window).on("scroll", function () {
    const isScrolled = $(this).scrollTop() > 50;
    const size = isScrolled ? "12px" : "16px";
    const iconSize = isScrolled ? "18px" : "";
    const padding = isScrolled ? "5px 0" : "10px 0";

    $(".navbar").css({
      padding,
      transition: "padding 0.3s ease",
    });

    $(".navbar .nav-link, .navbar-brand, .navbar .navbar-nav").css({
      "font-size": size,
      transition: "font-size 0.3s ease",
    });

    $(".navbar .uil-user").css({
      "font-size": iconSize,
      transition: "font-size 0.3s ease",
    });
  });

  // PROJECT CAROUSEL
  $(".owl-carousel").owlCarousel({
    items: 1,
    loop: true,
    margin: 10,
    nav: true,
  });

  // SMOOTHSCROLL
  $(function () {
    $(".home, .nav-link, .custom-btn-link").on("click", function (event) {
      var $anchor = $(this);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $($anchor.attr("href")).offset().top - 49,
          },
          1000
        );
      event.preventDefault();
    });
  });

  // TOOLTIP
  $(".social-links a").tooltip();
})(jQuery);
