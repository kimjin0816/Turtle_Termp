import psycopg2
import hashlib

class clothesHandler:
#-----------------------------------------------------------------------------------------------------------------------------------------------
#region DB connection/close/write methods
    # Clothes DB
    def connectClothes(self):
        self.c_conn = psycopg2.connect(host='localhost', database='Clothes', user='postgres', password='2023', port='5432')
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
    # def decimal(self, binary): 
    #     code = int(binary, 2)
    #     return code
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
    # def t_f_code(self, feature):
    #     henley_val = int(feature[0])
    #     logo_val = int(feature[1])
    #     printer_val = int(feature[2])
    #     pocket_val = int(feature[3])
    #     kara_val = int(feature[4])
    #     hood_val = int(feature[5])
    #     f_code = self.decimal(f"{henley_val}{logo_val}{printer_val}{pocket_val}{kara_val}{hood_val}")
    #     return f_code
    
    # def t_f_select(self, f_code):
    #     self.connectClothes()
    #     self.writeClothes(f"SELECT * FROM top_feature WHERE f_code = {f_code};")
    #     rows = self.c_cur.fetchall()
    #     f_data = [{'f_code': row[0], 'hood': row[1], 'printer': row[2], 'henley': row[3], 'kara': row[4], 'pocket': row[5]} for row in rows]
    #     self.closeClothes()
    #     return f_data

    # def t_f_insert(self, henley, logo, printer, pocket, kara, hood):
    #     self.connectClothes()
    #     henley_val = int(henley)
    #     logo_val = int(logo)
    #     printer_val = int(printer)
    #     pocket_val = int(pocket)
    #     kara_val = int(kara)
    #     hood_val = int(hood)
    #     f_code = self.decimal(f"{henley_val}{logo_val}{printer_val}{pocket_val}{kara_val}{hood_val}")
    #     self.writeClothes(f"INSERT INTO top_feature VALUES ({f_code}, {henley}, {logo}, {printer}, {pocket}, {kara}, {hood});")
    #     self.closeClothes()
#endregion
# -----------------------------------------------------------------------------------------------------------------------------------------------    
#region => searchLog code    
    # searchLog data insert
    def searchLog_Insert(self, id, clo_name, clo_color, img, feature_keyword):
        self.connectClothes()
        self.writeClothes(f"INSERT INTO searchLog(userID, clo_name, color, img, date, feature) VALUES ('{id}', '{clo_name}', '{clo_color}', '{img}', NOW(), '{feature_keyword}');")
        self.closeClothes()

    # searchLog data select
    def searchLog_SelectId(self, id):
        self.connectClothes()
        self.writeClothes(f"SELECT * FROM searchLog WHERE userID = '{id}';")
        rows = self.c_cur.fetchall()
        data = [{'userID': row[1], 'clo_name': row[2], 'color': row[3], 'img' : row[4], 'date' : row[5], 'feature_keyword' : row[6]} for row in rows]
        self.closeClothes()
        return data
#endregion
# -----------------------------------------------------------------------------------------------------------------------------------------------
    # clothes data insert
    def clothes_Insert(self, hash_code, clo_name, clo_color, img, feature_keyword):
        self.connectClothes()
        self.writeClothes(f"INSERT INTO clothes(hash_code, clo_name, color, img, feature) VALUES ('{hash_code}', '{clo_name}', '{clo_color}', '{img}', '{feature_keyword}');")
        self.closeClothes()
# -----------------------------------------------------------------------------------------------------------------------------------------------

    # def b_c_SelectID(self, id):
    #     self.connectClothes()
    #     self.writeClothes(f"SELECT * FROM clothes_bottom WHERE b_code LIKE '{id}_%';")
    #     rows = self.c_cur.fetchall()
    #     self.closeClothes()
    #     return rows

    # def b_c_Insert(self, id, shape, classification, color, feature):
    #     self.connectClothes()
    #     f_code = self.b_f_code(feature)
    #     # image_path = self.c_img_url()        
    #     self.writeClothes(f"INSERT INTO clothes_bottom(b_code, b_shape, b_classification, b_color, b_f_code, t_url) VALUES ('{id}_' || TO_CHAR(NOW(), 'YYYYMMDDHH24MISS'), '{shape}', '{classification}', '{color}',  {f_code}, '{image_path}');")
    #     self.closeClothes()
