// db wrapper
let Mysql = require('mysql');

module.exports = class{
    constructor(uiController){
        this.storeView = [
            {
                type: 'input',
                name: 'product',
                message: 'Please Select a Product',
                // choices: ['1', '2', '3'],
                // filter: Number,
                validate: function(value) {
                    // let store = new Store();
                    // add method which lists product ids, if not selected, list ids
                    
                    // valid must be true or message comes
                    var valid = !isNaN(parseFloat(value));
                    return valid || 'Please enter a number';
                },
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
        this.conn = Mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '',
            database : 'bamazon'
        });
        this.ui = uiController;
        this.returnProducts(this.conn, this.ui, this.storeView);
    }

    returnProducts(connection, callback, ui){
        connection.connect();
 
        connection.query('SELECT * FROM products', function (error, results, fields) {
            if (error) throw error;
            // console.log('The solution is: ', results);
            callback(results, ui);
        });
        connection.end();
        
    }
}