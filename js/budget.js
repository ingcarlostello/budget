//**********************Regular Expression to currency conversion*************************
function numberWithDots(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

//**********************Incomes Const**********************************************************************************************
const txtDescripIncome = document.getElementById("descriptionIncome");
const txtIncomeValue = document.getElementById("incomeValue");
const btnAdd = document.getElementById("addIncome");
const span = document.getElementById("total-money");
const spanList = document.getElementsByClassName(
  "badge badge-primary badge-pill"
);
const btnDelete = document.getElementsByClassName("far fa-trash-alt");
//******************************************************************************************************************************* */

//**********************Expenses Const*********************************************************************************************
const txtExpenseDescrip = document.getElementById("expenseDescription");
const txtExpenseValue = document.getElementById("expenseValue");
const btnAddExpense = document.getElementById("addExpense");
const spanlistExpense = document.getElementsByClassName(
  "badge badge-primary badge-pill expense"
);
const spanExpenses = document.getElementById("total-expenses");
const btnDeleteExpense = document.getElementsByClassName(
  "far fa-trash-alt expense"
);
//*******************************************************************************************************************************/

//**********************Modal Variables*********************************************************************************************
// const btnCloseModal = document.getElementById("closeModal");
// const modalBudget = document.getElementById("modalBudget");
// const modalMessage = document.getElementById("modalMessage");

const btnCloseModal = document.getElementById("closeModal");
const modalBudget = document.getElementById("simpleModal");
const modalMessage = document.getElementById("modalMessage");

//**************************************************** ***************************************************************************/

const spanBalance = document.getElementById("total-balance");
let j;
let arrayValueIncomes = [];
let arrayExpensesValue = [];
let totalMonthExpenses;
let totalMonthIncome;
let monthlyIncomes = [];
let monthlyExpenses = [];

//**************************************************************************************************************************************** */
                                                          // INCOMES FUNCTIONS
//****************************************************************************************************************************************

//***************add income to list********************
function addIncome() {
  let descriIncome = txtDescripIncome.value;
  let IncomeValue = txtIncomeValue.value;

  let listItem = document.createElement("li");

  if (txtDescripIncome.value === "") {
    showModal("Income Description is empty");
  } else if (txtIncomeValue.value === "") {
    showModal("Income Value is empty");
  } else {
    listItem.className =
      "list-group-item d-flex justify-content-between align-items-center";
    listItem.innerHTML = `${firstCapitalLetter(
      descriIncome
    )} <span class="badge badge-primary badge-pill">$ ${numberWithDots(
      IncomeValue
    )}</span><a href="#" class="delete-income" ><i class="far fa-trash-alt"></i></a>`;

    document.getElementById("listIncomes").appendChild(listItem);
    dataStorage();
    sumIncomes();
    txtDescripIncome.value = "";
    txtIncomeValue.value = "";
    txtDescripIncome.focus();
    

    for (let i = 0; i < spanList.length; i++) {
      spanList[i].setAttribute("data-id", i);
    }

    for (let j = 0; j < btnDelete.length; j++) {
      btnDelete[j].setAttribute("data-btnDeleteId", j);
    }
  }
  
  totalBalance();
  deleteIncome();
  moveProgressBar();
  removeData(myChart);
  addData(myChart, totalMonthIncome);
}

//***************Delete income from the list********************
function deleteIncome() {
  const list = document.querySelectorAll(".list-group-item");
  let tab = [];

  for (i = 0; i < list.length; i++) {
    tab.push(list[i]);
  }
  for (let i = 0; i < btnDelete.length; i++) {
    btnDelete[i].onclick = function() {
      deleting(event);
      list[i].remove();

      totalBalance();
      removeData3(myChart);
      addData(myChart, totalMonthIncome);
      //addData3(myChart, totalMonthIncome);
      moveProgressBar();
    };
  }
}

//***********Sum all Incomes************************
function sumIncomes() {
  let item = txtIncomeValue.value;
  arrayValueIncomes.push(parseInt(item));
  let sum = arrayValueIncomes.reduce((a, b) => a + b);
  span.innerHTML = sum;
  totalMonthIncome = sum;
  return totalMonthIncome;
}

//***********Delete the incomes from array************************
function deleting(event) {
  //get incomes from local storage
  let getIncomes;
  getIncomes = JSON.parse( localStorage.getItem('incomes') );

  for (i = 0; i < btnDelete.length; i++) {
    let btnId = event.target.dataset.btndeleteid;
    if (btnId) {
      console.log(`es el boton ${btnId}`);
      arrayValueIncomes.splice(btnId, 1);
      //delete income from local storage
      getIncomes.splice(btnId, 1)
      localStorage.setItem('incomes', JSON.stringify(getIncomes) );
      console.table(getIncomes)
      let sum = arrayValueIncomes.reduce((a, b) => a + b, 0); //=====> here it put the zero to provide an initialValue  as the neutral element of the operator see the link (https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Errors/Reduce_of_empty_array_with_no_initial_value)
      span.innerHTML = sum;
      totalMonthIncome = sum;
      
      for (let j = 0; j < btnDelete.length; j++) {
        if (btnDelete[j].dataset.btndeleteid > btnId) {
          btnDelete[j].setAttribute("data-btnDeleteId", j - 1);
        }
      }
    }
    break;
  }
  console.log(arrayValueIncomes);
}

//***********Allow add a item pressing enter key************************
function enterKey(e) {
  if (e.keyCode === 13) {
    addIncome();
  }
}

//**************************************************************************************************************************************** */
                                                            // EXPENSES FUNCTIONS
//****************************************************************************************************************************************
function addExpense() {
  let expenseDescription = txtExpenseDescrip.value;
  let expenseValue = txtExpenseValue.value;
  let listExpenses = document.createElement("li");
  let i;

  if (txtExpenseDescrip.value === "") {
    showModal("Expense Description is empty")
    
  } else if (txtExpenseValue.value === "") {
    showModal("Expense Value is empty")
   
  } else {
    listExpenses.className =
      "list-group-item expense d-flex justify-content-between align-items-center";
    listExpenses.innerHTML = `${firstCapitalLetter(
      expenseDescription
    )} <span class="badge badge-primary badge-pill expense">$ ${numberWithDots(
      expenseValue
    )}</span>  <a href="#" class="delete-expense" ><i class="far fa-trash-alt expense"></i></a>`;

    document.getElementById("expensesList").appendChild(listExpenses);
    addExpensesToLocalStorage()
    sumExpenses();
    txtExpenseDescrip.value = "";
    txtExpenseValue.value = "";
    txtExpenseDescrip.focus();

    for (let y = 0; y < spanlistExpense.length; y++) {
      spanlistExpense[y].setAttribute("data-expense", y);
    }

    for (let j = 0; j < btnDeleteExpense.length; j++) {
      btnDeleteExpense[j].setAttribute("data-btnDeleteIdExpense", j);
    }
  }
  totalBalance();
  deleteExpense();
  moveProgressBar();
  removeDataFromExpensesChart(myChart);
  addDataToExpensesChart(myChart, totalMonthExpenses);
}

function deleteExpense() {
  const listExpense = document.querySelectorAll(".list-group-item.expense");
  let tabExpense = [];
  for (i = 0; i < listExpense.length; i++) {
    tabExpense.push(listExpense[i]);
  }
  for (let i = 0; i < btnDeleteExpense.length; i++) {
    btnDeleteExpense[i].onclick = function() {
      deletingExpense(event);
      listExpense[i].remove();
      totalBalance();
      moveProgressBar();
      let elem = document.getElementById("progressBar");
      elem.style.width = 0 + "%";
      elem.innerHTML = 0 * 1 + "%";
      removeDataFromExpensesChart(myChart);
      addDataToExpensesChart(myChart, totalMonthExpenses);
    };
  }
}

function sumExpenses() {
  let item = txtExpenseValue.value;
  arrayExpensesValue.push(parseInt(item));
  let sum = arrayExpensesValue.reduce((a, b) => a + b);
  spanExpenses.innerHTML = sum;
  totalMonthExpenses = sum;
  return totalMonthExpenses;
}

function deletingExpense(event) {
  //get expenses from local storage
  let getExpenses;
  getExpenses = JSON.parse( localStorage.getItem('expenses') );

  for (i = 0; i < btnDeleteExpense.length; i++) {
    let btnId = event.target.dataset.btndeleteidexpense;
    if (btnId) {
      console.log(`es el boton ${btnId}`);
      arrayExpensesValue.splice(btnId, 1);
      //delete expense from local storage
      getExpenses.splice(btnId, 1)
      localStorage.setItem('expenses', JSON.stringify(getExpenses) );
      console.table(getExpenses)
      let sum = arrayExpensesValue.reduce((a, b) => a + b, 0); //=====> here it put the zero to provide an initialValue  as the neutral element of the operator see the link (https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Errors/Reduce_of_empty_array_with_no_initial_value)
      spanExpenses.innerHTML = sum;
      totalMonthExpenses = sum;
      for (let j = 0; j < btnDeleteExpense.length; j++) {
        if (btnDeleteExpense[j].dataset.btndeleteidexpense > btnId) {
          btnDeleteExpense[j].setAttribute("data-btnDeleteIdExpense", j - 1);
        }
      }
    }
    break;
  }
  console.log(arrayExpensesValue);
}

function expenseEnterKey(e) {
  if (e.keyCode === 13) {
    addExpense();
    totalBalance();
  }
}

//**************************************************************************************************************************************** */
                                                          //OTHER FUNCTIONS
//****************************************************************************************************************************************

//***********Show balance between (total income - total expenses)************************
function totalBalance() {
  let balance = span.innerHTML - spanExpenses.innerHTML;
  spanBalance.innerHTML = balance;
}

//***********show a progress bar with spent percentage************************
function moveProgressBar() {
  var elem = document.getElementById("progressBar");
  var width = 0;
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= thePercentage()) {
      clearInterval(id);
    } else if (thePercentage() > 100) {
      clearInterval(id);
      showModal("A lot of expenses; you might consider reducing expenses. 😬")
    } else {
      width++;
      elem.style.width = width + "%";
      elem.innerHTML = width * 1 + "%";
    }
  }
}

//***********Calculate percentage incomes spent************************
function thePercentage(percentage) {
  try {
    percentage = (spanExpenses.textContent / span.textContent) * 100;
    //console.log(percentage);
    if (percentage === Infinity || isNaN(percentage)) {
      percentage = 0;
      //showModal("First add incomes")
      //throw "First add incomes";
    }
  } catch (error) {
    alert(`Error ${error}`);
  }
  return percentage;
}

//**************************************************************************************************************************************** */
                                                                //CHART
//****************************************************************************************************************************************

var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Incomes", "Expenses"],
    datasets: [
      {
        label: "Budget",
        data: new Array(2),
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255,99,132,1)"],
        borderWidth: 1
      }
    ]
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }
});

function addData(chart, data) {
  chart.data.datasets.forEach(dataset => {
    dataset.data.unshift(data);

    let valor = dataset.data[0];
    console.log(valor);
    if (dataset.data.indexOf(valor) !== -1) {
      console.log(`Exist the value ${valor}`);
      console.log(dataset.data);
    }
  });
  chart.update();
}
function removeData(chart) {
  chart.data.datasets.forEach(dataset => {
    dataset.data.shift();
  });
  chart.update();
}
function addDataToExpensesChart(chart, data) {
  chart.data.datasets.forEach(dataset => {
    dataset.data.push(data);
    console.log(dataset.data[1]);
    let valor2 = dataset.data[1];
    console.log(valor2);

    if (dataset.data.indexOf(valor2) !== -1) {
      console.log(`existe el valor ${valor2}`);
      // dataset.data.pop();
      // console.log(`valor ${valor} eliminado`)
      console.log(dataset.data);
    }
  });
  chart.update();
}
function removeDataFromExpensesChart(chart) {
  chart.data.datasets.forEach(dataset => {
    dataset.data.pop();
  });
  chart.update();
}
function addData3(chart, data) {
  chart.data.datasets.forEach(dataset => {
    dataset.data.unshift(data);

    let valor3 = dataset.data[0];
    console.log(valor3);
    if (dataset.data.indexOf(valor3) !== -1) {
      console.log(`Exist the value ${valor3}`);
      console.log(dataset.data);
    }
  });
  chart.update();
}
function removeData3(chart) {
  chart.data.datasets.forEach(dataset => {
    dataset.data.shift();
  });
  chart.update();
}

//**************************************************************************************************************************************** */
                                                            //MODAL FUNCTIONS
//****************************************************************************************************************************************
function showModal(massage) {  
  modalMessage.innerHTML = massage;
  modalBudget.style.display = "block";
}

function closeModal() {
  modalBudget.style.display = "none";
}



//**************************************************************************************************************************************** */
                                                            //LOCAL STORAGE
//****************************************************************************************************************************************

//*************************Local storage functions Incomes************************************** */

function dataStorage(){
  const infoIncomes = {
    descriIncome: txtDescripIncome.value,
    IncomeValue: txtIncomeValue.value   
  }

  if(localStorage.getItem('incomes') === null) {
    console.log("local storage empty you can add")
    monthlyIncomes.push(infoIncomes);
    console.table(monthlyIncomes)
    localStorage.setItem("incomes", JSON.stringify(monthlyIncomes))  
  }else{
    let getIncomes;
    getIncomes = JSON.parse( localStorage.getItem('incomes') )
    getIncomes.push(infoIncomes)
    localStorage.setItem("incomes", JSON.stringify(getIncomes))  
  }  
 }

function getDataFromLocalStorage(){
  let getIncomes;
  
  if(localStorage.getItem('incomes') === null) {
    console.log("local storage empty")
    getIncomes = [];
  } else {
    getIncomes = JSON.parse( localStorage.getItem('incomes') );
  } 
  arrayValueIncomes = [];
  getIncomes.forEach(function (currentValue){  
    let listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between align-items-center";
    listItem.innerHTML = `${firstCapitalLetter(currentValue.descriIncome)} <span class="badge badge-primary badge-pill">$ ${numberWithDots(currentValue.IncomeValue)}</span><a href="#" class="delete-income" ><i class="far fa-trash-alt"></i></a>`;
    document.getElementById("listIncomes").appendChild(listItem);    
    arrayValueIncomes.push(parseInt(currentValue.IncomeValue));
    console.log(arrayValueIncomes)
    let sum = arrayValueIncomes.reduce((a, b) => a + b);
    span.innerHTML = sum;
    totalMonthIncome = sum;
    //return totalMonthIncome;
  })
  removeData(myChart);
  addData(myChart, totalMonthIncome)
  for (let i = 0; i < spanList.length; i++) {
    spanList[i].setAttribute("data-id", i);
  }
  for (let j = 0; j < btnDelete.length; j++) {
    btnDelete[j].setAttribute("data-btnDeleteId", j);
  }
  deleteIncome();
}
//********************************************************************************************** */



//*************************Local storage functions Expenses************************************** */
function addExpensesToLocalStorage(){
  const infoExpenses = {
    expenseDescription: txtExpenseDescrip.value,
    expenseValue: txtExpenseValue.value  
  }

  if(localStorage.getItem('expenses') === null) {
    console.log("local storage empty you can add")
    monthlyExpenses.push(infoExpenses);
    console.table(monthlyExpenses)
    localStorage.setItem("expenses", JSON.stringify(monthlyExpenses))  
  }else{
    let getExpenses;
    getExpenses = JSON.parse( localStorage.getItem('expenses') )
    getExpenses.push(infoExpenses)
    localStorage.setItem("expenses", JSON.stringify(getExpenses))  
  }  
 }

 function getExpensesFromLocalStorage(){
  let getExpenses;
  
  if(localStorage.getItem('expenses') === null) {
    console.log("local storage empty")
    getExpenses = [];
  } else {
    getExpenses = JSON.parse( localStorage.getItem('expenses') );
  } 
  arrayExpensesValue = []
  getExpenses.forEach(function(currentValue){
    let listExpenses = document.createElement("li");
    listExpenses.className ="list-group-item expense d-flex justify-content-between align-items-center";
    listExpenses.innerHTML = `${firstCapitalLetter(currentValue.expenseDescription)} <span class="badge badge-primary badge-pill expense">$ ${numberWithDots(currentValue.expenseValue)}</span>  <a href="#" class="delete-expense" ><i class="far fa-trash-alt expense"></i></a>`;
    document.getElementById("expensesList").appendChild(listExpenses);
    arrayExpensesValue.push(parseInt(currentValue.expenseValue))
    let sum = arrayExpensesValue.reduce((a, b) => a + b);
    spanExpenses.innerHTML = sum;
    totalMonthExpenses = sum;
  })
  removeDataFromExpensesChart(myChart);
  addDataToExpensesChart(myChart, totalMonthExpenses);
  for (let y = 0; y < spanlistExpense.length; y++) {
    spanlistExpense[y].setAttribute("data-expense", y);
  }

  for (let j = 0; j < btnDeleteExpense.length; j++) {
    btnDeleteExpense[j].setAttribute("data-btnDeleteIdExpense", j);
  }
  deleteExpense();
  totalBalance();
  moveProgressBar();
 }
 //********************************************************************************************** */






//**************************************************************************************************************************************** */
                                                            //EVENT LISTENERS
//****************************************************************************************************************************************
btnAdd.addEventListener("click", addIncome);
txtIncomeValue.addEventListener("keyup", enterKey);

btnAddExpense.addEventListener("click", addExpense);
txtExpenseValue.addEventListener("keyup", expenseEnterKey);

btnCloseModal.addEventListener("click", closeModal);

//**********************Turn the first letter into uppercase.*************************
function firstCapitalLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

document.addEventListener('DOMContentLoaded', getDataFromLocalStorage);
document.addEventListener('DOMContentLoaded', getExpensesFromLocalStorage);
