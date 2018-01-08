var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazonDB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  starting();
});

// function to handle display of available products, accept product selection, and prompt for quantity 
function starting() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which item they would like to buy
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: "What item would you like to buy?"
        },
        {
          name: "quantity",
          type: "input",
          message: "How many would you like to buy?"
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem;

        // Loop to assign the chosen product to the chosenItem variable.
        for (var i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.choice) {
            chosenItem = results[i];
          }
        }

        // determine if we have available stock for the specified product
        if (chosenItem.stock_quantity >= parseInt(answer.quantity)) {
          // Enough quantity so determine new stock number
          var updatedQuantity =chosenItem.stock_quantity - parseInt(answer.quantity);
          console.log("ENOUGH QUANTITY******");
          connection.query(
            // SQL query to update new stock quantity
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: updatedQuantity
              },
              {
                product_name: chosenItem.product_name
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Purchase completed successfully!");
              console.log("Final price is " + parseInt(answer.quantity) * chosenItem.price);
              console.log("Make an additinal purchase below?");
              console.log("-----------------------------------");
              starting();
            }
          );
        }
        else {
          // bid wasn't high enough, so apologize and start over
          console.log("Not enough in stock to fulfill request. Try again...");
          starting();
        }
      });
  });
}
