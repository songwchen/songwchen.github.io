window.addEventListener('scroll', function () {
    var nav = document.querySelector('.navSection');
    var scrollPosition = window.scrollY;

    if (scrollPosition > 1) {
        nav.classList.add('shadow');
    } else {
        nav.classList.remove('shadow');
    }
});