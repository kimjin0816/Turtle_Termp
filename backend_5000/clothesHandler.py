import psycopg2
import hashlib

class clothesHandler:
#-----------------------------------------------------------------------------------------------------------------------------------------------
#region DB connection/close/write methods
    # Clothes DB
    def connectClothes(self):
        self.c_conn = psycopg2.connect(host='localhost', database='Clothes', user='postgres', password='password', port='5432')
        self.c_cur = self.c_conn.cursor()
    def closeClothes(self):
        self.c_cur.close()
        self.c_conn.close() 
    def writeClothes(self, cmd): 
        sCmd = str(cmd) 
        self.c_cur.execute(sCmd)
        self.c_conn.commit()
#endregion
    def __init__(self):
        self.c_conn = None
        self.c_cur = None

#-----------------------------------------------------------------------------------------------------------------------------------------------
#region => math functions    
    # binary => decimal
    def decimal(self, binary): 
        code = int(binary, 2)
        return code
    # image hash code
    def calculate_image_hash(self, image_name): 
        path = f'C:/Users/user/Desktop/top_clothes/server/{image_name}'
        with open(path, 'rb') as f:
            bytes = f.read()
            readle_hash = hashlib.sha256(bytes).hexdigest()
        return readle_hash
    def check_image_hash(self,image_hash):
        self.connectClothes()
        self.writeClothes(f"SELECT COUNT(hash_code) FROM clothes WHERE hash_code = '{image_hash}'")
        rows = self.c_cur.fetchall()
        self.closeClothes()
        return rows
#endregion
# -----------------------------------------------------------------------------------------------------------------------------------------------
#region => features code
    # feature code setting
    def t_f_code(self, feature):
        hood_val = int(feature[0])
        printer_val = int(feature[1])
        henley_val = int(feature[2])
        kara_val = int(feature[3])
        pocket_val = int(feature[4])
        f_code = self.decimal(f"{hood_val}{printer_val}{henley_val}{kara_val}{pocket_val}")
        return f_code
    
    # def t_f_select(self, f_code):
    #     self.connectClothes()
    #     self.writeClothes(f"SELECT * FROM top_feature WHERE f_code = {f_code};")
    #     rows = self.c_cur.fetchall()
    #     f_data = [{'f_code': row[0], 'hood': row[1], 'printer': row[2], 'henley': row[3], 'kara': row[4], 'pocket': row[5]} for row in rows]
    #     self.closeClothes()
    #     return f_data

    def t_f_insert(self, hood, printer, henley, kara, pocket):
        self.connectClothes()
        hood_val = int(hood)
        printer_val = int(printer)
        henley_val = int(henley)
        kara_val = int(kara)
        pocket_val = int(pocket)
        f_code = self.decimal(f"{hood_val}{printer_val}{henley_val}{kara_val}{pocket_val}")
        self.writeClothes(f"INSERT INTO top_feature VALUES ({f_code}, {hood}, {printer}, {henley}, {kara}, {pocket});")
        self.closeClothes()
# -----------------------------------------------------------------------------------------------------------------------------------------------    
#region => searchLog code    
    # searchLog data insert
    def searchLog_Insert(self, id, top_bottom, keywordArray, img, f_code):
        self.connectClothes()
        self.writeClothes(f"INSERT INTO searchLog(userID, top_bottom, shape, classification, color, img, date, f_code) VALUES ('{id}', '{top_bottom}', '{keywordArray[0]}', 'shape', '{keywordArray[1]}', '{img}', NOW(), {f_code});")
        self.closeClothes()
    # searchLog data select
    def searchLog_SelectId(self, id):
        self.connectClothes()
        self.writeClothes(f"SELECT * FROM searchLog WHERE userID = '{id}';")
        rows = self.c_cur.fetchall()
        data = [{'userID': row[1], 'top_bottom': row[2], 'shape': row[3], 'classification' : row[4],'color' : row[5], 'img' : row[6], 'date' : row[7], 'f_code' : row[8]} for row in rows]
        self.closeClothes()
        return data
#endregion
# -----------------------------------------------------------------------------------------------------------------------------------------------
    # clothes data insert
    def clothes_Insert(self, hash_code, top_bottom, keywordArray, img, f_code):
        self.connectClothes()
        self.writeClothes(f"INSERT INTO clothes(hash_code, top_bottom, shape, classification, color, img, f_code) VALUES ('{hash_code}','{top_bottom}', '{keywordArray[0]}', 'shape', '{keywordArray[1]}', '{img}', {f_code});")
        self.closeClothes()
# -----------------------------------------------------------------------------------------------------------------------------------------------