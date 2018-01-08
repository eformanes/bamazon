DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT,
  stock_quantity INT,
  PRIMARY KEY (item_id)
);


Insert into products (product_name, department_name, price, stock_quantity)
Values ("Nintendo Switch", "video games", 300, 20),
("SNES Classic", "video games", 80, 2), 
("Nintendo Wii U", "video games", 100, 50),
("NES Classic", "video games", 150, 10),
("PS4", "video games", 200, 20),
("XBox One", "video games", 200, 20),
("Water", "food", 1, 100),
("Cabbage", "food", 1, 100),
("Carrot", "food", 1, 100),
("Banana", "food", 1, 100),
("iPhone", "electronics", 800, 200),
("Android", "electronics", 800, 200),
("MacBook Pro", "electronics", 3000, 100)