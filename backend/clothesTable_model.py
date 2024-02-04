import psycopg2

class clothesTable_model:
    def __init__(self):
        self.conn = None
        self.cur = None
        self.first_letter = None
#-----------------------------------------------------------------------------------------------------------------------------------------------
#region DB connection/close/write methods
    # DB connection
    def connectDb(self):
        self.conn = psycopg2.connect(host='localhost', database='Clothes', user='postgres', password='password', port='5432')
        self.cur = self.conn.cursor()
    # DB close
    def closeDb(self):
        self.cur.close()
        self.conn.close()
    # DB write   
    def writeDb(self, cmd): 
        sCmd = str(cmd) 
        self.cur.execute(sCmd)
        self.conn.commit()
#endregion
#-----------------------------------------------------------------------------------------------------------------------------------------------
    # DB table settings
    def setTable(self):
        self.connectDb()
        clothes_type = '''
            CREATE TYPE clothe_type AS ENUM (
                'top',
                'bottom',
                'outer',
                'dress',
                'shoes',
                'bag',
                'accessory',
                'etc'
            );
                '''
        clothes_setting = '''
            CREATE TABLE IF NOT EXISTS clothing_type (
                typeID SERIAL PRIMARY KEY,
                type_name VARCHAR(10) UNIQUE NOT NULL);
            
            INSERT INTO clothing_type (type_name) 
            VALUES ('long'), ('short')
            ON CONFLICT (type_name) DO NOTHING;

            -- clothes code(Serial Number) --
            CREATE SEQUENCE IF NOT EXISTS t_neat_sequence START 1;
            CREATE SEQUENCE IF NOT EXISTS t_hood_sequence START 1;
            CREATE SEQUENCE IF NOT EXISTS t_shirt_sequence START 1;
            CREATE SEQUENCE IF NOT EXISTS t_mantoman_sequence START 1;

            CREATE SEQUENCE IF NOT EXISTS b_jeans_sequence START 1;
            CREATE SEQUENCE IF NOT EXISTS b_slacks_sequence START 1;
            CREATE SEQUENCE IF NOT EXISTS b_training_sequence START 1;
            CREATE SEQUENCE IF NOT EXISTS b_jogger_sequence START 1;
            '''
        high_table = '''
            CREATE TABLE IF NOT EXISTS t_neat (
                t_n_code CHAR(50) PRIMARY KEY,
                t_n_userId CHAR(20) NOT NULL,
                t_n_type INT NOT NULL,
                t_n_brand VARCHAR(20) NOT NULL,
                t_n_color VARCHAR(20) NOT NULL,
                t_n_logo VARCHAR(20),
                t_n_url VARCHAR(300),
                FOREIGN KEY (t_n_type) REFERENCES clothing_type (typeID));                

            CREATE TABLE IF NOT EXISTS  t_mantoman (
                t_m_code CHAR(50) PRIMARY KEY,
                t_m_userId CHAR(20) NOT NULL,
                t_m_type INT NOT NULL,
                t_m_brand VARCHAR(20) NOT NULL,
                t_m_color VARCHAR(20) NOT NULL,
                t_m_logo VARCHAR(20),
                t_m_url VARCHAR(300),
                FOREIGN KEY (t_m_type) REFERENCES clothing_type (typeID));

            CREATE TABLE IF NOT EXISTS  t_shirt (
                t_s_code CHAR(50) PRIMARY KEY,
                t_s_userId CHAR(20) NOT NULL,
                t_s_type INT NOT NULL,
                t_s_brand VARCHAR(20) NOT NULL,
                t_s_color VARCHAR(20) NOT NULL,
                t_s_logo VARCHAR(20),
                t_s_url VARCHAR(300),
                FOREIGN KEY (t_s_type) REFERENCES clothing_type (typeID));

            CREATE TABLE IF NOT EXISTS  t_hood (
                t_h_code CHAR(50) PRIMARY KEY,
                t_h_userId CHAR(20) NOT NULL,
                t_h_type INT NOT NULL,
                t_h_brand VARCHAR(20) NOT NULL,
                t_h_color VARCHAR(20) NOT NULL,
                t_h_logo VARCHAR(20),
                t_h_url VARCHAR(300),
                FOREIGN KEY (t_h_type) REFERENCES clothing_type (typeID));
------------------------------------------------------------------------------------------
            CREATE TABLE IF NOT EXISTS b_jeans(
                b_j_code CHAR(50) PRIMARY KEY,
                b_j_userId CHAR(20) NOT NULL,
                b_j_type INT NOT NULL,
                b_j_brand VARCHAR(20) NOT NULL,
                b_j_color VARCHAR(20) NOT NULL,
                b_j_logo VARCHAR(20),
                b_j_url VARCHAR(300),
                FOREIGN KEY (b_j_type) REFERENCES clothing_type (typeID));

            CREATE TABLE IF NOT EXISTS b_slacks(
                b_s_code CHAR(50) PRIMARY KEY,
                b_s_userId CHAR(20) NOT NULL,
                b_s_type INT NOT NULL,
                b_s_brand VARCHAR(20) NOT NULL,
                b_s_color VARCHAR(20) NOT NULL,
                b_s_logo VARCHAR(20),
                b_s_url VARCHAR(300),
                FOREIGN KEY (b_s_type) REFERENCES clothing_type (typeID));

            CREATE TABLE IF NOT EXISTS b_trainnig(
                b_t_code CHAR(50) PRIMARY KEY,
                b_t_userId CHAR(20) NOT NULL,
                b_t_type INT NOT NULL,
                b_t_brand VARCHAR(20) NOT NULL,
                b_t_color VARCHAR(20) NOT NULL,
                b_t_logo VARCHAR(20),
                b_t_url VARCHAR(300),
                FOREIGN KEY (b_t_type) REFERENCES clothing_type (typeID));

            CREATE TABLE IF NOT EXISTS b_jogger(
                b_jo_code CHAR(50) PRIMARY KEY,
                b_jo_userId CHAR(20) NOT NULL,
                b_jo_type INT NOT NULL,
                b_jo_brand VARCHAR(20) NOT NULL,
                b_jo_color VARCHAR(20) NOT NULL,
                b_jo_logo VARCHAR(20),
                b_jo_url VARCHAR(300),
                FOREIGN KEY (b_jo_type) REFERENCES clothing_type (typeID));
            '''
        self.writeDb(clothes_setting)
        self.writeDb(high_table)
        self.closeDb()