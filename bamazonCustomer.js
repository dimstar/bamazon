// questionaire wrapper
let Inquirer = require('inquirer');
// let Store = require('./store');
let Mysql = require('mysql');

connection = Mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'bamazon'
});

// log it up
let log = console.log;

log('Welcome to Bamazon!');

let storeView = [
    {
        type: 'list',
        name: 'product',
        message: 'Please Select a Product',
        choices: [],
        filter: function(val) {
            // parse out the proudct id
            let valSplit = val.split(' | ');
            return valSplit[(valSplit.length-1)];
        },
        transformer: function(val) {
            // parse out the proudct id
            let valSplit = val.split(' | ');
            return valSplit[valSplit.length];
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

let makeProductChoices = function(resultPackets, questions){
    for (const index in resultPackets) {
        if (resultPackets.hasOwnProperty(index)) {
            const product = resultPackets[index];
            questions[0].choices.push(`${product.product_name} | ${product.price} | ${product.item_id}`);
        }
    }
    return questions;
}

let storeCheckout = function(products){
    storeViewComplete = makeProductChoices(products, storeView);
    Inquirer.prompt(storeViewComplete).then(answers => {
        console.log('\nOrder receipt:');
        console.log(JSON.stringify(answers, null, '  '));
    });
}//storeFront

connection.connect();
connection.query('SELECT * FROM products', function (error, results, fields) {
    if (error) throw error;
    // console.log('The solution is: ', results);
    storeCheckout(results);
});
connection.end();

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