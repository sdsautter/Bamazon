var inquirer = require("inquirer");
var bamazonCustomer = require("./bamazonCustomer.js");
var bamazonManager = require("./bamazonManager.js");

inquirer.prompt([{
    type: "list",
    message: "Choose:",
    choices: ["Customer", "Manager"],
    name: "choice"
}]).then(function(answer) {
    switch (answer.choice) {
        case "Customer":
            bamazonCustomer();
            break;

        case "Manager":
            bamazonManager();
            break;
    }
});
