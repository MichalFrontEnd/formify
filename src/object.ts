class oopForm {
  formElement: HTMLFormElement | null;
  inputElements: NodeListOf<HTMLInputElement>;
  colourField: HTMLInputElement | null;
  messageContainer: HTMLDivElement | null;
  message: HTMLParagraphElement | null;
  failMessage: string;
  successMessage: string;
  backButton: HTMLButtonElement | null;
  validColours: string[];
  onlyLettersRegex: RegExp;
  successButtonClass: string;
  failButtonClass: string;

  constructor() {
    this.formElement = document.querySelector("#form");
    this.inputElements = document.querySelectorAll("input");
    this.colourField = document.querySelector("#colour");
    this.messageContainer = document.querySelector(".message__container");
    this.message = document.querySelector(".message__message");
    this.failMessage = "You shall not pass!";
    this.successMessage = "Ugh, very well...";
    this.backButton = document.querySelector(".message__btn");
    this.validColours = ["blue", "fuchsia", "coral"]; //only these colours will be accepted
    this.onlyLettersRegex = /^[a-zA-Z]+$/; // Regex to check if the string contains only letters
    this.successButtonClass = "btn-outline-primary";
    this.failButtonClass = "btn-outline-danger";

    this.handleSubmit = this.handleSubmit.bind(this);
    this.backButtonHandler = this.backButtonHandler.bind(this);

    this.formElement?.addEventListener("submit", this.handleSubmit);
    this.backButton?.addEventListener("click", this.backButtonHandler);
  }

  // tests for empty fields
  validateInputs(inputs: NodeListOf<HTMLInputElement>): boolean {
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
  validateText(input: string): boolean {
    if (!this.onlyLettersRegex.test(input)) {
      alert("Answers should only contain letters.");
      return false;
    }
    return true;
  }

  // tests if the colour appears in the validColours array. Other colours fail
  isValidColour(colour: string) {
    return this.validColours.includes(colour.toLowerCase());
  }

  resetForm(): void {
    this.formElement?.reset();
    this.formElement?.classList.remove("hidden");
    this.messageContainer?.classList.add("hidden");
  }

  //replaces the button styling
  changeBackButtonClass(isClass: string, newClass: string): void {
    if (this.backButton?.classList.contains(isClass)) {
      this.backButton.classList.replace(isClass, newClass);
    }
  }

  // displays success/fail message and hides form
  showMessage(message: string) {
    // Display the message
    if (this.message) {
      this.message.textContent = message;
    }
    this.messageContainer?.classList.remove("hidden");
    this.formElement?.classList.add("hidden");
  }

  // resets form and back button
  backButtonHandler(e: Event): void {
    e.preventDefault();
    this.resetForm();
    this.changeBackButtonClass(this.successButtonClass, this.failButtonClass);
  }

  // fires fetch and validates form
  handleSubmit(e: Event) {
    e.preventDefault();

    if (this.colourField) {
      const colour: string = this.colourField.value;
      if (this.validateInputs(this.inputElements)) {
        fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ colour }),
        })
          .then((response: any) => response.json())
          .then(() => {
            if (this.isValidColour(colour)) {
              this.changeBackButtonClass(
                this.failButtonClass,
                this.successButtonClass
              );
              this.showMessage(this.successMessage);
            } else {
              this.showMessage(this.failMessage);
            }
          })
          .catch((error: Error) => {
            console.error("Error:", error);
            // Handle errors
          });
      }
    }
  }
}

const myForm = new oopForm();
