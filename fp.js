const formElement = document.querySelector("#form");
const inputElements = document.querySelectorAll("input");
const colourField = document.querySelector("#colour");
const messageContainer = document.querySelector(".message__container");
const successMessage = document.querySelector(".message__message");
const failMessage = "You shall not pass!";
const backButton = document.querySelector(".message__btn");

const validateInputs = (inputs) => {
  for (const input of inputs) {
    if (!input.value) {
      alert("Please fill out all fields.");
      return false;
    } else {
      // if not empty string, validate text
      if (!validateText(input.value)) {
        return false;
      }
    }
  }
  return true;
};

const validateText = (input) => {
  const onlyLettersRegex = /^[a-zA-Z]+$/;
  if (!onlyLettersRegex.test(input)) {
    alert("Answers should only contain letters.");
    return false;
  }
  return true;
};

const isValidColour = (colour) => {
  const validColours = ["blue", "fuchsia", "coral"];
  return validColours.includes(colour.toLowerCase());
};

const resetForm = () => {
  formElement.reset();
  formElement.classList.remove("hidden");
  messageContainer.classList.add("hidden");
};

const showMessage = (message) => {
  successMessage.textContent = message;
  messageContainer.classList.remove("hidden");
  formElement.classList.add("hidden");
};

const backButtonHandler = (e) => {
  e.preventDefault();
  resetForm();
};

const handleSubmit = (e) => {
  e.preventDefault();

  const colour = colourField.value;

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, colour }), // Assuming 'name' should be defined globally or passed as an argument
  })
    .then((response) => response.json())
    .then(() => {
      if (validateInputs(inputElements)) {
        if (isValidColour(colour)) {
          showMessage("Form submitted successfully!");
        } else {
          showMessage(failMessage);
        }
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle errors
    });
};

// Event listeners
formElement.addEventListener("submit", handleSubmit);
backButton.addEventListener("click", backButtonHandler);
