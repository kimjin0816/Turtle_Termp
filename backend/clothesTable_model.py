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
                type_id SERIAL PRIMARY KEY,
                type_name VARCHAR(10) UNIQUE NOT NULL
            );
            
            INSERT INTO clothing_type (type_name) 
            VALUES ('long'), ('short')
            ON CONFLICT (type_name) DO NOTHING;

            CREATE SEQUENCE IF NOT EXISTS neat_sequence START 1;
            CREATE SEQUENCE IF NOT EXISTS hood_sequence START 1;
            CREATE SEQUENCE IF NOT EXISTS shirt_sequence START 1;
            CREATE SEQUENCE IF NOT EXISTS mantoman_sequence START 1;
            '''
        high_table = '''
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
            '''
        self.writeDb(clothes_setting)
        self.writeDb(high_table)
        self.closeDb()