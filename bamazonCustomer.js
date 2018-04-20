// db wrapper
let Mysql = require('mysql');
// questionaire wrapper
let Inquirer = require('inquirer');
// log it up
let log = console.log;

// STORE OBJECT this talks to the database, require it into this one
    // ref this setup here for architecture .../codebcamp/htdocs/goodstuff/architecture

// CUSTOMER VIEW
// devise questions as object
// fire questions
    // take answer, call method

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