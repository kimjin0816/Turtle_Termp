from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
from detection_and_color_extraction import detect_objects_and_extract_colors
from pathlib import Path

app = Flask(__name__)
CORS(app)

import os

# 설정 변수
WEIGHT_PATH = os.path.abspath('C:/Users/user/Desktop/Turtle_Termp/yolov5/TopBottomPJ/top_train13/weights/best.pt')      # 가중치 파일 경로
DETECT_SCRIPT_PATH = os.path.abspath('C:/Users/user/Desktop/Turtle_Termp/yolov5/detect.py')                                         # 객체 감지 스크립트 경로
COLOR_FEATURE_SCRIPT_PATH = os.path.abspath('C:/Users/user/Desktop/Turtle_Termp/yolov5/color_feature.py')                   # 색상 특징 추출 스크립트 경로

@app.route('/', methods = ['POST'])
def upload_image():
    # 클라이언트가 전송한 파일을 가져옵니다.
    uploaded_file = request.files['image']
    # 파일을 저장할 경로를 지정합니다.
    save_path = os.path.abspath(os.path.join('C:/users/user/Desktop/top_clothes/server/', uploaded_file.filename))
    # 파일을 저장합니다.
    uploaded_file.save(save_path)
    try:
        color_keywords, detected_classes = detect_objects_and_extract_colors(
            save_path, WEIGHT_PATH, DETECT_SCRIPT_PATH, COLOR_FEATURE_SCRIPT_PATH
        )
    except FileNotFoundError as e:
        return str(e), 500
    
    color_class_array = color_keywords + detected_classes
    color_class_string = f"[{', '.join(color_keywords)}, {', '.join(detected_classes)}]"
    print(color_class_string)
    
    search_response = search_url_api(color_class_array)
    return search_response

# 키워드 추출되면 이걸로 3000포트번호로 보내면 될듯.
# 지금은 우선 키워드가 아직 추출이 안됬기 때문에 임의로 route를 만들어서 테스트.
# 키워드 추출이 되면 @app.route('/api/keywords')는 필요 없어짐
@app.route('/api/keywords', methods=['POST'])
def search_url_api(keywords):
    keyword_string = ' '.join(keywords)
    url = 'http://localhost:3000/api/search-images'
    response = requests.post(url, json={'keywords': keyword_string})
    
    if response.status_code == 200:
        return jsonify(response.json()), 200
    else:
        return 'Failed to send data to Node.js server', 500

if __name__ == '__main__':
    app.run('127.0.0.1', 5000, debug=True)