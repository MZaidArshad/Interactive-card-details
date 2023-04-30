const cardName = document.getElementById("name");
const UserCardNumber = document.getElementById("cardNumber");
const expMonth = document.getElementById("expMonth");
const expYear = document.getElementById("expYear");
const cvcNumber = document.getElementById("cvcNumber");
const cardNumber = document.getElementById("card-number");
const cardholderName = document.getElementById("cardholder-name");
const cardExp = document.getElementById("card-exp");
const cardCvcNo = document.getElementById("card-back-cvcNo");

cardName.addEventListener("keyup", () => {
  cardholderName.innerText = cardName.value;
});

UserCardNumber.addEventListener("keyup", () => {
  let value = UserCardNumber.value;
  let formattedValue = "";

  for (let i in value) {
    let j = parseInt(i);
    if ((j + 1) % 4 === 0) {
      formattedValue += value[j] + " ";
    } else {
      formattedValue += value[j];
    }
  }
  if (value.length == 0) {
    cardNumber.innerText = "0000 0000 0000 0000";
  } else {
    cardNumber.innerText = formattedValue;
  }
});

expMonth.addEventListener("keyup", () => {
  cardExp.innerText = expMonth.value + "/00";
});

expYear.addEventListener("keyup", () => {
  cardExp.innerText = expMonth.value + "/" + expYear.value;
});

cvcNumber.addEventListener("keyup", () => {
  cardCvcNo.innerText = cvcNumber.value;
});

const form = document.getElementById("payment-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  return validateForm();
});

const validateForm = () => {
  const nameError = document.getElementById("nameError");
  const numberError = document.getElementById("numberError");
  const expError = document.getElementById("expError");
  const cvcError = document.getElementById("cvcError");

  const cardNameValue = cardName.value.trim();
  const UserCardNumberValue = UserCardNumber.value.trim();
  const expMonthValue = expMonth.value.trim();
  const expYearValue = expYear.value.trim();
  const cvcNumberValue = cvcNumber.value.trim();

  const regex = new RegExp("^[0-9]{13,19}$");
  const monthRegex = new RegExp("^(0?[1-9]|1[012])$");
  const yearRegex = new RegExp("^(0?[1-9]|[1-9][0-9])$");
  const cvcRegex = new RegExp("^[0-9]{3}$");

  let isValid = true;

  if (cardNameValue === "") {
    nameError.innerText = "Can't be blank";
    cardName.style.border = "1px solid hsl(0, 100%, 66%)";
    isValid = false;
  } else {
    nameError.innerText = "";
    cardName.style.border = null;
  }

  if (UserCardNumberValue === "") {
    numberError.innerText = "Can't be blank";
    UserCardNumber.style.border = "1px solid hsl(0, 100%, 66%)";
    isValid = false;
  } else if (!regex.test(UserCardNumberValue)) {
    numberError.innerText = "Invalid format, numbers only";
    UserCardNumber.style.border = "1px solid hsl(0, 100%, 66%)";
    isValid = false;
  } else {
    numberError.innerText = "";
    UserCardNumber.style.border = null;
  }

  if (expMonthValue === "") {
    expError.innerText = "Can't be blank";
    expMonth.style.border = "1px solid hsl(0, 100%, 66%)";
    isValid = false;
  } else if (!monthRegex.test(expMonthValue)) {
    expError.innerText = "Invalid format";
    expMonth.style.border = "1px solid hsl(0, 100%, 66%)";
    isValid = false;
  } else {
    expError.innerText = "";
    expMonth.style.border = null;
  }

  if (expYearValue === "") {
    expError.innerText = "Can't be blank";
    expYear.style.border = "1px solid hsl(0, 100%, 66%)";
    isValid = false;
  } else if (!yearRegex.test(expYearValue)) {
    expError.innerText = "Invalid format";
    expYear.style.border = "1px solid hsl(0, 100%, 66%)";
    isValid = false;
  } else {
    expError.innerText = "";
    expYear.style.border = null;
  }

  if (cvcNumberValue === "") {
    cvcError.innerText = "Can't be blank";
    cvcNumber.style.border = "1px solid hsl(0, 100%, 66%)";
    isValid = false;
  } else if (!cvcRegex.test(cvcNumberValue)) {
    cvcError.innerText = "Invalid format";
    cvcNumber.style.border = "1px solid hsl(0, 100%, 66%)";
    isValid = false;
  } else {
    cvcError.innerText = "";
    cvcNumber.style.border = null;
  }

  return isValid;
};

const mainFormContainer = document.getElementById("main__formContainer");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateForm()) {
    form.style.display = "none";
    const msgDiv = document.createElement("div");
    msgDiv.className = "msg";
    msgDiv.innerHTML = `
        <img src="./images/icon-complete.svg" alt="complete" />
        <h2>Thank you!</h2>
        <p>We've added your card details</p>
        <button class="continue btn w-100" onClick="completed()">Continue</button>
      `;
    mainFormContainer.appendChild(msgDiv);
  }
});

const completed = () => {
  const continueBtn = document.querySelector(".continue");

  continueBtn.addEventListener("click", () => {
    document.querySelector(".msg").style.display = "none";
    form.style.display = "block";
    form.reset();
  });
};
