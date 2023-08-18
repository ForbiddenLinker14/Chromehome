const statusText = document.getElementById("status-text");

fetch("http://localhost:3000/api/checkMongoDBStatus")
  .then((response) => response.json())
  .then((data) => {
    if (data.status === "on") {
      statusText.textContent = "•";
      statusText.style.color = "green";
    } else {
      statusText.textContent = "•";
      statusText.style.color = "red";
    }
  })
  .catch((error) => {
    console.error("•", error);
    statusText.textContent = "•";
    statusText.style.color = "gray";
  });
