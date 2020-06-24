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
        this.getExpInc();
        this.getExpensesMonth();
        this.getAddExpInc();

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
        expensesAddButton.addEventListener('click', this.addBlock);//this.addExpensesBlock.bind(this)
        incomeAddButton.addEventListener('click', this.addBlock);
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
