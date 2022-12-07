function validationForm() {
    const departmentNameInput = document.getElementById("name");
    const totalHoursInput = document.getElementById('totalHours');



    const errorDeptName = document.getElementById('errorDeptName');
    const errorTotalHours = document.getElementById('errorTotalHours');
    const errorDescription = document.getElementById('errorDescription');

    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([departmentNameInput, totalHoursInput], [errorDeptName, errorTotalHours, errorDescription], errorsSummary);

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


