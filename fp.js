const formElement = document.querySelector("#form");
const inputElements = document.querySelectorAll("input");
const colourField = document.querySelector("#colour");
const messageContainer = document.querySelector(".message__container");
const successMessage = document.querySelector(".message__message");
const failMessage = "You shall not pass!";
const backButton = document.querySelector(".message__btn");
const validColours = ["blue", "fuchsia", "coral"]; //only these colours will be accepted
const onlyLettersRegex = /^[a-zA-Z]+$/; //regex that only includes letters

// tests for empty fields
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

// tests for non-text responses
const validateText = (input) => {
  if (!onlyLettersRegex.test(input)) {
    alert("Answers should only contain letters.");
    return false;
  }
  return true;
};

// tests if the colour appears in the validColours array. Other colours fail
const isValidColour = (colour) => {
  return validColours.includes(colour.toLowerCase());
};

const resetForm = () => {
  formElement.reset();
  formElement.classList.remove("hidden");
  messageContainer.classList.add("hidden");
};

// displays success/fail message and hides form
const showMessage = (message) => {
  successMessage.textContent = message;
  messageContainer.classList.remove("hidden");
  formElement.classList.add("hidden");
};

const backButtonHandler = (e) => {
  e.preventDefault();
  resetForm();
};

// fires fetch and validates form
const handleSubmit = (e) => {
  e.preventDefault();

  const colour = colourField.value;

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ colour }), // Assuming 'name' should be defined globally or passed as an argument
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

// adds Event listeners
formElement.addEventListener("submit", handleSubmit);
backButton.addEventListener("click", backButtonHandler);
