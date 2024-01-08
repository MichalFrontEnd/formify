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

    this.formElement.addEventListener("submit", this.handleSubmit);
    this.backButton.addEventListener("click", this.backButtonHandler);
  }

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

  validateText(input) {
    const onlyLettersRegex = /^[a-zA-Z]+$/; // Regex to check if the string contains only letters
    if (!onlyLettersRegex.test(input)) {
      alert("Answers should only contain letters.");
      return false;
    }

    return true;
  }

  isValidColour(colour) {
    const validColours = ["blue", "fuchsia", "coral"];
    return validColours.includes(colour.toLowerCase());
  }

  backButtonHandler(e) {
    e.preventDefault();
    this.resetForm();
  }

  resetForm() {
    this.formElement.reset();
    this.formElement.classList.remove("hidden");
    this.messageContainer.classList.add("hidden");
  }

  showMessage(message) {
    // Display the message
    this.successMessage.textContent = message;
    this.messageContainer.classList.remove("hidden");
    this.formElement.classList.add("hidden");
  }
}

const myForm = new oopForm();