-- clothes type table
CREATE TABLE IF NOT EXISTS clothing_type (
                type_id SERIAL PRIMARY KEY,
                type_name VARCHAR(10) UNIQUE NOT NULL);
            
INSERT INTO clothing_type (type_name) 
VALUES ('long'), ('short')
ON CONFLICT (type_name) DO NOTHING;

-- clothes code(Serial Number) --
CREATE SEQUENCE IF NOT EXISTS neat_sequence START 1;
CREATE SEQUENCE IF NOT EXISTS hood_sequence START 1;
CREATE SEQUENCE IF NOT EXISTS shirt_sequence START 1;
CREATE SEQUENCE IF NOT EXISTS mantoman_sequence START 1;

CREATE SEQUENCE IF NOT EXISTS jeans_sequence START 1;
CREATE SEQUENCE IF NOT EXISTS slacks_sequence START 1;
CREATE SEQUENCE IF NOT EXISTS training_sequence START 1;
CREATE SEQUENCE IF NOT EXISTS jogger_sequence START 1;

-- top clothes table
CREATE TABLE IF NOT EXISTS t_neat (
                t_n_code CHAR(50) PRIMARY KEY,
                t_n_userId CHAR(20) NOT NULL,
                t_n_type_id INT NOT NULL,
                t_n_brand VARCHAR(20) NOT NULL,
                t_n_color VARCHAR(20) NOT NULL,
                t_n_logo VARCHAR(20),
                t_n_url VARCHAR(300),
                FOREIGN KEY (t_n_type_id) REFERENCES clothing_type (type_id));                

CREATE TABLE IF NOT EXISTS  t_mantoman (
                t_m_code CHAR(50) PRIMARY KEY,
                t_m_userId CHAR(20) NOT NULL,
                t_m_type_id INT NOT NULL,
                t_m_brand VARCHAR(20) NOT NULL,
                t_m_color VARCHAR(20) NOT NULL,
                t_m_logo VARCHAR(20),
                t_m_url VARCHAR(300),
                FOREIGN KEY (t_m_type_id) REFERENCES clothing_type (type_id));

CREATE TABLE IF NOT EXISTS  t_shirt (
                t_s_code CHAR(50) PRIMARY KEY,
                t_s_userId CHAR(20) NOT NULL,
                t_s_type_id INT NOT NULL,
                t_s_brand VARCHAR(20) NOT NULL,
                t_s_color VARCHAR(20) NOT NULL,
                t_s_logo VARCHAR(20),
                t_s_url VARCHAR(300),
                FOREIGN KEY (t_s_type_id) REFERENCES clothing_type (type_id));

CREATE TABLE IF NOT EXISTS  t_hood (
                t_h_code CHAR(50) PRIMARY KEY,
                t_h_userId CHAR(20) NOT NULL,
                t_h_type_id INT NOT NULL,
                t_h_brand VARCHAR(20) NOT NULL,
                t_h_color VARCHAR(20) NOT NULL,
                t_h_logo VARCHAR(20),
                t_h_url VARCHAR(300),
                FOREIGN KEY (t_h_type_id) REFERENCES clothing_type (type_id));

-- pants table --
CREATE TABLE IF NOT EXISTS p_jeans(
                p_j_code CHAR(50) PRIMARY KEY,
                p_j_userId CHAR(20) NOT NULL,
                p_j_type_id INT NOT NULL,
                p_j_brand VARCHAR(20) NOT NULL,
                p_j_color VARCHAR(20) NOT NULL,
                p_j_logo VARCHAR(20),
                p_j_url VARCHAR(300),
                FOREIGN KEY (p_j_type_id) REFERENCES clothing_type (type_id));

CREATE TABLE IF NOT EXISTS p_slacks(
                p_s_code CHAR(50) PRIMARY KEY,
                p_s_userId CHAR(20) NOT NULL,
                p_s_type_id INT NOT NULL,
                p_s_brand VARCHAR(20) NOT NULL,
                p_s_color VARCHAR(20) NOT NULL,
                p_s_logo VARCHAR(20),
                p_s_url VARCHAR(300),
                FOREIGN KEY (p_s_type_id) REFERENCES clothing_type (type_id));

CREATE TABLE IF NOT EXISTS p_trainnig(
                p_t_code CHAR(50) PRIMARY KEY,
                p_t_userId CHAR(20) NOT NULL,
                p_t_type_id INT NOT NULL,
                p_t_brand VARCHAR(20) NOT NULL,
                p_t_color VARCHAR(20) NOT NULL,
                p_t_logo VARCHAR(20),
                p_t_url VARCHAR(300),
                FOREIGN KEY (p_t_type_id) REFERENCES clothing_type (type_id));

CREATE TABLE IF NOT EXISTS p_jogger(
                p_jo_code CHAR(50) PRIMARY KEY,
                p_jo_userId CHAR(20) NOT NULL,
                p_jo_type_id INT NOT NULL,
                p_jo_brand VARCHAR(20) NOT NULL,
                p_jo_color VARCHAR(20) NOT NULL,
                p_jo_logo VARCHAR(20),
                p_jo_url VARCHAR(300),
                FOREIGN KEY (p_jo_type_id) REFERENCES clothing_type (type_id));

-- INSERT INTO neat (n_code, n_userId, n_type_id, n_brand, n_color, n_logo, n_url) VALUES ('n3', 'user1', 1, 'nike', 'black', 'nike_logo', 'nike_url');

-- SELECT * FROM neat;