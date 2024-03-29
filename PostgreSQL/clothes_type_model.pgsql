CREATE TABLE IF NOT EXISTS top_feature (
                t_f_code CHAR(50) NOT NULL,
                t_f_hood BOOLEAN NOT NULL,
                t_f_kara BOOLEAN NOT NULL,
                t_f_zipper BOOLEAN NOT NULL,
                t_f_logo BOOLEAN NOT NULL,
                t_f_printer BOOLEAN NOT NULL,
                CONSTRAINT t_f_code_pk PRIMARY KEY (t_f_code));
-- CREATE SEQUENCE IF NOT EXISTS top_sequence START 1;
CREATE TABLE IF NOT EXISTS clothes_top (
                t_serial SERIAL PRIMARY KEY,
                t_code VARCHAR(50) NOT NULL,
                t_shape VARCHAR(50) NOT NULL,
                t_classification VARCHAR(50) NOT NULL,
                t_color VARCHAR(50) NOT NULL,
                t_f_code INT NOT NULL);

CREATE TABLE IF NOT EXISTS bottom_feature (
                b_f_code CHAR(50) NOT NULL,
                b_f_jogger BOOLEAN NOT NULL,
                b_f_pocket BOOLEAN NOT NULL,
                CONSTRAINT b_f_code_pk PRIMARY KEY (b_f_code));   
-- CREATE SEQUENCE IF NOT EXISTS bottom_sequence START 1;
CREATE TABLE IF NOT EXISTS clothes_bottom (
                b_serial SERIAL PRIMARY KEY,
                b_code VARCHAR(50) NOT NULL,
                b_shape VARCHAR(50) NOT NULL,
                b_classification VARCHAR(50) NOT NULL,
                b_color VARCHAR(50) NOT NULL,
                b_f_code INT NOT NULL);
----------------------------------------------------------------------------------------------------------------
SELECT SUBSTRING('t_01_code' FROM POSITION('_' IN 't-01_code') + 1) AS extracted_code;

SELECT (SELECT
    CASE WHEN t_f_hood THEN '1' ELSE '0' END ||
    CASE WHEN t_f_kara THEN '1' ELSE '0' END ||
    CASE WHEN t_f_zipper THEN '1' ELSE '0' END ||
    CASE WHEN t_f_logo THEN '1' ELSE '0' END ||
    CASE WHEN t_f_printer THEN '1' ELSE '0' END AS binary_representation
FROM
    top_feature)::int;

SELECT
    CASE WHEN t_f_hood THEN 16 ELSE 0 END +
    CASE WHEN t_f_kara THEN 8 ELSE 0 END +
    CASE WHEN t_f_zipper THEN 4 ELSE 0 END +
    CASE WHEN t_f_logo THEN 2 ELSE 0 END +
    CASE WHEN t_f_printer THEN 1 ELSE 0 END AS decimal_representation
FROM
    top_feature
WHERE t_f_code = '0';

SELECT * FROM clothes_top;
SELECT * FROM top_feature;

-- true, false를 0과 1로 변환
SELECT
    CASE WHEN t_f_kara THEN 1 ELSE 0 END AS boolean_as_integer
FROM
    top_feature;

SELECT SUBSTRING(t_code, 5)AS extracted_number
FROM clothes_top;

-- 옷특징 추출 쿼리
SELECT * FROM bottom_feature WHERE b_f_code = (SELECT b_feature_id FROM clothes_bottom WHERE b_feature_id =  1);