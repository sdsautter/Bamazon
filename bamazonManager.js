var inquirer = require("inquirer");
var mysql = require("mysql");

function bamazonManager() {
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "ScottSQL",
        database: "bamazon"
    });

    connection.connect(function(err) {
        if (err) throw err;
        managerAction();
    });

    function managerAction() {
        inquirer.prompt([{
            type: "list",
            message: "Choose managerial activity:",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
            name: "action"
        }]).then(function(user) {
            switch (user.action) {
                case "View Products for Sale":
                    viewProducts();
                    break;

                case "View Low Inventory":
                    lowInventory();
                    break;

                case "Add to Inventory":
                    addInventory();
                    break;

                case "Add New Product":
                    newProduct();
                    break;
            }
        });
    }

    function viewProducts() {
        connection.query("SELECT * FROM products", function(err, response) {
            if (err) throw err;
            console.log("\n" + "#".repeat(50));
            console.log("#".repeat(50));
            console.log("\nITEMS AVAILABLE FOR SALE:\n");
            console.log("#".repeat(50));
            console.log("#".repeat(50));


            for (var i = 0; i < response.length; i++) {
                console.log("\nProduct Id: " + response[i].item_id + "\nItem: " + response[i].product_name + "\nPrice: $" + response[i].price + "\nQuantity: " + response[i].stock_quantity + "\n");
                console.log("#".repeat(50));
            }
            managerAction();
        });
    }

    function lowInventory() {
        connection.query("SELECT * FROM products", function(err, response) {
            if (err) throw err;
            console.log("\n" + "#".repeat(50));
            console.log("#".repeat(50));
            console.log("\nLOW INVENTORY ITEMS:\n");
            console.log("#".repeat(50));
            console.log("#".repeat(50));

            for (var i = 0; i < response.length; i++) {
                if (response[i].stock_quantity <= 5) {
                    console.log("\nProduct Id: " + response[i].item_id + "\nItem: " + response[i].product_name + "\nPrice: $" + response[i].price + "\nQuantity: " + response[i].stock_quantity + "\n");
                    console.log("#".repeat(50));
                }
            }
            managerAction();

        });
    }

    function addInventory() {
        var inventoryArray = [];
        connection.query("SELECT * FROM products", function(err, response) {
            response.forEach(function(element) {
                inventoryArray.push(element.product_name);
            })

            inquirer.prompt([{
                type: "list",
                message: "Add Inventory To:",
                choices: inventoryArray,
                name: "product"
            }, {
                type: "input",
                message: "How many would you like to add: ",
                name: "quantity"
            }]).then(function(answer) {
                for (var i = 0; i < response.length; i++) {
                    if (answer.product === response[i].product_name) {
                        var totalInventory = response[i].stock_quantity + parseInt(answer.quantity);

                        connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?;", [totalInventory, response[i].item_id], function(err, response) {
                            console.log(answer.product + " Total: " + totalInventory);
                            managerAction();

                        });
                    }
                }
            });

        });
    }

    function newProduct() {
        var departmentArray = [];

        connection.query("SELECT * FROM products", function(err, response) {

            for (var i = 0; i < response.length; i++) {
                if (departmentArray.indexOf(response[i].department_name) < 0) {
                    departmentArray.push(response[i].department_name);
                }
            }

            departmentArray.push("Other");

            inquirer.prompt([{
                type: "input",
                message: "Which product would you like to add: ",
                name: "product_name"
            }, {
                type: "input",
                message: "What is the price for this item: $",
                name: "price"
            }, {
                type: "input",
                message: "How many are in stock: ",
                name: "stock_quantity"
            }, {
                type: "list",
                message: "Department: ",
                choices: departmentArray,
                name: "department_name"
            }]).then(function(answer) {

                if (answer.department_name === "Other") {
                    inquirer.prompt([{
                        type: "input",
                        message: "Which department: ",
                        name: "new_department"
                    }]).then(function(user) {

                        connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ( ? , ? , ? , ?)", [answer.product_name, capitalizeFirstLetter(user.new_department), answer.price, answer.stock_quantity], function(err, response) {
                            if (err) throw err;
                            console.log("Added!");
                            console.log("#".repeat(50));

                            managerAction();

                        });
                    });
                } else {
                    connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ( ? , ? , ? , ?)", [answer.product_name, answer.department_name, answer.price, answer.stock_quantity], function(err, response) {
                        if (err) throw err;
                        console.log("Added!");
                        console.log("#".repeat(50));

                        managerAction();

                    })
                }

            });

        });
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

}

module.exports = bamazonManager;
