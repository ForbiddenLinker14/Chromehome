//Google search

function googleSearch() {
  var text = document.getElementById("search").value;
  var cleanQuery = text.replace(" ", "+", text);
  var url = "http://www.google.com/search?q=" + cleanQuery;
  document.getElementById("search").value = "";
  window.location.href = url;
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    googleSearch();
  }
}

function googleVoiceSearch() {
  const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
  const speechOutput = document.getElementById("speech-output");
  document.getElementById("speech-output").style.display = "block";

  recognition.lang = "en-US";
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    speechOutput.textContent = transcript;

    if (event.results[0].isFinal) {
      document.getElementById("search").value = transcript;
      recognition.stop();
      performGoogleSearch(transcript);
    }
  };

  recognition.onerror = function (event) {
    console.error("Voice recognition error:", event.error);
  };
}

function performGoogleSearch(query) {
  const googleSearchUrl =
    "https://www.google.com/search?q=" + encodeURIComponent(query);
  window.location.href = googleSearchUrl;
  document.getElementById("search").value = ""; // Clear the input field
}

