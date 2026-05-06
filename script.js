"use script";

/////////////////////////////////////////////////
// SELECTING ELEMENTS
/////////////////////////////////////////////////

const inputDate = document.querySelector(".todayDate");
const inputValue = document.querySelector("#amount-input");
const inputUnitValue = document.querySelector("#unit-input");
const unitAmount = document.querySelector(".unitamount");
const numAmount = document.querySelector(".numAmount");
const btnEl = document.querySelector(".saveAmountButton");
const totalMessageVal = document.querySelector(".totalMonthlyAmount");
const dayAmountSaved = document.querySelector(".totalDayEarning");
const whatsappDivEl = document.querySelector(".whatsappDiv");
const closeBtnEl = document.querySelector(".closeBtn");
const whatsappNumsaveBtn = document.querySelector(".saveWhatsappNumButton");
const errMsg = document.querySelector(".errMessage");
const resetBtnEl = document.querySelector(".resetBtn");
const listUlEl = document.querySelector(".listUi");
const saveRecordBtn = document.querySelector(".saveRecordBtn");

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

// HISTORY FUNCTIONALITY
const listFunc = function () {
  listUlEl.innerHTML = "";

  arr2.forEach((val) => {
    const listHtml = ` 
            <div class="historyTableBody">
              <p class="dayValue">${val.theDay}</p>
              <p class="unitsValue">${val.inputedUnitValue}</p>
              <p class="amountText">#${val.totalAmountMade.toLocaleString()}</p>
            </div>
          
          `;

    listUlEl.insertAdjacentHTML("afterbegin", listHtml);
  });
};
listFunc();

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

  // TURNING THE INPUTED VALUES TO NUMBERS
  const inputedValue = +inputValue.value;
  const inputedUnitValue = +inputUnitValue.value;

  if (!inputedValue || inputedValue === 0) {
    alert("Please enter a value to calculate");
    return;
  }
  if (!inputedUnitValue || inputedUnitValue === 0) {
    alert("Please enter a unit value to calculate");
    return;
  }

  // MULTIPLYING THE INPUTED VALUES
  const totalAmountMade = inputedUnitValue * inputedValue;

  // SHOWING THE DAY'S AMOUNT MADE
  dayAmountSaved.textContent = `#${totalAmountMade.toLocaleString()}`;

  // SENDING THE VALUES TO CURRENT SESSION
  unitAmount.textContent = inputedUnitValue;
  numAmount.textContent = totalAmountMade.toLocaleString();

  // ADD VALUE TO ARR
  arr.push(totalAmountMade);

  /////////////////////////////////////////////////
  /////// SETTING THE LIST FUNCTIONALITY ///////
  /////////////////////////////////////////////////
  arr2.push({ theDay, totalAmountMade, inputedUnitValue });

  localStorage.setItem("listValue", JSON.stringify(arr2));
  listFunc();

  // SAVING THE INPUTED VALUE TO LOCAL STORAGE
  localStorage.setItem("inputValue", JSON.stringify(arr));

  // UPDATE UI AND CLEAR INPUT
  updateUI();
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

    // CLEARING CURRRENT SESSION
    unitAmount.textContent = "0";
    numAmount.textContent = "#0";

    // C. Update the UI to show 0
    updateUI();
  }
});

/////////////////////////////////////////////////
// SAVE TO WHATSAPP FUNCTIONALITY
/////////////////////////////////////////////////

saveRecordBtn.addEventListener("click", function () {
  if (unitAmount.textContent === "0") {
    alert("Empty unit value to save");

    return;
  }
  if (numAmount.textContent === "#0") {
    alert("Empty amount value to save");

    return;
  }
  saveToWhatsappFunc();
});

const saveToWhatsappFunc = function (total) {
  // REMOVE HIDDEN CLASS
  whatsappDivEl.classList.remove("hidden");

  ///////   SEND MESSAGE TO WHATSAPP
  whatsappNumsaveBtn.addEventListener("click", function () {
    // selecting element
    const whatsappNumInput = document.querySelector("#number").value;

    // CHECK THE VALUE OF INPUTTED NUMBER
    if (whatsappNumInput.length < 10 || whatsappNumInput.length > 13) {
      errMsg.classList.remove("hidden");
      errMsg.style.color = "red";
      errMsg.textContent = "Invalid number! Please enter 11 digit";
      return;
    } else {
      const totalAmount = `#${updateUI()}`;
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
