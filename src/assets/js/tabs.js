(function () {
  const tabs = document.querySelectorAll(".js-tabs");
  Array.from(tabs, tab => {
    const tabsLinks = tab.querySelectorAll(".js-tab-link");
    let ActiveTab = tab.querySelector(".js-tab-link.is-active");

    const toggleTab = (toggledTablink = ActiveTab) => {
      ActiveTab = toggledTablink || ActiveTab;
      toggledTablink.classList.toggle("is-active");

      const toggledTabData = toggledTablink.dataset.index;
      const toggledTabArea = tab.querySelector(`.js-tabarea[data-indexed=${toggledTabData}]`);
      toggledTabArea.classList.toggle("is-active")
    }

    if (!ActiveTab) {
      toggleTab(tabsLinks[0]);
    }

    tabsLinks.forEach(tablink => {
      tablink.addEventListener("click", function () {
        if (ActiveTab === this) {
          return;
        }
        if (ActiveTab) {
          toggleTab()
        }
        toggleTab(this)
      })
    })

  })
})();