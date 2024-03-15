-- clothes type table
-- CREATE TABLE IF NOT EXISTS clothing_type (
--                 typeID SERIAL PRIMARY KEY,
--                 type_name VARCHAR(10) UNIQUE NOT NULL);
            
-- INSERT INTO clothing_type (type_name) 
-- VALUES ('long'), ('short')
-- ON CONFLICT (type_name) DO NOTHING;

-- clothes code(Serial Number) --
-- CREATE SEQUENCE IF NOT EXISTS t_neat_sequence START 1;
-- CREATE SEQUENCE IF NOT EXISTS t_hood_sequence START 1;
-- CREATE SEQUENCE IF NOT EXISTS t_shirt_sequence START 1;
-- CREATE SEQUENCE IF NOT EXISTS t_mantoman_sequence START 1;

-- CREATE SEQUENCE IF NOT EXISTS b_jeans_sequence START 1;
-- CREATE SEQUENCE IF NOT EXISTS b_slacks_sequence START 1;
-- CREATE SEQUENCE IF NOT EXISTS b_training_sequence START 1;
-- CREATE SEQUENCE IF NOT EXISTS b_jogger_sequence START 1;

-- clothes table
CREATE TABLE IF NOT EXISTS clothes_top (
                t_code CHAR(50) NOT NULL,
                t_shape VARCHAR(50) NOT NULL,
                t_classification VARCHAR(50) NOT NULL,
                t_feature_id INT NOT NULL,
                t_color VARCHAR(50) NOT NULL,
                CONSTRAINT c_top_pk PRIMARY KEY (t_code),
                FOREIGN KEY (t_feature_id) REFERENCES top_feature (t_f_code));

CREATE TABLE IF NOT EXISTS clothes_bottom (
                b_code CHAR(50) NOT NULL,
                b_shape VARCHAR(50) NOT NULL,
                b_classification VARCHAR(50) NOT NULL,
                b_feature_id INT NOT NULL,
                b_color VARCHAR(50) NOT NULL,
                CONSTRAINT b_top_pk PRIMARY KEY (b_code),
                FOREIGN KEY (b_feature_id) REFERENCES bottom_feature (b_f_code));     

-- feature table for clothes
CREATE TABLE IF NOT EXISTS top_feature (
                t_f_code SERIAL NOT NULL,
                t_f_hood BOOLEAN NOT NULL,
                t_f_kara BOOLEAN NOT NULL,
                t_f_zipper BOOLEAN NOT NULL,
                t_f_logo BOOLEAN NOT NULL,
                t_f_printer BOOLEAN NOT NULL,
                CONSTRAINT t_f_code_pk PRIMARY KEY (t_f_code));

CREATE TABLE IF NOT EXISTS bottom_feature (
                b_f_code SERIAL NOT NULL,
                b_f_jogger BOOLEAN NOT NULL,
                b_f_pocket BOOLEAN NOT NULL,
                CONSTRAINT b_f_code_pk PRIMARY KEY (b_f_code));