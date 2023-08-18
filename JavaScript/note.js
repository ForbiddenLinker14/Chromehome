//for stickey note

const addNoteButton = document.getElementById("addNoteButton");
const stickyNotesContainer = document.getElementById("stickyNotesContainer");

// Load notes from local storage
const savedNotes = JSON.parse(localStorage.getItem("stickyNotes")) || [];

// Function to generate a random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to save notes to local storage
function saveNotesToLocalStorage() {
  const notes = Array.from(
    stickyNotesContainer.querySelectorAll(".sticky-note")
  );
  const noteData = notes.map((note) => note.querySelector("textarea").value);
  localStorage.setItem("stickyNotes", JSON.stringify(noteData));
}

// Populate saved notes from local storage
savedNotes.slice(0, 3).forEach((noteText) => {
  createStickyNote(noteText);
});

function createStickyNote(initialText = "") {
  if (stickyNotesContainer.querySelectorAll(".sticky-note").length >= 3) {
    return; // Do not create more than 3 notes
  }

  const stickyNote = document.createElement("div");
  stickyNote.className = "sticky-note";
  stickyNote.style.backgroundColor = getRandomColor(); // Set random background color
  stickyNote.innerHTML = `
        <button class="delete-button">X</button>
        <textarea>${initialText}</textarea>
    `;

  const deleteButton = stickyNote.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    stickyNotesContainer.removeChild(stickyNote);
    saveNotesToLocalStorage();
  });

  // Listen for textarea changes to save notes
  const textarea = stickyNote.querySelector("textarea");
  textarea.addEventListener("input", () => {
    saveNotesToLocalStorage();
  });

  stickyNotesContainer.appendChild(stickyNote);
  saveNotesToLocalStorage();
}

addNoteButton.addEventListener("click", () => {
  createStickyNote();
});
