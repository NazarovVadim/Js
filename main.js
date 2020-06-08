let money = 150000,
    income = 'фриланс',
    addExpenses = 'Интернет, Коммуналка, Продукты',
    deposit = false,
    mission = 10000000,
    period = 12;


console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' долларов');

addExpenses.toLowerCase();
console.log(addExpenses.split(', '));



money = prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов?'),
    expenses2 = prompt('Введите обязательную статью расходов?'),
    amount1 = prompt('Во сколько это обойдется?'),
    amount2 = prompt('Во сколько это обойдется?');

let budjetMonth = money - amount1 - amount2;
console.log('бюджет на месяц: ' + budjetMonth);

console.log('цель будет достигнута за ' + Math.ceil(mission / budjetMonth) + ' месяцев');

let budjetDay = budjetMonth / 30;
console.log('дневной бюджет: ' + Math.floor(budjetDay));

if (budjetDay > 1200) {
    console.log('у вас высокий уровень дохода');
} else if (budjetDay >= 600 && budjetDay <= 1200){
    console.log('У вас средний уровень дохода');    
} else if (budjetDay < 600 && budjetDay >= 0){
    console.log('К сожалению, ваш уровень дохода - ниже среднего');    
} else {
    console.log('Что-то пошло не так');
}











