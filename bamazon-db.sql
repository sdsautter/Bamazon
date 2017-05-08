CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products (
	item_id INT(100) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT(100) NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Carrot", "Grocery", "0.87", "150");
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Banana", "Grocery", "0.92", "250");
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Cereal", "Grocery", "4.55", "100");
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Playstation 4 Pro", "Electronics", "387.88", "45");
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("PSVR", "Electronics", "399.99", "15");
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("3D Hologram Projector", "Electronics", "870354.03", "3");
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Stretch Lance Armstrong", "Toys", "18.87", "23");
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Spiddley Tigglers", "Toys", "4.98", "82");
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Real Magic Shart", "Toys", "6.66", "66");
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Bidet", "Bath", "24.99", "50");
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Shower Tablet", "Bath", "187.24", "30");

SELECT * FROM products;