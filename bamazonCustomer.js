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

// GLOBAL Cart Hack
let Cart = {
    item_id: 0,
    product_name: '',
    stock_quantity: 0,
    price: 0,
    checkout: false,
    new_stock: 0
}

let getLabelVal = function(label_vals, index){
    // parse out the proudct id
    let split_vals = label_vals.split(' | ');
    let label_and_val = split_vals[index].split(':');
    return label_and_val[1];
}

let storeView = [
    {
        type: 'list',
        name: 'product',
        message: 'Please Select a Product',
        choices: [],// these are written into the obj literal later on in makeProductChoices
        filter: function(val) {
            // set global cart hack
            Cart.item_id = getLabelVal(val, 3);
            Cart.price = getLabelVal(val, 1);
            Cart.product_name = getLabelVal(val, 0);
            Cart.stock_quantity = getLabelVal(val, 2);
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
        name: 'check_quantity_good',
        message: 'Submit your order?',
        when: function(answers){
             // set global cart hack
            Cart.checkout = true;
            // get the current product qty in stock
            let product_qty = getLabelVal(answers.product, 2);
            // get the requested stock from user
            Cart.new_stock = product_qty - answers.quantity;
            return answers.quantity <= Cart.stock_quantity;
        }
    },
    {
        type: 'confirm',
        name: 'check_quantity_bad',
        message: 'Sorry! Not enough inventory for this item. (hit enter to start over)',
        when: function(answers){
            return answers.quantity > Cart.stock_quantity;
        }
    }
]

/**
 * Take in db data and formulate ui for storefront
 * @param {*} resultPackets 
 * @param {*} questions 
 */
let makeProductChoices = function(resultPackets, questions){
    for (const index in resultPackets) {
        if (resultPackets.hasOwnProperty(index)) {
            const product = resultPackets[index];
            questions[0].choices.push(`name:${product.product_name} | price:${product.price} | qty:${product.stock_quantity} | id:${product.item_id}`);
        }
    }
    return questions;
}
/**
 * Take a cart and update the database
 * @param {*} cart 
 */
let updateStore = function(cart){
        // update the database with the cart
        if(cart.checkout === true){
            let update_query = `UPDATE products`+
            ` SET stock_quantity = ${cart.new_stock}`+
            ` WHERE item_id = ${cart.item_id};`;
            // connection.connect();
            connection.query( update_query, function (error, results, fields) {
                if (error) throw error;
                if(results.changedRows === 1){
                    console.log('Stock updated! Have a nice day!');
                }
                // storeCheckout(results);
            });
            connection.end();
        }
}

/**
 * Take products and display a storefront
 * @param {*} products 
 */
let storeCheckout = function(products){
    storeViewComplete = makeProductChoices(products, storeView);
    Inquirer.prompt(storeViewComplete).then(answers => {
        if (answers.check_quantity_bad) {
            return startCheckout();
          } else {
            console.log('\nOrder receipt:');
            console.log(JSON.stringify(answers, null, '  '));
            // log(Cart);
            updateStore(Cart);
          }
        
    });
}//storeFront

// connection.connect();
let startCheckout = function(){
    connection.query('SELECT * FROM products', function (error, results, fields) {
        if (error) throw error;
        // console.log('The solution is: ', results);
        storeCheckout(results);
    });
}

// init this sucker!
startCheckout();



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