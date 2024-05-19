from flask import Flask, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/', methods = ['POST'])
def upload_image():
    # 클라이언트가 전송한 파일을 가져옵니다.
    uploaded_file = request.files['image']
    # 파일을 저장할 경로를 지정합니다.
    save_path = 'C:/users/user/Desktop/top_clothes/server/' + uploaded_file.filename
    # 파일을 저장합니다.
    uploaded_file.save(save_path)
    return 'Image uploaded successfully', 200
    
# 키워드 추출되면 이걸로 3000포트번호로 보내면 될듯.
@app.route('/api/keywords')
def searchUrl_API():
    # keywords = color + ' ' + shape + ' ' + type
    keyword = '빨강 패딩'
    
    # Node.js 서버의 URL
    url = f'http://localhost:3000/api/search-images/{keyword}'
    
    # POST 요청을 보냅니다.
    response = requests.post(url)
    
    # 응답을 확인합니다.
    if response.status_code == 200:
        return 'Data sent to Node.js server successfully', 200
    else:
        return 'Failed to send data to Node.js server', 500
    
if __name__ == '__main__':
    app.run('127.0.0.1', 5000, debug=True)
