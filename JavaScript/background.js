//for changing the background image

document.addEventListener("DOMContentLoaded", async () => {
  // Load background image URL from local storage
  const storedBackgroundImageURL = localStorage.getItem("backgroundImageURL");

  if (storedBackgroundImageURL) {
    document.querySelector(
      ".hero"
    ).style.backgroundImage = `url(${storedBackgroundImageURL})`;
  }

  const togglePhotoButton = document.getElementById("toggleSymbolPhoto");
  togglePhotoButton.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("image", file);

        const reader = new FileReader();
        reader.onload = async (e) => {
          const imageDataURL = e.target.result;
          document.querySelector(
            ".hero"
          ).style.backgroundImage = `url(${imageDataURL})`;

          // Store the image URL in local storage
          localStorage.setItem("backgroundImageURL", imageDataURL);

          // Call the server-side code to upload the image and save it
          await uploadImageToServer(formData);
        };
        reader.readAsDataURL(file);
      }
    });
    input.click();
  });

  async function uploadImageToServer(formData) {
    try {
      const response = await fetch("/api/uploadImage", {
        method: "POST",
        body: formData,
      });

      if (response.status === 201) {
        const imageId = await response.text();
        console.log("Image uploaded successfully!");
        console.log("Image ID:", imageId);

        // Save the image URL to the server-side database
        await saveImageURLToDatabase(imageDataURL); // Add this function call
      } else {
        console.error("Failed to upload image.");
      }
    } catch (error) {
      console.error("An error occurred while uploading the image:", error);
    }
  }

  async function saveImageURLToDatabase(imageURL) {
    try {
      const response = await fetch("/api/saveImageURL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageURL }),
      });

      if (response.status === 201) {
        console.log("Image URL saved to the database.");
      } else {
        console.error("Failed to save image URL to the database.");
      }
    } catch (error) {
      console.error("An error occurred while saving image URL:", error);
    }
  }
});
