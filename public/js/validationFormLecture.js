function validationForm() {
    const lectureNameInput = document.getElementById("name");
    const professorInput = document.getElementById('prof_id');
    const departmentInput = document.getElementById('dept_id');
    const startTimeInput = document.getElementById('dateFrom');
    const endTimeInput = document.getElementById('dateTo');
    const durationInput = document.getElementById('duration');

    const errorLectureName = document.getElementById('errorLectureName');
    const errorProfessor = document.getElementById('errorProfessor');
    const errorDepartment = document.getElementById('errorDepartment');
    const errorStartTime = document.getElementById('errorStartDate');
    const errorEndTime = document.getElementById('errorEndDate');
    const errorDuration = document.getElementById('errorDuration');

    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([lectureNameInput, professorInput, departmentInput, startTimeInput, endTimeInput, durationInput],
        [errorLectureName, errorProfessor, errorDepartment, errorStartTime, errorEndTime, errorDuration], errorsSummary);

    let valid = true;

    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + (nowDate.getDate),
        year = '' + (nowDate.getFullYear),
        hour = '' + (nowDate.getHours),
        minute = '' + (nowDate.getMinutes),
        second = '' + (nowDate.getSeconds);

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    if (hour.length < 2)
        hour = '0' + hour;
    if (minute.length < 2)
        minute = '0' + minute;
    if (second.length < 2)
        second = '0' + second;
    const nowString = [year, month, day, hour, minute, second];

    //Name
    if (!checkRequired(lectureNameInput.value)) {
        valid = false;
        lectureNameInput.classList.add("error-input");
        errorLectureName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(lectureNameInput.value, 2, 30)) {
        valid = false;
        lectureNameInput.classList.add("error-input");
        errorLectureName.innerText = "Pole powinno zawierać od 2 do 30 znaków";
    }

    //Professor
    if (!checkRequired(professorInput.value)) {
        valid = false;
        professorInput.classList.add("error-input");
        errorProfessor.innerText = "Pole jest wymagane";
    }

    //Department
    if (!checkRequired(departmentInput.value)) {
        valid = false;
        departmentInput.classList.add("error-input");
        errorDepartment.innerText = "Pole jest wymagane";
    }

    //time
    if (!checkRequired(startTimeInput.value)) {
        valid = false;
        startTimeInput.classList.add("error-input");
        errorStartTime.innerText = "Pole jest wymagane";
    }

    if (checkRequired(startTimeInput.value) && !checkDateIfAfter(startTimeInput.value, endTimeInput.value)) {
        valid = false;
        endTimeInput.classList.add("error-input");
        errorEndTime.innerText = "Data zakończenia musi być po dacie rozpoczecia";
    }

    //duration
    if (!checkRequired(durationInput.value)) {
        valid = false;
        durationInput.classList.add("error-input");
        errorDuration.innerText = "Pole jest wymagane";
    } else if (!checkNumber(durationInput.value)) {
        valid = false;
        durationInput.classList.add("error-input");
        errorDuration.innerText = "Pole powinno być liczbą";
    } else if (!checkNumberRange(durationInput.value, 30, 1000)) {
        valid = false;
        durationInput.classList.add("error-input");
        errorDuration.innerText = "Pole powinno być liczbą większą od 30 i mniejszą od 1000";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }
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
    return value <= max;

}

function checkTextLengthRange(value, min, max) {
    if (!value)
        return false;

    value = value.toString().trim();
    const length = value.length;

    if (max && length > max)
        return false;

    return !(min && length < min);


}

function checkNumber(value) {
    if (!value) {
        return false;
    }
    return !isNaN(value);

}


function checkDate(value) {
    if (!value) {
        return false;
    }
    const pattern = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
    return pattern.test(value)
}

function checkDateIfAfter(value, compareTo) {
    console.log(value);
    console.log(compareTo);
    if (!value) {
        return false;
    }
    if (!compareTo) {
        return false;
    }
    const pattern = /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2})/;
    if (!pattern.test(value)) {
        return false;
    }
    const valueDate = new Date(value);
    const compareToDate = new Date(compareTo);


    return valueDate <= compareToDate;
}


