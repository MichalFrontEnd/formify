"use strict";
class oopForm {
    constructor() {
        var _a, _b;
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
        (_a = this.formElement) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", this.handleSubmit);
        (_b = this.backButton) === null || _b === void 0 ? void 0 : _b.addEventListener("click", this.backButtonHandler);
    }
    // tests for empty fields
    validateInputs(inputs) {
        for (const input of inputs) {
            if (!input.value) {
                alert("Please fill out all fields.");
                return false;
            }
            else {
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
        var _a, _b, _c;
        (_a = this.formElement) === null || _a === void 0 ? void 0 : _a.reset();
        (_b = this.formElement) === null || _b === void 0 ? void 0 : _b.classList.remove("hidden");
        (_c = this.messageContainer) === null || _c === void 0 ? void 0 : _c.classList.add("hidden");
    }
    //replaces the button styling
    changeBackButtonClass(isClass, newClass) {
        var _a;
        if ((_a = this.backButton) === null || _a === void 0 ? void 0 : _a.classList.contains(isClass)) {
            this.backButton.classList.replace(isClass, newClass);
        }
    }
    // displays success/fail message and hides form
    showMessage(message) {
        var _a, _b;
        // Display the message
        if (this.message) {
            this.message.textContent = message;
        }
        (_a = this.messageContainer) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden");
        (_b = this.formElement) === null || _b === void 0 ? void 0 : _b.classList.add("hidden");
    }
    // resets form and back button
    backButtonHandler(e) {
        e.preventDefault();
        this.resetForm();
        this.changeBackButtonClass(this.successButtonClass, this.failButtonClass);
    }
    // fires fetch and validates form
    handleSubmit(e) {
        e.preventDefault();
        if (this.colourField) {
            const colour = this.colourField.value;
            if (this.validateInputs(this.inputElements)) {
                fetch("https://jsonplaceholder.typicode.com/posts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ colour }),
                })
                    .then((response) => response.json())
                    .then(() => {
                    if (this.isValidColour(colour)) {
                        this.changeBackButtonClass(this.failButtonClass, this.successButtonClass);
                        this.showMessage(this.successMessage);
                    }
                    else {
                        this.showMessage(this.failMessage);
                    }
                })
                    .catch((error) => {
                    console.error("Error:", error);
                    // Handle errors
                });
            }
        }
    }
}
const myForm = new oopForm();
