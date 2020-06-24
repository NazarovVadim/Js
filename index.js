'use strict';

const startButton = document.getElementById('start'),
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
    expensesTitle = document.querySelector('.expenses-title'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount');

let incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items');


const isNumber = function (n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

//Создание класса со свойствами 

class AppData {
    constructor(){
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
    }

    //методы
    start(){
        this.budjet = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudjet();
    this.showResult();
    salaryAmount.disabled = true;
    let inputs = document.querySelectorAll('input');
    inputs.forEach(item => {
        item.disabled = true;
    });
    periodSelect.disabled = false;
    startButton.style = 'display: none;';
    resetButton.style = 'display: block';
    }

    reset(){
        const inputs = document.querySelectorAll('input');
        inputs.forEach(item => {
            item.disabled = false;
            item.value = '';
        });
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 2){
            incomeItems[1].remove();            
        } else if(incomeItems.length === 3){
            incomeItems[1].remove();
            incomeItems[2].remove();
        }
        const expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 2){
            expensesItems[1].remove();
        } else if(expensesItems.length === 3){
            expensesItems[1].remove();
            expensesItems[2].remove();
        }
        periodAmount.textContent = '1';
        Object.assign(this, new AppData()); // сбрас свойств к 0
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
        startButton.disabled = true;
    }

    showResult(){
        const _this = this;
        budgetMonthValue.value = this.budgetMonth;
        budjetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();
        periodSelect.addEventListener('input', () =>{
            incomePeriodValue.value = _this.calcSavedMoney();
        });
    }

    addExpensesBlock(){
        let cloneExpensesItem = expensesItems[expensesItems.length-1].cloneNode(true);
        cloneExpensesItem.querySelectorAll('input')[0].value = '';
        this.addListenersStr(cloneExpensesItem.querySelectorAll('input')[0]);
        cloneExpensesItem.querySelectorAll('input')[1].value = '';
        this.addListenersNum(cloneExpensesItem.querySelectorAll('input')[1]);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddButton);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length ===3){
            expensesAddButton.style.display = 'none';
        }
    }

    getExpenses(){
        const _this = this;
        expensesItems.forEach(function(item){
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                _this.expenses[itemExpenses] = cashExpenses;
            }
        });
    }

    addIncomeBlock(){
        incomeItems = document.querySelectorAll('.income-items');   
        const cloneIncomeItem = incomeItems[incomeItems.length-1].cloneNode(true);
        cloneIncomeItem.querySelectorAll('input')[0].value = '';
        this.addListenersStr(cloneIncomeItem.querySelectorAll('input')[0]);
        cloneIncomeItem.querySelectorAll('input')[1].value = '';
        this.addListenersNum(cloneIncomeItem.querySelectorAll('input')[1]);
        incomeItems[incomeItems.length-1].parentNode.insertBefore(cloneIncomeItem, incomeAddButton);

        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length ===3){
            incomeAddButton.style.display = 'none';
        }
    }

    getIncome(){
        const _this = this;
        incomeItems.forEach(function(item){
            const itemIncome = item.querySelector('.income-title').value;
            const cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
                _this.income[itemIncome] = cashIncome;
            }
        });

        for(let key in this.income){
            this.incomeMonth += +this.income[key];
        }
    }

    getAddExpenses(){
        const addExpenses = additionalExpensesItem.value.split(',');
        const _this = this;
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== ''){
                _this.addExpenses.push(item);
            }
        });
    }

    getAddIncome(){
        const _this = this;
        additionalIncomeItems.forEach(function(item){
            const itemValue = item.value.trim();
            if(itemValue !== ''){
                _this.addIncome.push(itemValue);
            }
        });
    }

    getExpensesMonth(){
        for(let key in this.expenses){
            this.expensesMonth += +this.expenses[key];
        }
    }

    getBudjet(){
        this.budgetMonth =  this.budjet + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.ceil(this.budgetMonth / 30);
    }

    getTargetMonth(){
        return Math.ceil(targetAmount.value / Math.floor(this.budgetMonth));
    }

    getStatusIncome(){
        if (this.budgetDay > 1200) {
            console.log('у вас высокий уровень дохода');
        } else if (this.budgetDay >= 600 && this.budgetDay <= 1200){
            console.log('У вас средний уровень дохода');    
        } else if (this.budgetDay < 600 && this.budgetDay >= 0){
            console.log('К сожалению, ваш уровень дохода - ниже среднего');    
        } else {
            console.log('Что-то пошло не так');
        }
    }

    getInfoDeposit(){
        if (this.deposit){
            do{
                this.percentDeposit = prompt('Каков годовой процент?', 10);
            } while(!isNumber(this.percentDeposit));
            
            do{
                this.moneyDeposit = prompt('Какова сумма депозита', 10000);
            } while (!isNumber(this.moneyDeposit));
            
        }
    }

    calcSavedMoney(){
        return this.budgetMonth * periodSelect.value;
    }

    liveChangePeriod(){
        periodAmount.textContent = periodSelect.value;
    }

    startButtonCheck(){
        startButton.disabled = salaryAmount.value.trim() === '';
    }

    addListenersNum(input){
        input.addEventListener('input', function(){
            input.value=input.value.replace(/[^0-9]/g, '');
        });
    }

    addListenersStr(input){
        input.addEventListener('input', function(){
            input.value=input.value.replace(/[^а-яА-Я, ]/g, '');
        });
    }

    eventListeners(){
        startButton.addEventListener('click', this.start.bind(this));
        resetButton.addEventListener('click', this.reset);
        expensesAddButton.addEventListener('click', this.addExpensesBlock.bind(this));
        incomeAddButton.addEventListener('click', this.addIncomeBlock.bind(this));
        periodSelect.addEventListener('input', this.liveChangePeriod);
        salaryAmount.addEventListener('input', this.startButtonCheck);
        this.addListenersNum(document.querySelector('.income-amount'));
        this.addListenersNum(salaryAmount);
        this.addListenersNum(targetAmount);
        this.addListenersNum(document.querySelector('.expenses-amount'));
        this.addListenersStr(incomeItems[0].querySelector('.income-title'));
        this.addListenersStr(expensesItems[0].querySelector('.expenses-title'));
        this.addListenersStr(document.querySelectorAll('.additional_income-item')[0]);
        this.addListenersStr(document.querySelectorAll('.additional_income-item')[1]);
    }

}


const appData = new AppData();
appData.eventListeners();
