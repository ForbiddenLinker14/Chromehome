//add shortcut

document.addEventListener("DOMContentLoaded", function () {
  const shortcutContainer = document.querySelector(".shortcut-container");
  const addShortcutButton = document.getElementById("add-shortcut");
  const storedShortcuts = new Set(
    JSON.parse(localStorage.getItem("shortcuts")) || []
  );

  function addShortcut(url) {
    if (shortcutContainer.children.length <= 7) {
      const newShortcut = document.createElement("div");
      newShortcut.classList.add("shortcut");

      const iconClass = getIconClass(url);
      newShortcut.innerHTML = `
  <i class="${iconClass}"></i>
  <span class="delete-icon">×</span>
`;

      newShortcut.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-icon")) {
          // Delete the shortcut
          storedShortcuts.delete(url);
          localStorage.setItem(
            "shortcuts",
            JSON.stringify(Array.from(storedShortcuts))
          );
          newShortcut.remove();
        } else {
          window.location.href = url;
        }
      });

      shortcutContainer.insertBefore(newShortcut, addShortcutButton);
    } else {
      console.log("Maximum number of shortcuts reached (7)");
    }
  }

  function getIconClass(url) {
    if (url.includes("envelope")) {
      return "fab fa-envelope";
    } else if (url.includes("stackoverflow")) {
      return "fab fa-stack-overflow";
    } else if (url.includes("wikipedia")) {
      return "fab fa-wikipedia-w";
    } else if (url.includes("www.mastercard")) {
      return "fa-brands fa-cc-mastercard";
    } else if (url.includes("twitter.com")) {
      return "fa-brands fa-square-x-twitter";
    } else if (url.includes("wolf-pack-battalion")) {
      return "fa-brands fa-wolf-pack-battalion";
    } else if (url.includes("play.google.com")) {
      return "fab fa-google-play";
    } else if (url.includes("javascript")) {
      return "fa-brands fa-square-js";
    } else if (url.includes("glideapps")) {
      return "fa-brands fa-glide-g";
    } else if (url.includes("messenger")) {
      return "fab fa-facebook-messenger";
    } else if (url.includes("steam")) {
      return "fa-brands fa-steam-symbol";
    } else if (url.includes("stackexchange")) {
      return "fa-brands fa-stack-exchange";
    } else if (url.includes("reddit")) {
      return "fa-brands fa-square-reddit";
    } else if (url.includes("vimeo")) {
      return "fa-brands fa-vimeo-v";
    } else if (url.includes("dribbble")) {
      return "fa-brands fa-square-dribbble";
    } else if (url.includes("maps")) {
      return "fa-solid fa-location-dot";
    } else if (url.includes("https://meet.google.com")) {
      return "fa-solid fa-video";
    } else if (url.includes("drive.google")) {
      return "fa-brands fa-google-drive";
    } else if (url.includes("translate")) {
      return "fa-solid fa-language";
    } else if (url.includes("photo")) {
      return "fa-regular fa-image";
    } else if (url.includes("earth")) {
      return "fa-solid fa-earth-americas";
    } else if (url.includes("shopping")) {
      return "fa-solid fa-tag";
    } else if (url.includes("flipkart")) {
      return "fa-solid fa-cart-shopping";
    } else if (url.includes("blog")) {
      return "fa-solid fa-b";
    } else if (url.includes("chat")) {
      return "fa-regular fa-comment";
    } else if (url.includes("calendar")) {
      return "fa-solid fa-calendar-days";
    } else if (url.includes("contact")) {
      return "fa-solid fa-address-book";
    } else if (url.includes("fontawesome")) {
      return "fa-solid fa-font-awesome";
    } else {
      const pageName = getPageNameFromLink(url);
      console.log("Extracted page name:", pageName); // Debugging line
      if (pageName.length > 0) {
        const firstLetter = pageName.charAt(0).toLowerCase();
        return `fab fa-${pageName} fa-regular fa-${firstLetter}`;
      } else {
        // Handle the case where pageName is empty (e.g., use a default icon class)
        return "fa-regular fa-default"; // Change this to the desired default icon class
      }
    }
  }

  function getPageNameFromLink(url) {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;

    const parts = hostname.split(".");
    const domainName =
      parts.length > 2 ? parts.slice(1).join(".") : parts.join(".");

    const subDomainParts = domainName.split(".");
    if (subDomainParts.length > 2) {
      const subDomain = subDomainParts[0]; // Extract the subdomain between "www." and ".com"
      return subDomain.replace(/\W/g, "-");
    } else {
      return domainName.split(".")[0].replace(/\W/g, "-");
    }
  }

  storedShortcuts.forEach(function (url) {
    addShortcut(url);
  });

  addShortcutButton.addEventListener("click", function () {
    if (shortcutContainer.children.length <= 7) {
      const userInput = prompt("Enter the URL of the shortcut:");
      if (userInput) {
        storedShortcuts.add(userInput);
        localStorage.setItem(
          "shortcuts",
          JSON.stringify(Array.from(storedShortcuts))
        );
        addShortcut(userInput);
      }
    } else {
      console.log("Maximum number of shortcuts reached (7)");
    }
  });
});
