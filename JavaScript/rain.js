//rain stop and start

document.addEventListener("DOMContentLoaded", function () {
  const toggleSymbolRain = document.getElementById("toggleSymbolRain");
  const rainElement = document.querySelector(".rain");

  // Get the stored rain visibility state from local storage
  const storedRainVisibility = localStorage.getItem("rainVisibility");

  // Apply the stored rain visibility state on page load
  if (storedRainVisibility === "visible") {
    rainElement.style.display = "block";
  } else {
    rainElement.style.display = "none";
  }

  toggleSymbolRain.addEventListener("click", function () {
    if (rainElement.style.display === "none") {
      rainElement.style.display = "block";
      localStorage.setItem("rainVisibility", "visible"); // Store the rain visibility state
    } else {
      rainElement.style.display = "none";
      localStorage.setItem("rainVisibility", "hidden"); // Store the rain visibility state
    }
  });
});
