// animation
const weatherElement = document.querySelector(".weather");
let animationTimeout;

function addAnimationClass() {
  weatherElement.classList.add("animated");
  weatherElement.style.animation = "rotate3d 6s linear";

  animationTimeout = setTimeout(() => {
    weatherElement.classList.remove("animated");
    weatherElement.style.animation = "none"; // Remove animation after completion
  }, 6000); // Animation duration (6000ms = 6s)
}

function startAnimation() {
  addAnimationClass();
  setInterval(addAnimationClass, 30000);
}
startAnimation();
