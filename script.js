"use script";

/////////////////////////////////////////////////
// SELECTING ELEMENTS
/////////////////////////////////////////////////

const inputDate = document.querySelector(".todayDate");
const inputValue = document.querySelector(".input");
const btnEl = document.querySelector(".saveAmountButton");
const totalMessageVal = document.querySelector(".totalMessage");
const whatsappDivEl = document.querySelector(".whatsappDiv");
const closeBtnEl = document.querySelector(".closeBtn");
const whatsappNumsaveBtn = document.querySelector(".saveWhatsappNumButton");
const errMsg = document.querySelector(".errMessage");

/////////////////////////////////////////////////
// CREATING THE TODAY'S DATE
/////////////////////////////////////////////////

const theDay = new Date().toDateString();
inputDate.textContent = theDay;

/////////////////////////////////////////////////
// STARTING ARRAY
/////////////////////////////////////////////////

let arr = JSON.parse(localStorage.getItem("inputValue")) || [];
let arr2 = JSON.parse(localStorage.getItem("listValue")) || [];

// LIST BTN FUNCTIONALITY
listBtn.addEventListener("click", function () {
  listUlEl.innerHTML = "";
  listFunc();
});

const listFunc = function () {
  arr2.forEach((val) => {
    const listHtml = ` 
          <li>
            <p class="dayText">${val.theDay}</p>
            <p class="amountText">#${val.inputedValue.toLocaleString()}</p>
          </li>
          
          `;

    listUlEl.insertAdjacentHTML("afterbegin", listHtml);
  });
};

/////////////////////////////////////////////////
//   UPDATING THE UI
/////////////////////////////////////////////////

const updateUI = function () {
  if (arr.length > 0) {
    const total = arr.reduce(function (acc, cur, i, arr) {
      return acc + cur;
    }, 0);
    totalMessageVal.textContent = `#${total.toLocaleString()}`;
    return total;
  } else {
    totalMessageVal.textContent = `#0`;
  }
};
updateUI();

/////////////////////////////////////////////////
//   INITIALIZING BUTTON FUNCTIONALITY
/////////////////////////////////////////////////

btnEl.addEventListener("click", function (e) {
  e.preventDefault();

  listUlEl.innerHTML = "";

  const inputedValue = +inputValue.value;

  if (!inputedValue || inputedValue === 0) return;

  // ADD VALUE TO ARR
  arr.push(inputedValue);

  /////////////////////////////////////////////////
  /////// SETTING THE LIST FUNCTIONALITY ///////
  /////////////////////////////////////////////////
  arr2.push({ theDay, inputedValue });

  localStorage.setItem("listValue", JSON.stringify(arr2));
  listFunc();

  // SAVING THE INPUTED VALUE TO LOCAL STORAGE
  localStorage.setItem("inputValue", JSON.stringify(arr));

  // UPDATE UI AND CLEAR INPUT
  updateUI();
  inputValue.value = "";
  saveToWhatsappFunc();
});

// RESETTING THE DATA
resetBtnEl.addEventListener("click", function () {
  // Ask for confirmation so they don't lose data by mistake
  const confirmReset = confirm(
    "Are you sure you want to delete all saved work amounts?",
  );

  if (confirmReset) {
    // A. Clear LocalStorage
    localStorage.removeItem("inputValue");

    // B. Clear the Array in the code
    arr = [];

    // C. Update the UI to show 0
    updateUI();
  }
});

/////////////////////////////////////////////////
// RESETTING THE DATA
/////////////////////////////////////////////////

resetBtnEl.addEventListener("click", function () {
  // Ask for confirmation so they don't lose data by mistake
  const confirmReset = confirm(
    "Are you sure you want to delete all saved work amounts?",
  );

  if (confirmReset) {
    // A. Clear LocalStorage
    localStorage.removeItem("inputValue");
    localStorage.removeItem("listValue");

    // B. Clear the Array in the code
    arr = [];
    arr2 = [];

    // Clear List
    listUlEl.innerHTML = "";

    // C. Update the UI to show 0
    updateUI();
  }
});

/////////////////////////////////////////////////
// SAVE TO WHATSAPP FUNCTIONALITY
/////////////////////////////////////////////////

const saveToWhatsappFunc = function (total) {
  // REMOVE HIDDEN CLASS
  whatsappDivEl.classList.remove("hidden");

  ///////   SEND MESSAGE TO WHATSAPP

  whatsappNumsaveBtn.addEventListener("click", function () {
    // selecting element
    const whatsappNumInput = document.querySelector(".whatsappNum").value;

    // CHECK THE VALUE OF INPUTTED NUMBER
    if (whatsappNumInput.length < 10 || whatsappNumInput.length > 13) {
      errMsg.classList.remove("hidden");
      errMsg.textContent = "Invalid number! Please enter 11 digit";
      return;
    } else {
      console.log(whatsappNumInput);
      const totalAmount = `#${updateUI()}`;
      console.log(totalAmount);
      const checkWhatsappNumber = +whatsappNumInput;
      const rawMsg = `SAVED AMOUNT FOR *${theDay}* is : ${totalAmount}`;
      const encodeMsg = encodeURIComponent(rawMsg);

      window.location.href = `https://api.whatsapp.com/send?phone=234${checkWhatsappNumber}&text=${encodeMsg}`;
    }
  });

  //   CLOSE SAVE TO WHATSAPP WINDOW
  closeBtnEl.addEventListener("click", function () {
    whatsappDivEl.classList.add("hidden");
  });
};
