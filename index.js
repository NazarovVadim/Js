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
    periodAmount = document.querySelector('.period-amount'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');

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
        this.getExpInc();
        this.getExpensesMonth();
        this.getInfoDeposit();
        this.getBudjet();
        this.getAddExpInc();
        this.showResult();
        this.addCookies();
        salaryAmount.disabled = true;
        let inputs = document.querySelectorAll('input');
        inputs.forEach(item => {
            item.disabled = true;
        });
        periodSelect.disabled = false;
        startButton.style = 'display: none;';
        resetButton.style = 'display: block';
    }

    removeCookies() {
        const day = -1;
        this.setCookies('budgetMonthValue', budgetMonthValue.value, day);
        this.setCookies('budjetDayValue', budjetDayValue.value, day);
        this.setCookies('expensesMonthValue', expensesMonthValue.value, day);
        this.setCookies('additionalIncomeValue', additionalIncomeValue.value, day);
        this.setCookies('additionalExpensesValue', additionalExpensesValue.value, day);
        this.setCookies('incomePeriodValue', incomePeriodValue.value, day);
        this.setCookies('targetMonthValue', targetMonthValue.value, day);
        this.setCookies('isLoad', 'true', day);
        localStorage.clear();
    }

    addCookies() {
        this.setCookies('budgetMonthValue', budgetMonthValue.value);
        this.setCookies('budjetDayValue', budjetDayValue.value);
        this.setCookies('expensesMonthValue', expensesMonthValue.value);
        this.setCookies('additionalIncomeValue', additionalIncomeValue.value);
        this.setCookies('additionalExpensesValue', additionalExpensesValue.value);
        this.setCookies('incomePeriodValue', incomePeriodValue.value);
        this.setCookies('targetMonthValue', targetMonthValue.value);
        this.setCookies('isLoad', 'true');
    
        localStorage.setItem('budgetMonthValue', budgetMonthValue.value);
        localStorage.setItem('budjetDayValue', budjetDayValue.value);
        localStorage.setItem('expensesMonthValue', expensesMonthValue.value);
        localStorage.setItem('additionalIncomeValue', additionalIncomeValue.value);
        localStorage.setItem('additionalExpensesValue', additionalExpensesValue.value);
        localStorage.setItem('incomePeriodValue', incomePeriodValue.value);
        localStorage.setItem('targetMonthValue', targetMonthValue.value);
        localStorage.setItem('isLoad', true);
    }

    setCookies(cookieName, cookieValue, exdays = 1) {
        let date = new Date();
        date.setTime(date.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ date.toUTCString();
        document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
    }

    load() {
        const arr = document.cookie.split(';');
        const newCookie = {};
        arr.forEach(el => {
        let item = el.trim().split('=');
        newCookie[item[0]] =  item[1];  
        if (localStorage.getItem(item[0]) !== item[1]) {
            this.removeCookies();
            return;
        }
        });
        
        
        if (localStorage.length > 0) {
            budgetMonthValue.value = localStorage.getItem('budgetMonthValue');
            budjetDayValue.value = localStorage.getItem('budjetDayValue');
            expensesMonthValue.value = localStorage.getItem('expensesMonthValue');
            additionalIncomeItems.value = localStorage.getItem('additionalIncomeItems');
            additionalIncomeValue.value = localStorage.getItem('additionalIncomeValue');
            additionalExpensesValue.value = localStorage.getItem('additionalExpensesValue');
            incomePeriodValue.value = localStorage.getItem('incomePeriodValue');
            targetMonthValue.value = localStorage.getItem('targetMonthValue');
            depositCheck.disabled = true;
            incomeAddButton.disabled = true;
            expensesAddButton.disabled = true;
            periodSelect.value = 1;

            const inputs = document.querySelectorAll('input');
            inputs.forEach(item => {
                item.disabled = true;
            });
            budgetMonthValue.disabled = true;
            budjetDayValue.disabled = true;
            expensesMonthValue.disabled = true;
            additionalIncomeValue.disabled = true;
            additionalExpensesValue.disabled = true;
            incomePeriodValue.disabled = true;
            targetMonthValue.disabled = true;
            startButton.style = 'display: none;';
            resetButton.style = 'display: block';
        }
    
    }

    reset(){
        this.removeCookies();

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
        incomeAddButton.disabled = false;
        expensesAddButton.disabled = false;
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

    addBlock(event){
        const str = event.target.className.split(' ')[1].split('_')[0];
        let cloneItem;
        switch (str){
            case 'expenses': 
                cloneItem = expensesItems[expensesItems.length-1].cloneNode(true);
                cloneItem.querySelectorAll('input')[0].value = '';

                cloneItem.querySelectorAll('input')[0].addEventListener('input', (e) => {
                    e.target.value = e.target.value.replace(/[^а-яА-Я, ]/g, '');
                });
                cloneItem.querySelectorAll('input')[1].value = '';

                cloneItem.querySelectorAll('input')[1].addEventListener('input', (e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                });
                expensesItems[0].parentNode.insertBefore(cloneItem, expensesAddButton);
                expensesItems = document.querySelectorAll('.expenses-items');
                if(expensesItems.length ===3){
                    expensesAddButton.style.display = 'none';
                }
                break;
            case 'income': 
                cloneItem = incomeItems[incomeItems.length-1].cloneNode(true);
                cloneItem.querySelectorAll('input')[0].value = '';
                cloneItem.querySelectorAll('input')[0].addEventListener('input', (e) => {
                    e.target.value = e.target.value.replace(/[^а-яА-Я, ]/g, '');
                });
                cloneItem.querySelectorAll('input')[1].value = '';

                cloneItem.querySelectorAll('input')[1].addEventListener('input', (e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                });
                incomeItems[incomeItems.length-1].parentNode.insertBefore(cloneItem, incomeAddButton);
        
                incomeItems = document.querySelectorAll('.income-items');
                if(incomeItems.length ===3){
                    incomeAddButton.style.display = 'none';
                }
                break;
        }
        
    }

    getExpInc(){
        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if(itemTitle !== '' && itemAmount !== ''){
                this[startStr][itemTitle] = itemAmount;
            }
        };

        incomeItems.forEach(count);
        expensesItems.forEach(count);

        for(let key in this.income){
            this.incomeMonth += +this.income[key];
        }
    }

    getAddExpInc(){
        const addExpenses = additionalExpensesItem.value.split(',');
        const _this = this;
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== ''){
                _this.addExpenses.push(item);
            }
        });

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
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth =  this.budjet + this.incomeMonth - this.expensesMonth + monthDeposit;
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
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value; 
            
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

    changePercent(){
        const valueSelect = this.value;
        if(valueSelect === 'other'){
            depositPercent.value = '';
            depositPercent.style.display = 'inline-block';
        }else{
            depositPercent.value = valueSelect;
            depositPercent.style.display = 'none';
        }

    }

    depositHandler(){
        if(depositCheck.checked){
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else{
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
    }

    eventListeners(){
        startButton.addEventListener('click', this.start.bind(this));
        resetButton.addEventListener('click', this.reset.bind(this));
        expensesAddButton.addEventListener('click', this.addBlock);
        incomeAddButton.addEventListener('click', this.addBlock);
        periodSelect.addEventListener('input', this.liveChangePeriod);
        salaryAmount.addEventListener('input', this.startButtonCheck);
        depositCheck.addEventListener('change', this.depositHandler.bind(this));
        depositPercent.addEventListener('input', () => {
            depositPercent.value = (depositPercent.value < 0) ? 0 :
                                    (depositPercent.value > 100) ? 100 : depositPercent.value;
        });
        this.addListenersNum(document.querySelector('.income-amount'));
        this.addListenersNum(salaryAmount);
        this.addListenersNum(targetAmount);
        this.addListenersNum(depositPercent);
        this.addListenersNum(document.querySelector('.expenses-amount'));
        this.addListenersStr(incomeItems[0].querySelector('.income-title'));
        this.addListenersStr(expensesItems[0].querySelector('.expenses-title'));
        this.addListenersStr(document.querySelectorAll('.additional_income-item')[0]);
        this.addListenersStr(document.querySelectorAll('.additional_income-item')[1]);
    }

}


const appData = new AppData();
appData.eventListeners();
appData.load();
