const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const app = express();
app.use(express.json());

const dbConnectionString = "mongodb+srv://anitsaha976:zuzFOFhJY5EYscLA@cluster0.6nmeso4.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(dbConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const imageSchema = new mongoose.Schema({
  imageURL: String,
});

const Image = mongoose.model("Image", imageSchema);

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/api/uploadImage", upload.single("image"), async (req, res) => {
  try {
    const imageBuffer = req.file.buffer;
    console.log("Received image data:", imageBuffer);

    // Delete the previously saved image
    await Image.deleteMany({}); // This will delete all documents in the Image collection

    const savedImage = await Image.create({ imageURL: imageBuffer });
    // const savedImage = await Image.create({ imageURL: "images/" });

    console.log("Image saved:", savedImage);

    res.status(201).send(savedImage._id.toString());
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Failed to upload image." });
  }
});

app.get("/api/getBackgroundImage", async (req, res) => {
  try {
    const backgroundImage = await Image.findOne().sort({ _id: -1 }).limit(1);
    if (backgroundImage) {
      res.send(backgroundImage.imageURL);
    } else {
      res.status(404).json({ error: "No background image found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve background image." });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use(express.static(path.join(__dirname)));

app.get("/api/checkMongoDBStatus", async (req, res) => {
  try {
    const isConnected = mongoose.connection.readyState === 1;
    res.json({ status: isConnected ? "on" : "off" });
  } catch (error) {
    res.status(500).json({ error: "Failed to check MongoDB status." });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

