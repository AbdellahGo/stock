DROP DATABASE IF EXISTS stock;
CREATE DATABASE stock;
USE stock;
-- ─────────────────────────────────────────
-- 1. USER  (no dependencies)
-- ─────────────────────────────────────────
CREATE TABLE user (
    id_user   INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50)  NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ─────────────────────────────────────────
-- 2. categories  (no dependencies)
-- ─────────────────────────────────────────
CREATE TABLE categories (
    id   INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50)  NOT NULL
);

-- ─────────────────────────────────────────
-- 3. suppliers  (no dependencies)
-- ─────────────────────────────────────────
CREATE TABLE suppliers (
    id      INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name    VARCHAR(50)  NOT NULL,
    phone   VARCHAR(20)  NOT NULL,
    email   VARCHAR(100) NOT NULL
);

-- ─────────────────────────────────────────
-- 4. products  (depends on categories + suppliers)
-- ─────────────────────────────────────────
CREATE TABLE products (
    id          INT UNSIGNED   NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100)   NOT NULL,
    price       DECIMAL(10, 2) NOT NULL,
    quantity    INT UNSIGNED   NOT NULL DEFAULT 0,
    category_id INT UNSIGNED   NOT NULL,
    supplier_id INT UNSIGNED   NOT NULL,
    id_user     INT UNSIGNED   NOT NULL,

   CONSTRAINT fk_id_user
        FOREIGN KEY (id_user) REFERENCES user(id_user)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_product_category
        FOREIGN KEY (category_id) REFERENCES categories(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_product_supplier
        FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

-- ─────────────────────────────────────────
-- 5. product_details  (depends on products)
-- ─────────────────────────────────────────
CREATE TABLE product_details (
    id          INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_id  INT UNSIGNED NOT NULL UNIQUE,
    description TEXT,
    image_url   VARCHAR(255),
    created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_detail_product
        FOREIGN KEY (product_id) REFERENCES products(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO user (username, email, password) VALUES('abdellah', 'a@gmail.com', '123123123');

INSERT INTO categories (name) VALUES
    ('Electronics'),
    ('Furniture'),
    ('Stationery');

INSERT INTO suppliers (name, phone, email) VALUES
    ('TechCorp',    '+33 6 11 22 33 44', 'contact@techcorp.com'),
    ('OfficeWorld',  '+33 6 55 66 77 88', 'sales@officeworld.com');

INSERT INTO products (name, price, quantity, category_id, supplier_id, id_user) VALUES
    ('Wireless Keyboard', 49.99,  15, 1, 1, 1),
    ('Standing Desk',     299.00,  4, 2, 2, 1),
    ('Ballpoint Pen Pack', 4.50,  100, 3, 2, 1);

INSERT INTO product_details (product_id, description, image_url) VALUES
    (1, 'Compact wireless keyboard with USB receiver.', 'https://placehold.co/400x300?text=Keyboard'),
    (2, 'Height-adjustable standing desk, oak finish.', 'https://placehold.co/400x300?text=Desk'),
    (3, 'Pack of 10 blue ballpoint pens.',              'https://placehold.co/400x300?text=Pens');
