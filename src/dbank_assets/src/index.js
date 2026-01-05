import {dbank} from "../../declarations/dbank";

window.addEventListener("load" , async ()=>{
  const currentAmount = await dbank.checkBalance();
  document.getElementById("value").innerText = Math.round(currentAmount*100)/100;
});


const topUpInput = document.getElementById("input-amount");
const withdrawInput = document.getElementById("withdrawal-amount");

// When user types in Top Up, disable Withdraw immediately
topUpInput.addEventListener("input", () => {
  if (topUpInput.value.trim() !== "") {
    withdrawInput.disabled = true;
  } else {
    withdrawInput.disabled = false;
  }
});

// When user types in Withdraw, disable Top Up immediately
withdrawInput.addEventListener("input", () => {
  if (withdrawInput.value.trim() !== "") {
    topUpInput.disabled = true;
  } else {
    topUpInput.disabled = false;
  }
});



document.querySelector("form").addEventListener("submit", async (event)=>{
  event.preventDefault();
  document.getElementById("submit-btn").setAttribute("disabled", "disabled");


  //top up and withdraw
  const inputAmount =  parseFloat(document.getElementById("input-amount").value);
  document.getElementById("input-amount").value="";

  const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);
  document.getElementById("withdrawal-amount").value="";


  if(inputAmount > 0){
    await dbank.topUp(inputAmount);

  }else if(outputAmount>0){
    await dbank.withdraw(outputAmount);
  }else{
    alert("topup amount should be greater than 0");
  }
  const currentAmount = await dbank.checkBalance();
  document.getElementById("value").innerText = currentAmount;



  document.getElementById("submit-btn").removeAttribute("disabled");
});