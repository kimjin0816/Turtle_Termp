from flask import Flask, request

app = Flask(__name__)

@app.route('/', methods = ['POST'])
def upload_image():
    # 클라이언트가 전송한 파일을 가져옵니다.
    uploaded_file = request.files['image']
    # 파일을 저장할 경로를 지정합니다.
    save_path = 'C:/users/user/Desktop/top_clothes/server/' + uploaded_file.filename
    # 파일을 저장합니다.
    uploaded_file.save(save_path)
    
@app.route('/<shape>/<type>/<color>')
def searchUrl_API(shape, type, color):
    # serach API URL
    serach_url = 'https://openapi.naver.com/v1/search/shop.json?query='+shape+'/'+type+'/'+color 
    return serach_url
    
if __name__ == '__main__':
    app.run('127.0.0.1', 5000, debug=True)
    # app.run(debug=True)