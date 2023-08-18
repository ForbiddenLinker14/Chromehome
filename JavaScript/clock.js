// for clock
let hrs = document.getElementById("hrs");
let min = document.getElementById("min");
let sec = document.getElementById("sec");

setInterval(() => {
  let currentTime = new Date();
  hrs.innerHTML =
    (currentTime.getHours() < 10 ? "0" : "") + currentTime.getHours();
  min.innerHTML =
    (currentTime.getMinutes() < 10 ? "0" : "") + currentTime.getMinutes();
  sec.innerHTML =
    (currentTime.getSeconds() < 10 ? "0" : "") + currentTime.getSeconds();
}, 1000);

//for news animation

const newsContainer = document.querySelector(".newscontainer");

function shakeOnce() {
  newsContainer.classList.add("shake");
  setTimeout(() => {
    newsContainer.classList.remove("shake");
  }, 1000);
}
setInterval(shakeOnce, 50000);
