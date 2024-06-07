import psycopg2
import hashlib

# from selenium import webdriver
# from selenium.webdriver.common.by import By

# import os
# from PIL import Image
# import shutil

# import requests
# from io import BytesIO

# from flask import Flask, jsonify
# from flask_cors import CORS

# driver.quit()

# driver = webdriver.Chrome()

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
        # self.url = 'http://localhost:8080/'
        # driver.get(self.url)
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
#region => clothes image url    
    # clothes image url
    def c_img_url(self):
        img_elements = driver.find_elements(By.TAG_NAME, 'img')
        for img_element in img_elements:
            src = img_element.get_attribute('src')
        return src
    # background/clothes_top file path copy test folder
    def image_path(self, image_filename, type_clothes):
        # clothes 폴더 경로 얻기
        clothes_path = os.path.join(os.path.expanduser('~'), 'Desktop/top_clothes', type_clothes)
        # 이미지 파일 경로
        image_path = os.path.join(clothes_path, image_filename)
        
        # 이미지를 test 폴더로 복사
        destination_folder = os.path.join(os.path.expanduser('~'), 'Desktop/top_clothes', 'test')
        shutil.copy(image_path, destination_folder)
        
        # 복사된 이미지 파일의 경로
        copied_image_path = os.path.join(destination_folder, image_filename)
        
        # 복사된 이미지 열기
        img = Image.open(copied_image_path)
        # 이미지 출력
        img.show()
        
        return copied_image_path
#endregion
# -----------------------------------------------------------------------------------------------------------------------------------------------     
#region => features code
    # feature code setting
    def t_f_code(self, feature):
        hoodVal = int(feature[0])
        karaVal = int(feature[1])
        zipperVal = int(feature[2])
        logoVal = int(feature[3])
        printerVal = int(feature[4])
        featureCode = self.decimal(f"{hoodVal}{karaVal}{zipperVal}{logoVal}{printerVal}")
        return featureCode 
    # def b_f_code(self, feature):
    #     joggerVal = int(feature[0])
    #     pocketVal = int(feature[1])
    #     featureCode = self.decimal(f"{joggerVal}{pocketVal}")
    #     return featureCode
    # top feature data insert(once)
    def t_f_insert(self, hood, kara, zipper, logo, printer):
        self.connectClothes()
        hood_val = int(hood)
        kara_val = int(kara)
        zipper_val = int(zipper)
        logo_val = int(logo)
        printer_val = int(printer)
        f_code = self.decimal(f"{hood_val}{kara_val}{zipper_val}{logo_val}{printer_val}")
        self.writeClothes(f"INSERT INTO top_feature VALUES ({f_code}, {hood}, {kara}, {zipper}, {logo}, {printer});")
        self.closeClothes()
    # def b_f_insert(self, jogger, pocket):
    #     self.connectClothes()
    #     jogger_val = int(jogger)
    #     pocket_val = int(pocket)
    #     f_code = self.decimal(f"{jogger_val}{pocket_val}")
    #     self.writeClothes(f"INSERT INTO bottom_feature VALUES ({f_code}, {jogger}, {pocket});")
    #     self.closeClothes()   
#endregion
# -----------------------------------------------------------------------------------------------------------------------------------------------    
#region => searchLog code    
    # searchLog data insert
    def searchLog_Insert(self, id, top_bottom, keywordArray, img, feature):
        self.connectClothes()
        f_code = self.t_f_code(feature)
        # image_path = self.c_img_url()        
        # self.writeClothes(f"INSERT INTO searchLog(userID, top_bottom, shape, classification, color, img, date, f_code) VALUES ('{id}', '{top_bottom}', '{keywordArray[0]}', '{keywordArray[1]}', '{keywordArray[2]}', '{img}', NOW(), {f_code});")
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
    def clothes_Insert(self, hash_code, top_bottom, keywordArray, img, feature):
        self.connectClothes()
        f_code = self.t_f_code(feature)
        # self.writeClothes(f"INSERT INTO clothes(hash_code, top_bottom, shape, classification, color, img, f_code) VALUES ('{hash_code}','{top_bottom}', '{keywordArray[0]}', '{keywordArray[1]}', '{keywordArray[2]}', '{img}', {f_code});")
        self.writeClothes(f"INSERT INTO clothes(hash_code, top_bottom, shape, classification, color, img, f_code) VALUES ('{hash_code}','{top_bottom}', '{keywordArray[0]}', 'shape', '{keywordArray[1]}', '{img}', {f_code});")
        
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