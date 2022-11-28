function validationForm() {

    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');

    const errorFirstName = document.getElementById('errorFirstName');
    const errorLastName = document.getElementById('errorLastName');
    const errorEmail = document.getElementById('errorEmail');


    const errorsSummary = document.getElementById('errorsSummary');


    resetErrors([firstNameInput, lastNameInput, emailInput],
        [errorFirstName, errorLastName, errorEmail], errorsSummary);

    let valid = true;

    if (!checkRequired(firstNameInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(firstNameInput.value, 3, 30)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole powinno zawierać od 2 do 30 znaków";
    }

    if (!checkRequired(lastNameInput.value)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(lastNameInput.value, 3, 40)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole powinno zawierać od 3 do 40 znaków";
    }

    if (!checkRequired(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole jest wymagane";
    } else if (!checkEmail(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Wymagany poprawny adres email"
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }


    console.log(valid);

    return valid;

}


function resetErrors(inputs, errorTexts, errorInfo) {
    for (let i = 0; i < inputs.length; i++)
        inputs[i].classList.remove("error_input");

    for (let i = 0; i < errorTexts.length; i++)
        errorTexts[i].innerText = "";

    errorInfo.innerText = "";
}

function checkRequired(value) {
    if (!value)
        return false;

    value = value.toString().trim();

    if (value === "")
        return false;

    return true;
}


function checkTextLengthRange(value, min, max) {
    if (!value)
        return false;

    value = value.toString().trim();
    const length = value.length;

    if (max && length > max)
        return false;

    if (min && length < min)
        return false;

    return true;
}

function checkEmail(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
}