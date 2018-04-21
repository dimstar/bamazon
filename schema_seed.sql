DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

use bamazon;

CREATE TABLE products(
    item_id INT(16) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(32),
    department_name VARCHAR(32),
    price DECIMAL(16,2),
    stock_quantity INT(16),
    PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES( "Rhino Repelent","Safari", 14.00, 24);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES( "Giraffe Trebuchet","Safari", 60.00, 2);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES( "Crocodile Gauntlet","Safari", 22.99, 6);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES( "Assault Waffle","Women", 56.99, 500);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES( "Tutu","Men", 32.99, 16);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES( "Deoderant","Men", 3.29, 64);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES( "Holy Mickey's Hand Grenade","Kids", 12.32, 9);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES( "Skid Row Barbi","Kids", 22.99, 100);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES( "My Pet Monster","Kids", 18.99, 30);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES( "Garbage Pale Kid","Kids", 18.99, 30);