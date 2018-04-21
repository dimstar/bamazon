// questionaire wrapper
let Inquirer = require('inquirer');
// let Store = require('./store');
ui.log.write('Welcome to Bamazon.');
let Mysql = require('mysql');
// log it up
let log = console.log;

connection.connect();

let storeView = [
    {
        type: 'input',
        name: 'product',
        message: 'Please Select a Product',
        // choices: ['1', '2', '3'],
        // filter: Number,
        validate: function(){},
        transformer: function(input) {
            return dostuff(input);
        }
    },
    {
        type: 'input',
        name: 'quantity',
        message: 'How many do you wish to buy?',
        validate: function(value) {
            var valid = !isNaN(parseFloat(value));
            return valid || 'Please enter a number';
        },
        filter: Number
    }
]

let makeProductChoices = function(resultPackets){

}

connection.connect();
connection.query('SELECT * FROM products', function (error, results, fields) {
    if (error) throw error;
    // console.log('The solution is: ', results);
    storeFront(results);
});
connection.end();

let storeFront = function(products){

    Inquirer.prompt(storeView).then(answers => {
        console.log('\nOrder receipt:');
        console.log(JSON.stringify(answers, null, '  '));
    });

}//storeFront

/*
INITIAL REQUIREMENTS
The app should then prompt users with two messages.
    The first should ask them the ID of the product they would like to buy.
    The second message should ask how many units of the product they would like to buy.

    Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.

However, if your store does have enough of the product, you should fulfill the customer's order.
    This means updating the SQL database to reflect the remaining quantity.
    Once the update goes through, show the customer the total cost of their purchase.
*/