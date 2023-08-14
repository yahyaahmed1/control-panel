import "../../../node_modules/chart.js/dist/chart.umd.js"


(function () {
  const chartCanvas = document.getElementById("example-chart");
  const data = JSON.parse(chartCanvas.parentElement.dataset.values);
  const brandColor = (window.getComputedStyle(chartCanvas)).getPropertyValue("--color-brand")
  const chart = new Chart(chartCanvas, {
    type: "line",
    data: {
      labels: ["ديسمبر", "نوفمبر", "اكتوبر", "سبتمبر", "أغسطس", "يوليو", "يونيو", "مايو", "أبريل", "مارس", "فبراير", "يناير",],
      datasets: [{
        label: "مبيعات الشهر",
        data: data,
        borderColor: brandColor,
        backgroundColor: "transparent",
        lineTension: 0.2, // لتخصيص التقطعات والثنيات في المخطط
      }]
    },
    options: {
      legend: {
        display: false
      },
      scales: {
        x: {
          position: "top"
        },
        y: {
          display: false
        }
      }
    }
  })

  const navigation = document.querySelector(".c-table__navigation");
  const randomArray = (mylength, max) => Array.from({ length: mylength }, () => Math.round(Math.random() * max))
  navigation.addEventListener("click", () => {
    chart.data.datasets[0].data = randomArray(12, 1500);
    chart.update();
  })
})();