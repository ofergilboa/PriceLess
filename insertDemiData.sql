-- -- USE priceless;


-- -- INSERT INTO user (name, email, phone_number, password)
-- -- VALUES ('Ofer Gilboa', 'ofer1gilboa@gmail.com', 0528283312, '3408068');

-- -- INSERT INTO user (name, email, phone_number, password)
-- -- VALUES ('Hadar Alon', 'hadaralon3@gmail.com', 0528528402, '99035132');

-- -- INSERT INTO user (name, email, phone_number, password)
-- -- VALUES ('Zohar Pfeffer', 'pfzohar@gmail.com', 0526052344, '116079428');

-- -- INSERT INTO user (name, email, phone_number, password)
-- -- VALUES ('Liat Cohen', 'liatcohen9@gmail.com', 0504211600, '3321456');


-- -- INSERT INTO concert
-- -- VALUES(null, 'Mercedes Band', '2019-09-07 08:30:00', 'Israel', 'Tel Aviv', 'Habarbi', 3, 100, 150, 'A really great band', 1, 'active', 'https://sheva7.co.il/wp-content/uploads/2017/12/mercedes-band.jpg', '2019-08-27 12:58:00', 0, '2019-09-07 08:30:00');

-- -- INSERT INTO concert
-- -- VALUES(null, 'Beyonce', '2019-09-14 20:15:00', 'USA', 'New York City', 'Hard Rock Cafe', 2, 200, 300, 'The one and only, BEYONCE', 2, 'active', 'https://static.standard.co.uk/s3fs-public/thumbnails/image/2017/09/04/13/beyonce.jpg', '2019-08-27 13:44:00', 0, '2019-09-14 20:15:00');

-- -- INSERT INTO concert
-- -- VALUES(null, 'Eminem', '2019-09-20 22:45:00', 'Israel', 'Tel Aviv', 'Kuli Alma', 4, 250, 400, '', 3, 'active', 'https://i1.wp.com/www.ambientlightblog.com/wp-content/uploads/2019/03/030219-WELLINGTON-PRESS-440.jpg?resize=2048%2C1365&ssl=1', '2019-08-28 19:04:00', 1, '2019-09-18 15:00:00');


-- -- INSERT INTO favorite VALUES(1, 2);
-- -- INSERT INTO favorite VALUES(1, 3);
-- -- INSERT INTO favorite VALUES(2, 3);
-- -- INSERT INTO favorite VALUES(3, 1);
-- -- INSERT INTO favorite VALUES(4, 1);
-- -- INSERT INTO favorite VALUES(4, 2);
-- -- INSERT INTO favorite VALUES(4, 3);


-- -- INSERT INTO bid (amount, concert_id, bidder)
-- -- VALUES (90, 3, 1);

-- -- INSERT INTO bid (amount, concert_id, bidder)
-- -- VALUES (95, 3, 2);

-- -- INSERT INTO bid (amount, concert_id, bidder)
-- -- VALUES (110, 3, 4);


-- -- SELECT * FROM user;
-- -- SELECT * FROM concert;
-- -- SELECT * FROM favorite;
-- -- SELECT * FROM bid;


-- -- DELETE FROM bid;
-- -- DELETE FROM concert;
-- -- DELETE FROM favorite;
-- -- DELETE FROM user;


-- -- INSERT INTO concert
-- -- VALUES(null, 'Mercedes Band', '2019-09-07 08:30:00', 'Israel', 'Tel Aviv', 'Habarbi', 3, 100, 150, 'A really great band', 1, 'active', 'https://sheva7.co.il/wp-content/uploads/2017/12/mercedes-band.jpg', '2019-08-27 12:58:00', 0, '2019-09-07 08:30:00');
-- USE priceless;

-- -- INSERT INTO concert
-- -- VALUES(null, 'Beyonce', '2019-09-14 20:15:00', 'USA', 'New York City', 'Hard Rock Cafe', 2, 200, 300, 'The one and only, BEYONCE', 2, 'active', 'https://static.standard.co.uk/s3fs-public/thumbnails/image/2017/09/04/13/beyonce.jpg', '2019-08-27 13:44:00', 0, '2019-09-14 20:15:00');
-- USE priceless;

-- INSERT INTO concert
-- VALUES(null, 'Elvis', '2019-10-20 22:00:00', 'USA', 'LA', 'Barbi', 4, 200, 400, '', 3, 'active', 'https://www.billboard.com/files/styles/article_main_image/public/media/Elvis-Presley-1969-billboard-1548.jpg' '2019-08-28 19:04:00', 1, '2019-09-18 15:00:00');
-- -- INSERT INTO concert
-- -- VALUES(null, 'Lady Gaga', '2020-02-14 21:00:00', 'Israel', 'Jerusalem', 'Barbi', 4, 200, 400, '', 3, 'active', 'https://ewscripps.brightspotcdn.com/dims4/default/42525b5/2147483647/strip/true/crop/640x360+0+34/resize/1280x720!/quality/90/?url=https%3A%2F%2Fmediaassets.thedenverchannel.com%2Fphoto%2F2017%2F02%2F06%2FGettyImages-633950318_1486412789540_54670504_ver1.0_640_480.jpg,'2019-08-28 19:04:00', 0, '2019-10-18 15:00:00');