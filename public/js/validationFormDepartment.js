function validationForm() {
    const departmentNameInput = document.getElementById("dept-name");
    const totalHoursInput = document.getElementById('totalHours');
    const descriptionInput = document.getElementById('description');


    const errorDeptName = document.getElementById('errorDeptName');
    const errorTotalHours = document.getElementById('errorTotalHours');
    const errorDescription = document.getElementById('errorDescription');

    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([departmentNameInput, totalHoursInput, descriptionInput], [errorDeptName, errorTotalHours, errorDescription], errorsSummary);

    let valid = true;

    if (!checkRequired(departmentNameInput.value)) {
        valid = false;
        departmentNameInput.classList.add("error-input");
        errorDeptName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(departmentNameInput.value, 2, 60)) {
        valid = false;
        departmentNameInput.classList.add("error-input");
        errorDeptName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(totalHoursInput.value)) {
        valid = false;
        totalHoursInput.classList.add("error-input");
        errorTotalHours.innerText = "Pole jest wymagane";
    } else if (!checkNumber(totalHoursInput.value)) {
        valid = false;
        totalHoursInput.classList.add("error-input");
        errorTotalHours.innerText = "Pole powinno być liczbą";
    } else if (!checkNumberRange(totalHoursInput.value, 20, 1_000)) {
        valid = false;
        totalHoursInput.classList.add("error-input");
        errorTotalHours.innerText = "Pole powinno być liczbą w zakresie od 20 do 1000";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }
    return valid;
}


function resetErrors(inputs, errorTexts, errorInfo) {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove('error_input');
    }
    for (let i = 0; i < errorTexts.length; i++) {
        errorTexts[i].innerText = "";
    }
    errorInfo.innerText = "";

}


function checkRequired(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    if (value === "") {
        return false
    }
    return true;
}

function checkTextLengthRange(value, min, max) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const length = value.length;
    if (max && length > max) {
        return false;
    }
    if (min && length < min) {
        return false;
    }
    return true;
}

function checkNumberRange(value, min, max) {
    if (!value) {
        return false;
    }
    if (isNaN(value)) {
        return false;
    }
    value = parseFloat(value);
    if (value < min) {
        return false;
    }
    if (value > max) {
        return false;
    }
    return true;
}

function checkNumber(value) {
    if (!value) {
        return false;
    }
    return !isNaN(value);

}

