const formElement = document.querySelector("#form");
const inputElements = document.querySelectorAll("input");
const colourField = document.querySelector("#colour");
const messageContainer = document.querySelector(".message__container");
const message = document.querySelector(".message__message");
const failMessage = "You shall not pass!";
const successMessage = "Ugh, very well...";
const successButtonClass = "btn-outline-primary";
const failButtonClass = "btn-outline-danger";
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

const changeBackButtonClass = (isClass, newClass) => {
  if (backButton.classList.contains(isClass)) {
    backButton.classList.replace(isClass, newClass);
  }
};

// displays success/fail message and hides form
const showMessage = (messageText) => {
  if (message) {
    message.textContent = messageText;
  }
  messageContainer.classList.remove("hidden");
  formElement.classList.add("hidden");
};

const backButtonHandler = (e) => {
  e.preventDefault();
  resetForm();
  changeBackButtonClass(successButtonClass, failButtonClass);
};

// fires fetch and validates form
const handleSubmit = (e) => {
  e.preventDefault();

  if (validateInputs(inputElements)) {
    if (colourField) {
      const colour = colourField.value;

      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ colour }),
      })
        .then((response) => response.json())
        .then(() => {
          if (isValidColour(colour)) {
            showMessage(successMessage);
            changeBackButtonClass(failButtonClass, successButtonClass);
          } else {
            showMessage(failMessage);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle errors
        });
    }
  }
};

// adds Event listeners
formElement.addEventListener("submit", handleSubmit);
backButton.addEventListener("click", backButtonHandler);
