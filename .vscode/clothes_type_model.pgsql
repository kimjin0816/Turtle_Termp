CREATE TABLE IF NOT EXISTS neat (
                n_code CHAR(50) PRIMARY KEY,
                n_userId CHAR(20) NOT NULL,
                n_type_id INT NOT NULL,
                n_brand VARCHAR(20) NOT NULL,
                n_color VARCHAR(20) NOT NULL,
                n_logo VARCHAR(20),
                n_url VARCHAR(300),
                FOREIGN KEY (n_type_id) REFERENCES clothing_type (type_id));
CREATE TABLE IF NOT EXISTS  mantoman (
                m_code CHAR(50) PRIMARY KEY,
                m_userId CHAR(20) NOT NULL,
                m_type_id INT NOT NULL,
                m_brand VARCHAR(20) NOT NULL,
                m_color VARCHAR(20) NOT NULL,
                m_logo VARCHAR(20),
                m_url VARCHAR(300),
                FOREIGN KEY (m_type_id) REFERENCES clothing_type (type_id));
CREATE TABLE IF NOT EXISTS  shirt (
                s_code CHAR(50) PRIMARY KEY,
                s_userId CHAR(20) NOT NULL,
                s_type_id INT NOT NULL,
                s_brand VARCHAR(20) NOT NULL,
                s_color VARCHAR(20) NOT NULL,
                s_logo VARCHAR(20),
                s_url VARCHAR(300),
                FOREIGN KEY (s_type_id) REFERENCES clothing_type (type_id));
CREATE TABLE IF NOT EXISTS  hood (
                h_code CHAR(50) PRIMARY KEY,
                h_userId CHAR(20) NOT NULL,
                h_type_id INT NOT NULL,
                h_brand VARCHAR(20) NOT NULL,
                h_color VARCHAR(20) NOT NULL,
                h_logo VARCHAR(20),
                h_url VARCHAR(300),
                FOREIGN KEY (h_type_id) REFERENCES clothing_type (type_id));

INSERT INTO neat (n_code, n_userId, n_type_id, n_brand, n_color, n_logo, n_url) VALUES ('n3', 'user1', 1, 'nike', 'black', 'nike_logo', 'nike_url');

SELECT * FROM neat;