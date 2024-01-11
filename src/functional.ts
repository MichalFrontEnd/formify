const tsFormElement: HTMLFormElement | null = document.querySelector("#form");
const tsInputElements: NodeListOf<HTMLInputElement> =
  document.querySelectorAll("input");
const tsColourField: HTMLInputElement | null =
  document.querySelector("#colour");
const tsMessageContainer: HTMLDivElement | null = document.querySelector(
  ".message__container"
);
const tsMessage: HTMLParagraphElement | null =
  document.querySelector(".message__message");
const tsFailMessage: string = "You shall not pass!";
const tsSuccessMessage: string = "Ugh, very well...";
const tsSuccessButtonClass: string = "btn-outline-primary";
const tsFailButtonClass: string = "btn-outline-danger";
const tsBackButton: HTMLButtonElement | null =
  document.querySelector(".message__btn");
const tsValidColours: string[] = ["blue", "fuchsia", "coral"]; //only these colours will be accepted
const tsOnlyLettersRegex: RegExp = /^[a-zA-Z]+$/; //regex that only includes letters

// tests for empty fields
const tsValidateInputs = (inputs: NodeListOf<HTMLInputElement>): boolean => {
  for (const input of inputs) {
    if (!input.value) {
      alert("Please fill out all fields.");
      return false;
    } else {
      // if not empty string, validate text
      if (!tsValidateText(input.value)) {
        return false;
      }
    }
  }
  return true;
};

// tests input value for non-text responses
const tsValidateText = (input: string): boolean => {
  if (!tsOnlyLettersRegex.test(input)) {
    alert("Answers should only contain letters.");
    return false;
  }
  return true;
};

// tests if the colour appears in the tsValidColours array. Other colours fail
const tsIsValidColour = (colour: string): boolean => {
  return tsValidColours.includes(colour.toLowerCase());
};

const tsResetForm = (): void => {
  tsFormElement?.reset();
  tsFormElement?.classList.remove("hidden");
  tsMessageContainer?.classList.add("hidden");
};

const tsChangeBackButtonClass = (isClass: string, newClass: string): void => {
  if (tsBackButton?.classList.contains(isClass)) {
    tsBackButton.classList.replace(isClass, newClass);
  }
};

// displays success/fail message and hides form
const tsShowMessage = (message: string): void => {
  if (tsMessage) {
    tsMessage.textContent = message;
  }
  tsMessageContainer?.classList.remove("hidden");
  tsFormElement?.classList.add("hidden");
};

const tsBackButtonHandler = (e: Event): void => {
  e.preventDefault();
  tsResetForm();
  tsChangeBackButtonClass(tsSuccessButtonClass, tsFailButtonClass);
};

// fires fetch and validates form
const tsHandleSubmit = (e: Event): void => {
  e.preventDefault();

  if (tsValidateInputs(tsInputElements)) {
    if (tsColourField) {
      const colour: string = tsColourField.value;

      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ colour }), // Assuming 'name' should be defined globally or passed as an argument
      })
        .then((response: any) => response.json())
        .then(() => {
          if (tsIsValidColour(colour)) {
            tsShowMessage(tsSuccessMessage);
            tsChangeBackButtonClass(tsFailButtonClass, tsSuccessButtonClass);
          } else {
            tsShowMessage(tsFailMessage);
          }
        })
        .catch((error: Error) => {
          console.error("Error:", error);
          // Handle errors
        });
    }
  }
};

// adds Event listeners
tsFormElement?.addEventListener("submit", tsHandleSubmit);
tsBackButton?.addEventListener("click", tsBackButtonHandler);
