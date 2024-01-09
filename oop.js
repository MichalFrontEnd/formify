class oopForm {
  constructor() {
    this.formElement = document.querySelector("#form");
    this.inputElements = document.querySelectorAll("input");
    this.colourField = document.querySelector("#colour");
    this.messageContainer = document.querySelector(".message__container");
    this.successMessage = document.querySelector(".message__message");
    this.failMessage = "You shall not pass!";
    this.backButton = document.querySelector(".message__btn");

    this.handleSubmit = this.handleSubmit.bind(this);
    this.backButtonHandler = this.backButtonHandler.bind(this);
    this.validColours = ["blue", "fuchsia", "coral"]; //only these colours will be accepted
    this.onlyLettersRegex = /^[a-zA-Z]+$/; // Regex to check if the string contains only letters

    this.formElement.addEventListener("submit", this.handleSubmit);
    this.backButton.addEventListener("click", this.backButtonHandler);
  }

  // tests for empty fields
  validateInputs(inputs) {
    for (const input of inputs) {
      if (!input.value) {
        alert("Please fill out all fields.");
        return false;
      } else {
        // if not empty string, validate text
        if (!this.validateText(input.value)) {
          return false;
        }
      }
    }
    return true;
  }

  // tests for non-text responses
  validateText(input) {
    if (!this.onlyLettersRegex.test(input)) {
      alert("Answers should only contain letters.");
      return false;
    }

    return true;
  }

  // tests if the colour appears in the validColours array. Other colours fail
  isValidColour(colour) {
    return this.validColours.includes(colour.toLowerCase());
  }

  resetForm() {
    this.formElement.reset();
    this.formElement.classList.remove("hidden");
    this.messageContainer.classList.add("hidden");
  }

  // displays success/fail message and hides form
  showMessage(message) {
    // Display the message
    this.successMessage.textContent = message;
    this.messageContainer.classList.remove("hidden");
    this.formElement.classList.add("hidden");
  }

  backButtonHandler(e) {
    e.preventDefault();
    this.resetForm();
  }

  // fires fetch and validates form
  handleSubmit(e) {
    e.preventDefault();

    const colour = this.colourField.value;

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, colour }),
    })
      .then((response) => response.json())
      .then(() => {
        if (this.validateInputs(this.inputElements)) {
          if (this.isValidColour(colour)) {
            this.showMessage("Form submitted successfully!");
          } else {
            this.showMessage(this.failMessage);
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors
      });
  }
}

const myForm = new oopForm();
