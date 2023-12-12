window.addEventListener('scroll', function () {
    var nav = document.querySelector('.navSection');
    var scrollPosition = window.scrollY;

    if (scrollPosition > 1) { // 這裡的數值可以根據實際情況調整
        nav.classList.add('shadow');
    } else {
        nav.classList.remove('shadow');
    }
});