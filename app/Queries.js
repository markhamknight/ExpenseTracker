import Realm from 'realm'
import moment from 'moment/src/moment';
import _ from 'lodash';
let realm = new Realm({
  schema: 
  [
    {
      name: 'Expenses', 
      properties: 
      {
          id: 'int',
          value: 'int', 
          category: 'string', 
          description: 'string', 
          date: 'string', 
      }
    },
    {
        name: 'Categories', 
        properties: 
        { 
            id: 'int',
            name: 'string',
        }
    },
  ]
});


var dateToday = moment().format('YYYY-MM-DD');
export default class Queries {
    static getAllExpenses() {
        let data = realm.objects('Expenses');
        let allExpenses = [];
        let expenseMap = {}; // Create the blank map
        for (let i=0; i < data.length; i++) {
          allExpenses.push(data[i]);
      }
      //  console.log(allExpenses);
      allExpenses.forEach(function(expense) {
        if (expense.date == dateToday) { // filter by Today's Date
            if (!expenseMap[expense.category]) {
                expenseMap[expense.category] = [];
            }
            expenseMap[expense.category].push(expense);
        }

    }); 
      for (var category in expenseMap) {
          var totalPriceJSON = {};
          var total=0;
          expenseMap[category].forEach(function(expense) {
            if (expense.date == dateToday) { // filter by Today's Date
              total += expense.value;
      }
  })
          totalPriceJSON.totalPrice = total;
          expenseMap[category].unshift(totalPriceJSON);
      }
      return expenseMap;
  }
  static getExpensesForDaily(date) {
    //console.log(date);
    let data = realm.objects('Expenses').sorted('date');
    let allExpenses = [];
    let expenseMap = {}; // Create the blank map
        for (let i=0; i < data.length; i++) {
            if(date == data[i].date) {
                allExpenses.push(data[i]);
            }
        }
    //console.log(allExpenses);
    allExpenses.forEach(function(expense) {
        if (!expenseMap[expense.category]) {
            expenseMap[expense.category] = [];
        }
        expenseMap[expense.category].push(expense);
    }); 
    for (var category in expenseMap) {
        var totalPriceJSON = {};
        var total=0;
        expenseMap[category].forEach(function(expense) {
              total += expense.value;
        })
        totalPriceJSON.totalPrice = total;
        expenseMap[category].unshift(totalPriceJSON);
      }
      //console.log(expenseMap);
      return expenseMap;
  }
  static getExpensesForCategory(category) {
    let data = realm.objects('Expenses').sorted('date');
    let month = moment().format('MMMM YYYY');
    let allExpenses = [];
        let expenseMap = {}; // Create the blank map
        for (let i=0; i < data.length; i++) {
            let thisMonth = moment(data[i].date).format('MMMM YYYY');
            if(month == thisMonth && data[i].category == category) {
                allExpenses.push(data[i]);
            }
        }
        //console.log(allExpenses);
        allExpenses.forEach(function(expense) {
            if (!expenseMap[expense.date]) {
                expenseMap[expense.date] = [];
            }
            expenseMap[expense.date].push(expense);
        }); 
        for (var date in expenseMap) {
          var totalPriceJSON = {};
          var total=0;
          expenseMap[date].forEach(function(expense) {
              total += expense.value;
          })
          totalPriceJSON.totalPrice = total;
          expenseMap[date].unshift(totalPriceJSON);
      }
      return expenseMap;

  }

  static getExpensesForMonth() {
    let data = realm.objects('Expenses').sorted('date');
    let month = moment().format('MMMM YYYY');
    let allExpenses = [];
    let expenseMap = {};
    for (let i=0; i < data.length; i++) {
        let thisMonth = moment(data[i].date).format('MMMM YYYY');
        if(month == thisMonth) {
            allExpenses.push(data[i]);
        }
    }
    //console.log(allExpenses);
    allExpenses.forEach(function(expense) {
        if (!expenseMap[expense.date]) {
            expenseMap[expense.date] = [];
        }
        expenseMap[expense.date].push(expense);
    }); 
    for (var date in expenseMap) {
      var totalPriceJSON = {};
      var total=0;
      expenseMap[date].forEach(function(expense) {
          total += expense.value;
      })
      totalPriceJSON.totalPrice = total;
      expenseMap[date].unshift(totalPriceJSON);
  }
  //console.log(expenseMap);
}
static getAllCategories() {
    //console.log('test');
    let data = realm.objects('Categories');
    let categories = [];
    for (let i=0; i < data.length; i++) {
      categories.push(data[i]);
  }
  //console.log(categories);
  return categories;
};

static getTotalForToday() {
    let today = "'"+moment().format('YYYY-MM-DD')+"'";
    let filter = "date = "+ today;
    let data = realm.objects('Expenses').filtered(filter);
    let total = 0;
    for (let i=0; i < data.length; i++) {
            //console.log(data[i]);
            total += data[i].value;
        }
        return total;
    }
    static getTotalForMonth() {
        let month = moment().format('MMMM YYYY');
        let data = realm.objects('Expenses');
        let total = 0;
        for(let i=0; i<data.length;i++) {
            let thisMonth = moment(data[i].date).format('MMMM YYYY');
            if(thisMonth == month) {
                total += data[i].value;
            }
        }
        return total;
    }
    static getTotalPerDay() {
        let month = moment().format('MMMM YYYY');
        let data = realm.objects('Expenses').sorted('date');
        let allExpenses = [];
        let expenses = [];
        for(let i=0; i<data.length;i++) {
           allExpenses.push(data[i]);
       }
       allExpenses = _.uniqBy(allExpenses,'date');
       for(let i=0; i<allExpenses.length;i++) {
           let tmp = {
            name: data[i].date,
            total: this.getTotalForDay(data[i].date),
            }
        expenses.push(tmp);
        }
        return expenses;
    }
static getTotalPerCategory() {
    let month = moment().format('MMMM YYYY');
    let data = realm.objects('Categories');
    console.log(data);
    let categories = [];
    let expenses = [];
    for(let i=0; i<data.length;i++) {
        //console.warn(data[i]);
        let totals = this.getTotal(data[i].name,month);
        console.log(totals);
        if(totals != 0) {
            let tmp = {
                name: data[i].name,
                total: totals,
            }
            expenses.push(tmp);
        }
    }
    console.log(expenses);
    return expenses;
}
static getTotal(category,month) {
    let data = realm.objects('Expenses');
    let total = 0;
    for(let i=0; i<data.length;i++) {
        let thisMonth = moment(data[i].date).format('MMMM YYYY');
        let thisCategory = data[i].category;
        if(thisMonth == month && thisCategory == category) {
            total += data[i].value;
        }
    }
    return total;
}
static getTotalForDay(day) {
    let data = realm.objects('Expenses').sorted('date');
    let total = 0;
    for(let i=0; i<data.length;i++) {
        if(data[i].date == day) {
            total += data[i].value;
        }
    }
    return total;
}
static addExpense(data) {
    let today = moment().format('YYYY-MM-DD');
    let id =  realm.objects('Expenses').length + 1;
    //console.log(id);
    let newExpense = {
        id: id,
        value: +data.value,
        category: data.category,
        description: data.description,
        date: today,
    };
    realm.write(() => {
        realm.create('Expenses', newExpense);
    });
    //console.log(newExpense);
}
static addCategory(data) {
    let id =  realm.objects('Categories').length + 1;
    console.log(data);
    let newCategory = {
        id: id,
        name: data,
    };
    realm.write(() => {
        realm.create('Categories', newCategory);
    });
    //console.log(newExpense);
}
static categoryExists(data) {
    //let filter = "'name = "+data+"'";
    let tmp = realm.objects('Categories');
    for(let i=0; i<tmp.length; i++) {
        if(tmp[i].name.toUpperCase() === data.toUpperCase()){
            return true;
        }
    }
    return false;
}
static addDefaultCategories() {
    let categories = realm.objects('Categories');
    //let expenses = realm.objects('Expenses');
    realm.write(() => {
        /*realm.delete(categories);
        //realm.delete(expenses);
        realm.create('Categories', {
            id: 1,
            name: 'Food',
        });
        realm.create('Categories', {
            id: 2,
            name: 'Transportation',
        });
        realm.create('Categories', {
            id: 3,
            name: 'Misc',
        });*/
    })
}


}