import psycopg2

class clothesHandler:
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
    # first letter of clothes type
    def firstCode_letter(self, clothes_type):
        self.writeDb(f"SELECT SUBSTRING('{clothes_type}' FROM 1 FOR 1);")
        self.first_letter = self.cur.fetchall()[0][0]
# -----------------------------------------------------------------------------------------------------------------------------------------------
    # DB data insertion
    def insertData(self, clothes_type, userId, type_id, brand, color, logo, url):
        self.connectDb()
        self.firstCode_letter(clothes_type)
        self.writeDb(f"INSERT INTO {clothes_type} ({self.first_letter}_code, {self.first_letter}_userId, {self.first_letter}_type_id, {self.first_letter}_brand, {self.first_letter}_color, {self.first_letter}_logo, {self.first_letter}_url) VALUES ('{self.first_letter}' || nextval('{clothes_type}_sequence'), '{userId}', '{type_id}', '{brand}', '{color}', '{logo}', '{url}');")
        self.closeDb()
# -----------------------------------------------------------------------------------------------------------------------------------------------
    # DB data update 
    # research
    def updateData(self, clothes_type, data):
        self.connectDb()
        self.firstCode_letter(clothes_type)
        self.writeDb(f"UPDATE {clothes_type} SET {self.first_letter}_type_id='{data[1]}', {self.first_letter}_brand='{data[2]}', {self.first_letter}_color='{data[3]}', {self.first_letter}_logo='{data[4]}', {self.first_letter}_url='{data[5]}' WHERE {self.first_letter}_code='{data[0]}';")
        self.closeDb()
#-----------------------------------------------------------------------------------------------------------------------------------------------
    # DB table/data deletion
    def deleteData(self, clothes_type):
        self.connectDb()
        self.writeDb(f'DELETE FROM {clothes_type};')
        self.closeDb()

    def truncateData(self, clothes_type):
        self.connectDb()
        self.writeDb(f'TRUNCATE TABLE {clothes_type};')
        self.closeDb()

    def dropTable(self, clothes_type):
        self.connectDb()
        self.writeDb(f'DROP TABLE IF EXISTS {clothes_type};')
        self.closeDb()

    def deleteSequence(self, clothes_type):
        self.connectDb()
        self.writeDb(f"DROP SEQUENCE {clothes_type};")
        self.closeDb()
#-----------------------------------------------------------------------------------------------------------------------------------------------
    # DB one data selection
    def oneSelectClothes(self, clothes_type, code):
        self.connectDb()
        self.firstCode_letter(clothes_type)
        self.writeDb(f"SELECT * FROM {clothes_type} WHERE {self.first_letter}_code='{code}';")
        result = self.cur.fetchall()
        print(result)
        self.closeDb()

    # DB all data selection
    def allSelectClothes(self, clothes_type):
        self.connectDb()
        self.writeDb(f"SELECT * FROM {clothes_type};")
        result = self.cur.fetchall()
        print(result)
        self.closeDb()        