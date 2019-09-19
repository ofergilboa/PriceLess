USE priceless;

-- CREATE TABLE user (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(30) NOT NULL,
--     email VARCHAR(50),
--     phone_number VARCHAR(30), 
--     password VARCHAR(50) NOT NULL
-- );

-- CREATE TABLE concert (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     artist VARCHAR(50) NOT NULL,
--     date DATETIME NOT NULL,
--     country VARCHAR(30) NOT NULL,
--     city VARCHAR(30) NOT NULL,
--     venue VARCHAR(50) NOT NULL,
--     num_of_tickets INT NOT NULL,
--     asked_price FLOAT NOT NULL,
--     original_price FLOAT,
--     additional_info VARCHAR(300),
--     seller INT NOT NULL,
--     status ENUM ('active', 'sold', 'deleted'),
--     img_url VARCHAR(300) NOT NULL,
--     uploaded_at DATETIME NOT NULL,
--     is_bid BOOLEAN,
--     ends_at DATETIME,

--     FOREIGN KEY (seller) REFERENCES user (id)
-- );

-- CREATE TABLE favorite (
--     user_id INT,
--     concert_id INT,

--     FOREIGN KEY (user_id) REFERENCES user (id),
--     FOREIGN KEY (concert_id) REFERENCES concert (id)
-- );

-- CREATE TABLE bid (
--     amount INT,
--     concert_id INT,
--     bidder INT,

--     FOREIGN KEY (concert_id) REFERENCES concert (id),
--     FOREIGN KEY (bidder) REFERENCES user (id)
-- );


-- DROP TABLE concert;
-- DROP TABLE user

