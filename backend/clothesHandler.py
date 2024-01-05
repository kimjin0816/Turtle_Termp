import psycopg2
import clothesTable_model

class clothesHandler:
    def __init__(self):
        self.conn = None
        self.cur = None
        self.ct = clothesTable_model()
#-----------------------------------------------------------------------------------------------------------------------------------------------
    # DB connection
    def connectDb(self):
        self.conn = psycopg2.connect(host='localhost', database='Clothes', user='postgres', password='password', port='5432') # DB connection 얻기
        self.cur = self.conn.cursor() # connection의 cursor(커서)
        
    def closeDb(self):
        self.cur.close()
        self.conn.close()
        
    def writeDb(self, cmd): # DB에 명령어 cmd 쓰기
        sCmd = str(cmd) # string으로 type casting
        self.cur.execute(sCmd) # cursor에 명령어(SQL) 실행
        self.conn.commit() # connection에 기록하기 -> cursor 명령어를 DB가 실행
#-----------------------------------------------------------------------------------------------------------------------------------------------