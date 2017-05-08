var inquirer = require("inquirer");
var mysql = require("mysql");

function bamazonCustomer() {
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "ScottSQL",
        database: "bamazon"
    });

    connection.connect(function(err) {
        if (err) throw err;
        showInventory();
    });

    function showInventory() {
        connection.query("SELECT * FROM products", function(err, response) {
            if (err) throw err;
            console.log("\n" + "#".repeat(50));
            console.log("#".repeat(50));
            console.log("\nITEMS AVAILABLE FOR SALE:\n");
            console.log("#".repeat(50));
            console.log("#".repeat(50));

            for (var i = 0; i < response.length; i++) {
                if (response[i].stock_quantity > 0) {
                    console.log("\nProduct Id: " + response[i].item_id + "\nItem: " + response[i].product_name + "\nPrice: $" + response[i].price + "\n");
                    console.log("#".repeat(50));
                }
            }
            return productPurchase();
        })
    }

    function productPurchase() {
        inquirer.prompt([{
            type: "input",
            message: "Which product ID would you like to purchase?",
            name: "productID"
        }, {
            type: "input",
            message: "How many would you like to purchase?",
            name: "quantity"
        }]).then(function(answers) {

            connection.query("SELECT * FROM products WHERE item_id =?", [answers.productID], function(err, response) {
                if (parseInt(response[0].stock_quantity) >= parseInt(answers.quantity)) {
                    var stockLeft = parseInt(response[0].stock_quantity) - parseInt(answers.quantity);

                    connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?;", [stockLeft, answers.productID], function(err, response) {});
                    var totalPrice = parseInt(answers.quantity) * response[0].price;

                    console.log("\nx" + answers.quantity + " " + response[0].product_name + " = $" + totalPrice + "\n");
                    console.log("#".repeat(45));

                    inquirer.prompt([{
                        type: "confirm",
                        message: "Would you like to order something else?",
                        name: "another"
                    }]).then(function(answer) {
                        if (answer.another) {
                            productPurchase();
                        } else {
                            console.log("\nThank you for shopping with us!");
                            process.exit();
                        }
                    });

                } else {
                    console.log("Insufficient quantity!");
                    return productPurchase();
                }
            });
        });
    }
}

module.exports = bamazonCustomer;
