let money = prompt('Ваш месячный доход?'),
    income = 'фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 10000000,
    period = 12;

function showTypeOf(data){
    console.log(typeof data);
}
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
addExpenses.toLowerCase();
console.log(addExpenses.split(', '));

let expenses1 = prompt('Введите обязательную статью расходов?'),
    amount1 = prompt('Во сколько это обойдется?'),
    expenses2 = prompt('Введите обязательную статью расходов?'),
    amount2 = prompt('Во сколько это обойдется?');

function getExpensesMonth (){
    return amount + amount2; 
}
console.log('расходы за месяц: ' + getExpensesMonth());

let accumulatedMonth = function getAccumulatedMonth(){
    return money - amount1 - amount2;
};

function getTargetMonth(){
    return Math.ceil(mission / accumulatedMonth);
}

console.log('цель будет достигнута за ' + getTargetMonth() + ' месяцев');

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











