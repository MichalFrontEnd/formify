"use strict";
const tsFormElement = document.querySelector("#form");
const tsInputElements = document.querySelectorAll("input");
const tsColourField = document.querySelector("#colour");
const tsMessageContainer = document.querySelector(".message__container");
const tsMessage = document.querySelector(".message__message");
const tsFailMessage = "You shall not pass!";
const tsSuccessMessage = "Ugh, very well...";
const tsSuccessButtonClass = "btn-outline-primary";
const tsFailButtonClass = "btn-outline-danger";
const tsBackButton = document.querySelector(".message__btn");
const tsValidColours = ["blue", "fuchsia", "coral"]; //only these colours will be accepted
const tsOnlyLettersRegex = /^[a-zA-Z]+$/; //regex that only includes letters
// tests for empty fields
const tsValidateInputs = (inputs) => {
    for (const input of inputs) {
        if (!input.value) {
            alert("Please fill out all fields.");
            return false;
        }
        else {
            // if not empty string, validate text
            if (!tsValidateText(input.value)) {
                return false;
            }
        }
    }
    return true;
};
// tests input value for non-text responses
const tsValidateText = (input) => {
    if (!tsOnlyLettersRegex.test(input)) {
        alert("Answers should only contain letters.");
        return false;
    }
    return true;
};
// tests if the colour appears in the tsValidColours array. Other colours fail
const tsIsValidColour = (colour) => {
    return tsValidColours.includes(colour.toLowerCase());
};
const tsResetForm = () => {
    tsFormElement === null || tsFormElement === void 0 ? void 0 : tsFormElement.reset();
    tsFormElement === null || tsFormElement === void 0 ? void 0 : tsFormElement.classList.remove("hidden");
    tsMessageContainer === null || tsMessageContainer === void 0 ? void 0 : tsMessageContainer.classList.add("hidden");
};
const tsChangeBackButtonClass = (isClass, newClass) => {
    if (tsBackButton === null || tsBackButton === void 0 ? void 0 : tsBackButton.classList.contains(isClass)) {
        tsBackButton.classList.replace(isClass, newClass);
    }
};
// displays success/fail message and hides form
const tsShowMessage = (message) => {
    if (tsMessage) {
        tsMessage.textContent = message;
    }
    tsMessageContainer === null || tsMessageContainer === void 0 ? void 0 : tsMessageContainer.classList.remove("hidden");
    tsFormElement === null || tsFormElement === void 0 ? void 0 : tsFormElement.classList.add("hidden");
};
const tsBackButtonHandler = (e) => {
    e.preventDefault();
    tsResetForm();
    tsChangeBackButtonClass(tsSuccessButtonClass, tsFailButtonClass);
};
// fires fetch and validates form
const tsHandleSubmit = (e) => {
    e.preventDefault();
    if (tsValidateInputs(tsInputElements)) {
        if (tsColourField) {
            const colour = tsColourField.value;
            fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ colour }), // Assuming 'name' should be defined globally or passed as an argument
            })
                .then((response) => response.json())
                .then(() => {
                if (tsIsValidColour(colour)) {
                    tsShowMessage(tsSuccessMessage);
                    tsChangeBackButtonClass(tsFailButtonClass, tsSuccessButtonClass);
                }
                else {
                    tsShowMessage(tsFailMessage);
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
tsFormElement === null || tsFormElement === void 0 ? void 0 : tsFormElement.addEventListener("submit", tsHandleSubmit);
tsBackButton === null || tsBackButton === void 0 ? void 0 : tsBackButton.addEventListener("click", tsBackButtonHandler);
