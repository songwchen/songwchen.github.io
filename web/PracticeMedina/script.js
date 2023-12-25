document.addEventListener('DOMContentLoaded', function () {
	const hamBtn = document.querySelector('.ham')
	const nav = document.querySelector('nav')
	hamBtn.addEventListener('click', function () {
		if (nav.classList.contains('navDisplayNone')) {
			nav.classList.replace('navDisplayNone', 'navDisplayBlock')
		}
		else {
			nav.classList.replace('navDisplayBlock', 'navDisplayNone')
		}
	})
})