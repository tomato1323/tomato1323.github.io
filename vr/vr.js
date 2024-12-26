document.addEventListener('DOMContentLoaded', function() {
    var elems_p = document.querySelectorAll('.parallax');
    var instances = M.Parallax.init(elems_p, {});

    var elems_c = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems_c, {
        fullwidth: true,
        indicators: true,
    });
});
