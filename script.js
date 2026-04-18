"use script";

// SELECTING ELEMENTS
const inputDate = document.querySelector(".todayDate");
const inputValue = document.querySelector(".input");
const btnEl = document.querySelector(".saveAmountButton");
const totalMessageVal = document.querySelector(".totalMessage");
const whatsappDivEl = document.querySelector(".whatsappDiv");
const closeBtnEl = document.querySelector(".closeBtn");
const whatsappNumsaveBtn = document.querySelector(".saveWhatsappNumButton");
const errMsg = document.querySelector(".errMessage");
const resetBtnEl = document.querySelector(".resetBtn")

// CREATING THE TODAY'S DATE

const theDay = new Date().toDateString();
inputDate.textContent = theDay;

// STARTING ARRAY

let arr = JSON.parse(localStorage.getItem("inputValue")) || [];
//   console.log("arr 1", arr);

//   UPDATING THE UI

const updateUI = function () {
  if (arr.length > 0) {
    const total = arr.reduce(function (acc, cur, i, arr) {
      return acc + cur;
    }, 0);

    //   console.log(total);
    totalMessageVal.textContent = `#${total}`;
    return total;
  } else {
    totalMessageVal.textContent = `#0`;
  }
};

updateUI();

//   INITIALIZING BUTTON FUNCTIONALITY

btnEl.addEventListener("click", function (e) {
  e.preventDefault();

  const inputedValue = +inputValue.value;

  if (!inputedValue) return;

  // ADD VALUE TO ARR
  arr.push(inputedValue);

  localStorage.setItem("inputValue", JSON.stringify(arr));

  // UPDATE UI AND CLEAR INPUT
  updateUI();
  inputValue.value = "";
  saveToWhatsappFunc();
});

// RESETTING THE DATA
resetBtnEl.addEventListener("click", function () {
  // Ask for confirmation so they don't lose data by mistake
  const confirmReset = confirm("Are you sure you want to delete all saved work amounts?");

  if (confirmReset) {
    // A. Clear LocalStorage
    localStorage.removeItem("inputValue");

    // B. Clear the Array in the code
    arr = [];

    // C. Update the UI to show 0
    updateUI();
  }
});



// SAVE TO WHATSAPP FUNCTIONALITY

const saveToWhatsappFunc = function (total) {
  // REMOVE HIDDEN CLASS
  whatsappDivEl.classList.remove("hidden");

  ///////   SEND MESSAGE TO WHATSAPP

  whatsappNumsaveBtn.addEventListener("click", function () {
    // selecting element
    const whatsappNumInput = document.querySelector(".whatsappNum").value;

    // CHECK THE VALUE OF INPUTTED NUMBER
    // console.log(checkWhatsappNumber.length);

    if (whatsappNumInput.length < 10 || whatsappNumInput.length > 13) {
      errMsg.classList.remove("hidden");
      errMsg.textContent = "Invalid number! Please enter 11 digit";
      return;
    } else {
      const totalAmount = `#${updateUI()}`;
    
      const checkWhatsappNumber = +whatsappNumInput;
      const rawMsg = `SAVED AMOUNT FOR *${theDay}* is : ${totalAmount}`;
      const encodeMsg = encodeURIComponent(rawMsg);

      window.location.href = `https://api.whatsapp.com/send?phone=234${checkWhatsappNumber}&text=${encodeMsg}`;

      //   https://api.whatsapp.com/send?phone=2349137746866&text=Name:%20${inputElValue}%20email:%20${emalElValue}%20phone:%20${phoneElValue}%20and%20message:%20${messageElValue}%20`;
      //   }
    }
  });

  //   CLOSE SAVE TO WHATSAPP WINDOW
  closeBtnEl.addEventListener("click", function () {
    whatsappDivEl.classList.add("hidden");
  });
};
