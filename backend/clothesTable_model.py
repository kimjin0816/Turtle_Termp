import psycopg2

class clothesTable_model:
    def __init__(self):
        self.conn = None
        self.cur = None
#-----------------------------------------------------------------------------------------------------------------------------------------------
#region Methhod
    # DB connection
    def connectDb(self):
        self.conn = psycopg2.connect(host='localhost', database='Clothes', user='postgres', password='password', port='5432')
        self.cur = self.conn.cursor()
        
    def closeDb(self):
        self.cur.close()
        self.conn.close()
        
    def writeDb(self, cmd): 
        sCmd = str(cmd) 
        self.cur.execute(sCmd)
        self.conn.commit()
#endregion
#-----------------------------------------------------------------------------------------------------------------------------------------------
    # DB table creation
    def setTable(self):
        self.connectDb()
        # clothe_type = '''
        #     CREATE TYPE clothe_type AS ENUM (
        #         'top',
        #         'bottom',
        #         'outer',
        #         'dress',
        #         'shoes',
        #         'bag',
        #         'accessory',
        #         'etc'
        #     );
        #         '''
        clothes_setting = '''
            CREATE TABLE IF NOT EXISTS clothing_type (
                type_id SERIAL PRIMARY KEY,
                type_name VARCHAR(10) UNIQUE NOT NULL
            );
            
            INSERT INTO clothing_type (type_name) 
            VALUES ('long'), ('short')
            ON CONFLICT (type_name) DO NOTHING;

            CREATE SEQUENCE neat_sequence START 1;
            CREATE SEQUENCE hood_sequence START 1;
            CREATE SEQUENCE shirt_sequence START 1;
            CREATE SEQUENCE mantoman_sequence START 1;
            '''
          
        high_table = '''
            CREATE TABLE IF NOT EXISTS neat (
                n_code VARCHAR(10) PRIMARY KEY,
                n_userId CHAR(20) NOT NULL,
                n_type_id INT NOT NULL,
                n_brand VARCHAR(20) NOT NULL,
                n_color VARCHAR(20) NOT NULL,
                n_logo VARCHAR(20),
                n_url VARCHAR(300),
                FOREIGN KEY (n_type_id) REFERENCES clothing_type (type_id));
            CREATE TABLE IF NOT EXISTS  mantoman (
                m_code VARCHAR(10) PRIMARY KEY,
                m_userId CHAR(20) NOT NULL,
                m_type_id INT NOT NULL,
                m_brand VARCHAR(20) NOT NULL,
                m_color VARCHAR(20) NOT NULL,
                m_logo VARCHAR(20),
                m_url VARCHAR(300),
                FOREIGN KEY (m_type_id) REFERENCES clothing_type (type_id));
            CREATE TABLE IF NOT EXISTS  shirt (
                s_code VARCHAR(10) PRIMARY KEY,
                s_userId CHAR(20) NOT NULL,
                s_type_id INT NOT NULL,
                s_brand VARCHAR(20) NOT NULL,
                s_color VARCHAR(20) NOT NULL,
                s_logo VARCHAR(20),
                s_url VARCHAR(300),
                FOREIGN KEY (s_type_id) REFERENCES clothing_type (type_id));
            CREATE TABLE IF NOT EXISTS  hood (
                h_code VARCHAR(10) PRIMARY KEY,
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
#-----------------------------------------------------------------------------------------------------------------------------------------------
    # DB table/data deletion
    def deleteData(self, clothes_type):
        self.connectDb()
        self.writeDb('DELETE FROM {clothes_type};')
        self.closeDb()

    def truncateData(self, clothes_type):
        self.connectDb()
        self.writeDb('TRUNCATE TABLE {clothes_type};')
        self.closeDb()

    def dropTable(self, clothes_type):
        self.connectDb()
        self.writeDb('DROP TABLE IF EXISTS {clothes_type};')
        self.closeDb()

    def deleteSequence(self, clothes_type):
        self.connectDb()
        self.writeDb('DROP SEQUENCE IF EXISTS neat_sequence;')
        self.writeDb('DROP SEQUENCE IF EXISTS hood_sequence;')
        self.writeDb('DROP SEQUENCE IF EXISTS shirt_sequence;')
        self.writeDb('DROP SEQUENCE IF EXISTS mantoman_sequence;')
        self.closeDb()
# -----------------------------------------------------------------------------------------------------------------------------------------------
    # DB data insertion
    def insertData(self, clothes_type, userId, type_id, brand, color, logo, url):
        self.connectDb()
        self.writeDb(f"INSERT INTO {clothes_type} (n_code, n_userId, n_type_id, n_brand, n_color, n_logo, n_url) 
                     VALUES ('n' || nextval('neat_n_code_seq'), '{userId}', '{type_id}', '{brand}', '{color}', '{logo}', '{url}');")
        self.closeDb()
# -----------------------------------------------------------------------------------------------------------------------------------------------
    # DB data update 
    # research
    def updateData(self, clothes_type, data):
        self.connectDb()
        self.writeDb(f"UPDATE {clothes_type} SET n_type_id='{data[1]}'n_brand='{data[2]}', n_color='{data[3]}', n_logo='{data[4]}', n_url='{data[5]}' 
                     WHERE n_code='{data[0]}';")
        self.closeDb()
#-----------------------------------------------------------------------------------------------------------------------------------------------
    # DB one data selection
    def selectClothes(self, clothes_type, code):
        self.connectDb()
        self.writeDb(f"SELECT * FROM {clothes_type} WHERE n_code='{code}';")
        result = self.cur.fetchall()
        print(result)
        self.closeDb()

    # DB longClothes selection
    def longClothes_type(self, clothes_type, type_id):
        self.connectDb()
        self.writeDb(f"SELECT * FROM {clothes_type} WHERE type_id= {type_id};")
        result = self.cur.fetchall()
        print(result)
        self.closeDb()