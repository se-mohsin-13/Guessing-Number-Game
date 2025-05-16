const userInput = document.getElementById("userInput");
const checkBtn = document.getElementById("checkBtn");

// Retrieve or generate the target number
let Guess = localStorage.getItem("Guess");
if (!Guess) {
  Guess = Math.floor(Math.random() * 101);
  localStorage.setItem("Guess", Guess);
} else {
  Guess = Number(Guess); // Convert string to number
}

function guessNumber() {
  const userGuess = Number(userInput.value.trim());

  if (isNaN(userGuess) || userGuess < 0 || userGuess > 100) {
    alert("Please enter a valid number between 0 and 100");
    userInput.value = "";
    return;
  }

  // Save each attempt to localStorage
  let attempts = JSON.parse(localStorage.getItem("Attempts")) || [];
  attempts.push(userGuess);
  localStorage.setItem("Attempts", JSON.stringify(attempts));

  if (userGuess === Guess) {
    alert(
      `🎉 Correct Guess: ${Guess}\nYou Win in ${attempts.length} attempt(s)!`
    );
    localStorage.clear(); // Clear all localStorage on win
    location.reload(); // Reload the page to start fresh
  } else if (userGuess < Guess) {
    alert("Too low! Try again.");
  } else {
    alert("Too high! Try again.");
  }

  userInput.value = "";
}

// Button click
checkBtn.addEventListener("click", guessNumber);

// Press Enter
userInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    guessNumber();
  }
});

// Auto-focus and select input on page load
userInput.focus();
userInput.select();

const aboutBtn = document.getElementById("aboutBtn");
const modal = document.getElementById("aboutModal");
const closeModal = document.getElementById("closeModal");

// Open modal
aboutBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

// Close modal on X click
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal on outside click
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
