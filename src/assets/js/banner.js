(function () {
  const closeBanners = document.querySelectorAll('.js-banner-close');
  closeBanners.forEach(closebanner => {
    closebanner.addEventListener('click', event => {
      const banner = event.target.parentNode;
      banner.classList.add('collapse')
    })

    closeBanner.addEventListener('transitionend', function (event) {
      if (event.target === this) {
        this.remove()
      }
    })
  })
})();