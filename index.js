'use strict';

let startButton = document.getElementById('start'),
    resetButton = document.getElementById('cancel'),
    incomeAddButton = document.getElementsByTagName('button')[0],
    expensesAddButton = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.getElementsByClassName('result-total')[0],
    budjetDayValue = document.getElementsByClassName('result-total')[1],
    expensesMonthValue = document.getElementsByClassName('result-total')[2],
    additionalIncomeValue = document.getElementsByClassName('result-total')[3],
    additionalExpensesValue = document.getElementsByClassName('result-total')[4],
    incomePeriodValue = document.getElementsByClassName('result-total')[5],
    targetMonthValue = document.getElementsByClassName('result-total')[6],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeItems = document.querySelectorAll('.income-items'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount');

let isNumber = function (n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};



let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budjet: 0,
    budgetDay: 0,
    budgetMonth : 0,
    expensesMonth: 0,
    incomeMonth: 0,
    start : function(){
        appData.budjet = +salaryAmount.value;

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudjet();

        appData.showResult();

        salaryAmount.disabled = true;
        let inputs = document.querySelectorAll('input');
        inputs.forEach(item => {
            item.disabled = true;
        });
        periodSelect.disabled = false;

        startButton.style = 'display: none;';
        resetButton.style = 'display: block';

    },
    reset: function(){
        let inputs = document.querySelectorAll('input');
        inputs.forEach(item => {
            item.disabled = false;
            item.value = '';
        });

        this.income = {};
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budjet = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.incomeMonth = 0;
        periodSelect.value = 1;

        budgetMonthValue.disabled = true;
        budjetDayValue.disabled = true;
        expensesMonthValue.disabled = true;
        additionalIncomeValue.disabled = true;
        additionalExpensesValue.disabled = true;
        incomePeriodValue.disabled = true;
        targetMonthValue.disabled = true;


        startButton.style = 'display: block;';
        resetButton.style = 'display: none';
    },
    showResult: function(){

        budgetMonthValue.value = this.budgetMonth;
        budjetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();

        periodSelect.addEventListener('input', () =>{
            incomePeriodValue.value = this.calcSavedMoney();
            
        });

        
    },
    addExpensesBlock: function(){
        let cloneExpensesItem = expensesItems[expensesItems.length-1].cloneNode(true);
        cloneExpensesItem.querySelectorAll('input')[0].value = '';
        appData.addListenersStr(cloneExpensesItem.querySelectorAll('input')[0]);
        cloneExpensesItem.querySelectorAll('input')[1].value = '';
        appData.addListenersNum(cloneExpensesItem.querySelectorAll('input')[1]);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddButton);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length ===3){
            expensesAddButton.style.display = 'none';
        }
    },
    getExpenses: function(){
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    addIncomeBlock: function(){   
        let cloneIncomeItem = incomeItems[incomeItems.length-1].cloneNode(true);
        cloneIncomeItem.querySelectorAll('input')[0].value = '';
        this.addListenersStr(cloneIncomeItem.querySelectorAll('input')[0]);
        cloneIncomeItem.querySelectorAll('input')[1].value = '';
        this.addListenersNum(cloneIncomeItem.querySelectorAll('input')[1]);
        incomeItems[incomeItems.length-1].parentNode.insertBefore(cloneIncomeItem, incomeAddButton);

        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length ===3){
            incomeAddButton.style.display = 'none';
        }
    },
    getIncome: function(){
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
                appData.income[itemIncome] = cashIncome;
            }
        });

        for(let key in this.income){
            this.incomeMonth += +this.income[key];
        }

        
    },
    getAddExpenses: function(){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== ''){
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function(){
        additionalIncomeItems.forEach(function(item){
            let itemValue = item.value.trim();
            if(itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        });
    },
    getExpensesMonth: function(){
        for(let key in this.expenses){
            this.expensesMonth += +this.expenses[key];
        }
    },
    getBudjet: function(){
        this.budgetMonth =  this.budjet + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.ceil(this.budgetMonth / 30);
    },
    getTargetMonth: function(){
        return Math.ceil(targetAmount.value / Math.floor(this.budgetMonth));
    },
    getStatusIncome: function(){
        if (appData.budgetDay > 1200) {
            console.log('у вас высокий уровень дохода');
        } else if (appData.budgetDay >= 600 && appData.budgetDay <= 1200){
            console.log('У вас средний уровень дохода');    
        } else if (appData.budgetDay < 600 && appData.budgetDay >= 0){
            console.log('К сожалению, ваш уровень дохода - ниже среднего');    
        } else {
            console.log('Что-то пошло не так');
        }
    },
    getInfoDeposit: function(){
        if (appData.deposit){
            do{
                appData.percentDeposit = prompt('Каков годовой процент?', 10);
            } while(!isNumber(appData.percentDeposit));
            
            do{
                appData.moneyDeposit = prompt('Какова сумма депозита', 10000);
            } while (!isNumber(appData.moneyDeposit));
            
        }
    },
    calcSavedMoney: function(){
        return this.budgetMonth * periodSelect.value;
    },
    liveChangePeriod: function(){
        periodAmount.textContent = periodSelect.value;
    },
    startButtonCheck: function(){
        startButton.disabled = salaryAmount.value.trim() === '';
    },
    addListenersNum: function(input){
        input.addEventListener('input', function(){
            input.value=input.value.replace(/[^0-9]/g, '');
        });
    },
    addListenersStr: function(input){
        input.addEventListener('input', function(){
            input.value=input.value.replace(/[^а-яА-Я, ]/g, '');
        });
    }
    
};



startButton.addEventListener('click', appData.start.bind(appData));
resetButton.addEventListener('click', appData.reset.bind(appData));
expensesAddButton.addEventListener('click', appData.addExpensesBlock);
incomeAddButton.addEventListener('click', appData.addIncomeBlock.bind(appData));
periodSelect.addEventListener('input', appData.liveChangePeriod);
salaryAmount.addEventListener('input', appData.startButtonCheck);
appData.addListenersNum(document.querySelector('.income-amount'));
appData.addListenersNum(salaryAmount);
appData.addListenersNum(targetAmount);
appData.addListenersNum(document.querySelector('.expenses-amount'));
appData.addListenersStr(incomeItems[0].querySelector('.income-title'));
appData.addListenersStr(expensesItems[0].querySelector('.expenses-title'));
appData.addListenersStr(document.querySelectorAll('.additional_income-item')[0]);
appData.addListenersStr(document.querySelectorAll('.additional_income-item')[1]);



// if (appData.getTargetMonth() <= 0){
//     console.log('Цель не будет достигнута');
// } else {
//     console.log('цель будет достигнута за ' + appData.getTargetMonth() + ' месяцев');
// }

// appData.getStatusIncome();

// console.log('Наша программа включает в себя данные: ');

// for(let key in appData){
//     console.log(key + ':' + appData[key]);
// }

// let string = '';
// for (let str of appData.addExpenses){
//     str = str.trim();
//     str = str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
//     string += str + ', ';
    
// }
// console.log(string.substring(0, string.length-2));


// console.log(appData.addExpenses.join(', '));








