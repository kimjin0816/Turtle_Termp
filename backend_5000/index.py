from flask import Flask, request, url_for, jsonify, send_from_directory
from flask_cors import CORS
import requests
# import os
from clothesHandler import clothesHandler
from pathlib import Path
from detection_and_color_extraction import detect_objects_and_extract_colors

app = Flask(__name__)
CORS(app)

ch = clothesHandler()

user_id_global = ''
imageName_global = ''
image_URL_global = ''

class Index:   
    def postData(self, keywordArray, featureArray):    
        # 모형/종류/색상
        #keyword = f'{keywordArray[2]} {keywordArray[1]} {keywordArray[0]}'
        # 글자만 추출
       
        keyword = ''.join([word for sublist in keywordArray for word in sublist])
        print('키워드 : ' + keyword)
        # Node.js 서버의 URL
        url = 'http://localhost:3000/api/search-images'
        response = requests.post(url, json={'keywordArray': keywordArray, 'keywords': keyword})
        
        image_hash = ch.calculate_image_hash(imageName_global)
        check_image_duplication = ch.check_image_hash(image_hash)
        
        response_status=response.json()['status']

        # 응답을 확인합니다.
        if response_status == 'ok' and check_image_duplication[0][0] == 0:
            if user_id_global == 'null' :
                ch.clothes_Insert(image_hash, 'top', keywordArray, image_URL_global, featureArray)
            elif user_id_global != 'null':
                ch.clothes_Insert(image_hash, 'top', keywordArray, image_URL_global, featureArray)
                ch.searchLog_Insert(user_id_global, 'top', keywordArray, image_URL_global, featureArray)
            return 'Data sent to Node.js server successfully', 200
        elif response_status == 'ok' and check_image_duplication[0][0] != 0:
            if user_id_global != 'null':
                ch.searchLog_Insert(user_id_global, 'top', keywordArray, image_URL_global, featureArray)
            return 'Data sent to Node.js server successfully', 200
        return 'Failed to send data to Node.js server', 500
        
    def processFormData(self, uploaded_file, user_Id, img_URL):
        # 전역 변수를 참조합니다.
        global user_id_global
        global imageName_global
        global image_URL_global

        if user_Id != 'null':
            user_id_global = user_Id
        else:
            user_id_global = 'null'
        imageName_global = uploaded_file.filename
        image_URL_global = img_URL

        self.save_path = Path(f'C:/users/user/Desktop/top_clothes/server/{uploaded_file.filename}')
        uploaded_file.save(self.save_path)
        
        """ 객체 감지 및 색상 추출 """
        image_path = self.save_path
        weights_path = Path('C:/Users/user/Desktop/Turtle_Termp-jin/yolov5/TopBottomPJ/top_train13/weights/best.pt')
        detect_script_path = Path('C:/Users/user/Desktop/Turtle_Termp-jin/yolov5/detect.py')
        color_feature_script_path = Path('C:/Users/user/Desktop/Turtle_Termp-jin/yolov5/color_feature.py')

        # detect_objects_and_extract_colors 실행 후 결과 받아오기
        keywordArray = detect_objects_and_extract_colors(image_path, weights_path, detect_script_path, color_feature_script_path)
        #print('keywordArray_global :  ', keywordArray_global)
        return self.postData(keywordArray, featureArray=[True, True, True, True, True])

Index = Index()

@app.route('/', methods=['POST'])
def formData():
    # 클라이언트가 전송한 파일을 가져옵니다.
    uploaded_file = request.files['image']
    user_Id = request.form.get('userId')
    print('user_Id: %s' % user_Id)
    print('userId_type : %s' % type(user_Id))
    # 이미지의 URL을 생성
    img_URL = url_for('server_image', filename=uploaded_file.filename, _external=True)
    return Index.processFormData(uploaded_file, user_Id, img_URL)

@app.route('/searchLog/<id>', methods=['POST'])
def searchLog(id):
    data_list = ch.searchLog_SelectId(id)
    return jsonify({'data_list': data_list})

@app.route('/images/<filename>', methods=['GET'])
def server_image(filename):
    return send_from_directory(Path('C:/users/user/Desktop/top_clothes/server'), filename)

if __name__ == '__main__':
    app.run('127.0.0.1', 5000, debug=True)