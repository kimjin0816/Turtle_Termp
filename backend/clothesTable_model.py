import psycopg2

class clothesTable_model:
    def __init__(self):
        self.conn = None
        self.cur = None
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
        clothes_setting = '''
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
            '''
        self.writeDb(clothes_setting)
        self.closeDb()