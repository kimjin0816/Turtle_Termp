import psycopg2

class clothesHandler:
    def __init__(self):
        self.c_conn = None
        self.c_cur = None
        self.m_conn = None
        self.m_cur = None
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
    # Member DB
    def connectMember(self):
        self.m_conn = psycopg2.connect(host='localhost', database='members', user='postgres', password='password', port='5432')
        self.m_cur = self.m_conn.cursor()
    def closeMember(self):
        self.m_cur.close()
        self.m_conn.close()
    def writeMember(self, cmd):
        sCmd = str(cmd)
        self.m_cur.execute(sCmd)
        self.m_conn.commit()
#endregion
#-----------------------------------------------------------------------------------------------------------------------------------------------
    # binary => decimal
    def decimal(self, binary): 
        code = int(binary, 2)
        return code
# -----------------------------------------------------------------------------------------------------------------------------------------------     
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
    def b_f_insert(self, jogger, pocket):
        self.connectClothes()
        jogger_val = int(jogger)
        pocket_val = int(pocket)
        f_code = self.decimal(f"{jogger_val}{pocket_val}")
        self.writeClothes(f"INSERT INTO bottom_feature VALUES ({f_code}, {jogger}, {pocket});")
        self.closeClothes()   

    # feature code setting
    def t_f_code(self, feature):
        hoodVal = int(feature[0])
        karaVal = int(feature[1])
        zipperVal = int(feature[2])
        logoVal = int(feature[3])
        printerVal = int(feature[4])
        featureCode = self.decimal(f"{hoodVal}{karaVal}{zipperVal}{logoVal}{printerVal}")
        return featureCode 
    def b_f_code(self, feature):
        joggerVal = int(feature[0])
        pocketVal = int(feature[1])
        featureCode = self.decimal(f"{joggerVal}{pocketVal}")
        return featureCode
    
    # clother data insert
    def t_c_Insert(self, id, shape, classification, color, feature):
        self.connectClothes()
        # self.connectMember()
        f_code = self.t_f_code(feature)
        # memberID = self.writeMember()
        self.writeClothes(f"INSERT INTO clothes_top(t_code, t_shape, t_classification, t_color, t_f_code) VALUES ('{id}_' || TO_CHAR(NOW(), 'YYYYMMDDHH24MISS'), '{shape}', '{classification}', '{color}',  {f_code});")
        self.closeClothes()
        # self.closeMember()
    def b_c_Insert(self, id, shape, classification, color, feature):
        self.connectClothes()
        # self.connectMember()
        f_code = self.b_f_code(feature)
        # memberID = self.writeMember()
        self.writeClothes(f"INSERT INTO clothes_bottom(b_code, b_shape, b_classification, b_color, b_f_code) VALUES ('{id}_' || TO_CHAR(NOW(), 'YYYYMMDDHH24MISS'), '{shape}', '{classification}', '{color}',  {f_code});")
        self.closeClothes()
        # self.closeMember()

# -----------------------------------------------------------------------------------------------------------------------------------------------
    def t_c_SelectID(self, id):
        self.connectClothes()
        self.writeClothes(f"SELECT * FROM clothes_top WHERE t_code LIKE '{id}_%';")
        rows = self.c_cur.fetchall()
        self.closeClothes()
        return rows