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
/*   let nowDate = new Date(),
       month = '' + (nowDate.getMonth() + 1),
       day = '' + (nowDate.getDate),
       year = '' + (nowDate.getFullYear),
       hour = '' + (nowDate.getHours),
       minute = '' + (nowDate.getMinutes),
       second = '' + (nowDate.getSeconds);*/

/*   if (month.length < 2)
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
*/