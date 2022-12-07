function validationForm() {
    const lectureNameInput = document.getElementById("name");
    const professorInput = document.getElementById('prof_id');
    const departmentInput = document.getElementById('dept_id');
    const startTimeInput = document.getElementById('dateFrom');
    const endTimeInput = document.getElementById('dateTo');


    const errorLectureName = document.getElementById('errorLectureName');
    const errorProfessor = document.getElementById('errorProfessor');
    const errorDepartment = document.getElementById('errorDepartment');
    const errorStartTime = document.getElementById('errorStartDate');
    const errorEndTime = document.getElementById('errorEndDate');


    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([lectureNameInput, professorInput, departmentInput, startTimeInput, endTimeInput],
        [errorLectureName, errorProfessor, errorDepartment, errorStartTime, errorEndTime], errorsSummary);

    let valid = true;


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
        console.log(startTimeInput.value);
        valid = false;
        startTimeInput.classList.add("error-input");
        errorStartTime.innerText = "Pole jest wymagane";

    } /*else if (!checkDate(startTimeInput.value)) {
        valid = false;
        startTimeInput.classList.add("error-input");
        errorStartTime.innerText = "Pole musi być datą";
    }*/
    if (!checkRequired(endTimeInput.value)) {
        console.log(endTimeInput.value);
        valid = false;
        endTimeInput.classList.add("error-input");
        errorEndTime.innerText = "Pole jest wymagane";

    } /*else if (!checkDate(endTimeInput.value)) {
        valid = false;
        endTimeInput.classList.add("error-input");
        errorEndTime.innerText = "Pole musi być datą";
    }*/

    if (!checkDateIfAfter(startTimeInput.value, endTimeInput.value)) {
        console.log('start date:' + startTimeInput.value + " end date: " + endTimeInput.value);
        valid = false;
        endTimeInput.classList.add("error-input");
        errorEndTime.innerText = "Data zakończenia musi być po dacie rozpoczecia";
    }


    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }
    return valid;
}



function checkDate(value) {
    if (!value) {
        return false;
    }
    console.log(value);
    const pattern = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/;
    return pattern.test(value)
}

function checkDateIfAfter(value, compareTo) {
    console.log('compare ' + value);
    console.log('compare to ' + compareTo);
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


