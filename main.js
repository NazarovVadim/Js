let isNumber = function (n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    income = 'фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 10000000,
    period = 12;

let start = function(){
    do{
        money = prompt('Ваш месячный доход?');
    } while (!isNumber(money));
};
start();

function showTypeOf(data){
    console.log(typeof data);
}
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
addExpenses.toLowerCase();
console.log(addExpenses.split(', '));

let expenses = [];
function getExpensesMonth (){
    let sum = 0,
    amount;

    for(let i = 0; i < 2; i++){
        expenses[i] = prompt('Введите обязательную статью расходов?');
        
        do{
            amount = prompt('Во сколько это обойдется?');
        } while (!isNumber(amount));
        sum += +amount;
    }
    console.log(sum);
    
    return sum; 
}

let expensesAmount = getExpensesMonth();
console.log('расходы за месяц: ' + expensesAmount);

function getAccumulatedMonth(){
    return money - expensesAmount;
}
let accumulatedMonth =  getAccumulatedMonth();

function getTargetMonth(){
    return Math.ceil(mission / accumulatedMonth);
}

if (getTargetMonth() <= 0){
    console.log('Цель не будет достигнута');
} else {
    console.log('цель будет достигнута за ' + getTargetMonth() + ' месяцев');
}

let budjetDay = accumulatedMonth / 30;
console.log('дневной бюджет: ' + Math.floor(budjetDay));

let getStatusIncome = function (){
    if (budjetDay > 1200) {
        console.log('у вас высокий уровень дохода');
    } else if (budjetDay >= 600 && budjetDay <= 1200){
        console.log('У вас средний уровень дохода');    
    } else if (budjetDay < 600 && budjetDay >= 0){
        console.log('К сожалению, ваш уровень дохода - ниже среднего');    
    } else {
        console.log('Что-то пошло не так');
    }
};

getStatusIncome();











