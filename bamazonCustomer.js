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

// GLOBAL
let Cart = {
    item_id: 0,
    product_name: '',
    stock_quantity: 0,
    price: 0
}

let getLabelVal = function(label_vals, index){
    let label_and_val = label_vals[index].split(':');
    return label_and_val[1];
}

let storeView = [
    {
        type: 'list',
        name: 'product',
        message: 'Please Select a Product',
        choices: [],
        filter: function(val) {
            // parse out the proudct id
            let val_split = val.split(' | ');
            // create global cart hack
            Cart.item_id = getLabelVal(val_split, 3);
            Cart.price = getLabelVal(val_split, 1);
            Cart.product_name = getLabelVal(val_split, 0);
            Cart.stock_quantity = getLabelVal(val_split, 2);
            return val;
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
    },
    {
        type: 'confirm',
        name: 'check_quantity',
        message: 'Sorry! Not enough inventory for this item.',
        when: function(answers){
            return answers.quantity > Cart.stock_quantity;
        }
    }
]

let makeProductChoices = function(resultPackets, questions){
    for (const index in resultPackets) {
        if (resultPackets.hasOwnProperty(index)) {
            const product = resultPackets[index];
            questions[0].choices.push(`name:${product.product_name} | price:${product.price} | qty:${product.stock_quantity} | id:${product.item_id}`);
        }
    }
    return questions;
}

let storeCheckout = function(products){
    storeViewComplete = makeProductChoices(products, storeView);
    Inquirer.prompt(storeViewComplete).then(answers => {
        console.log('\nOrder receipt:');
        console.log(JSON.stringify(answers, null, '  '));
        log(Cart);
    });
}//storeFront

connection.connect();
connection.query('SELECT * FROM products', function (error, results, fields) {
    if (error) throw error;
    // console.log('The solution is: ', results);
    storeCheckout(results);
});
connection.end();

// output global cart

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