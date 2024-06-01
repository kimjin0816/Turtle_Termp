from flask import Flask, request, url_for, jsonify, send_from_directory
from flask_cors import CORS
import requests
from clothesHandler import clothesHandler

app = Flask(__name__)
CORS(app)

ch = clothesHandler()

user_id_global = ''
imageName_global = ''
image_URL_global = ''

class index:   
    def postData(self, keywordArray, featureArray):    
        # 모형/종류/색상
        # keywordArray = ['아웃터', '패딩', '빨강']
        # keywords = color + ' ' + shape + ' ' + type
        keyword = f'{keywordArray[2]} {keywordArray[1]} {keywordArray[0]}'
        
        # Node.js 서버의 URL
        url = 'http://localhost:3000/api/search-images'

        # POST 요청을 보냅니다.
        response = requests.post(url, json={'keywordArray': keywordArray, 'keywords' : keyword}) 

        # 응답을 확인합니다.
        if response.status_code == 200:
            print("userId: " + user_id_global)
            print("upload_file : " + imageName_global)
            ch.searchLog_Insert(user_id_global, 'top', keywordArray, image_URL_global, featureArray)
            return 'Data sent to Node.js server successfully', 200
        else:
            return 'Failed to send data to Node.js server', 500
        
    def processFormData(self, uploaded_file, user_Id, img_URL):
        # 전역 변수를 참조합니다.
        global user_id_global
        global imageName_global
        global image_URL_global

        user_id_global = user_Id.replace('"', '')
        imageName_global = uploaded_file.filename
        image_URL_global = img_URL
        # 파일을 저장할 경로를 지정합니다.
        self.save_path = f'C:/users/user/Desktop/top_clothes/server/{uploaded_file.filename}'
        # 파일을 저장합니다.
        uploaded_file.save(self.save_path)
        # response = requests.post("http://localhost:3000/api/save_path", files={'image': open(save_path, 'rb')})
        print("userId: " + user_id_global)
        print("upload_file : " + imageName_global)
        
        """ 여기 사이에 키워드를 받아 오는 코드 작성 """

        return self.postData(keywordArray=['아웃터', '패딩', '빨강'], featureArray=[True, True, True, True, True])
        # return send_from_directory('',uploaded_file.filename)
    
Index = index()

@app.route('/', methods=['POST'])
def formData():
    # 클라이언트가 전송한 파일을 가져옵니다.
    uploaded_file = request.files['image']
    user_Id=request.form.get('userId')
    # 이미지의 URL을 생성
    img_URL = url_for('server_image', filename=uploaded_file.filename)
    return Index.processFormData(uploaded_file, user_Id, img_URL)

@app.route('/searchLog/<id>', methods=['POST'])
def searchLog(id):
    data_list = ch.searchLog_SelectId(id)
    return jsonify({'data_list': data_list})

@app.route('/images/<filename>', methods=['GET'])
def server_image(filename):
    return send_from_directory('C:/users/user/Desktop/top_clothes/server', filename)

if __name__ == '__main__':
    app.run('127.0.0.1', 5000, debug=True)