// add and remove news feed

document.addEventListener("DOMContentLoaded", function () {
  const toggleSymbolArticle = document.getElementById("toggleSymbolArticle");
  const newsContainer = document.querySelector(".newscontainer");

  // Get the stored news container visibility state from local storage
  const storedNewsVisibility = localStorage.getItem("newsVisibility");

  // Apply the stored news container visibility state on page load
  if (storedNewsVisibility === "visible") {
    newsContainer.style.display = "block";
  } else {
    newsContainer.style.display = "none";
  }

  toggleSymbolArticle.addEventListener("click", function () {
    if (newsContainer.style.display === "none") {
      newsContainer.style.display = "block";
      localStorage.setItem("newsVisibility", "visible"); // Store the news container visibility state
    } else {
      newsContainer.style.display = "none";
      localStorage.setItem("newsVisibility", "hidden"); // Store the news container visibility state
    }
  });
});
