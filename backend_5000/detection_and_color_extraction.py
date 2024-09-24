import subprocess
import os
# import glob
from pathlib import Path

def detect_objects_and_extract_colors(image_path, weights_path, detect_script_path, color_feature_script_path):
    # YOLOv5 객체 감지 수행
    detect_command = [
        'python', str(detect_script_path), '--source', str(image_path), '--weights', str(weights_path),
        '--img', '750', '--conf', '0.2', '--save-txt', '--save-crop'
    ]
    subprocess.run(detect_command, check=True)
    
    # 객체 감지 결과 디렉토리 찾기
    detect_dir = sorted(Path('C:/Users/user/Desktop/Turtle_Termp/yolov5/runs/detect').glob('*'), key=os.path.getmtime, reverse=True)[0]
    image_basename = image_path.name
    image_name, image_extension = os.path.splitext(image_basename)

    label_path = detect_dir / 'labels' / f'{image_name}.txt'
    
    if not label_path.is_file():
        raise FileNotFoundError("Object detection results not found")
    
    with open(label_path, 'r', encoding='cp949') as file:
        lines = file.readlines()
        detected_classes = sorted(set(line.split()[0] for line in lines))
        print(detected_classes[0])
        
    color_keyword_array = []
    for cls in detected_classes:
        crop_image_path = detect_dir / 'crops' / cls / f'{image_name}.jpg'
        color_keyword_command = [
            'python', str(color_feature_script_path), '--image', str(crop_image_path)
        ]
        result = subprocess.run(color_keyword_command, capture_output=True, text=True, check=True)
        color_keyword_array.append(result.stdout.strip()) 
        # feature = [False, False, False, False, False]

        feature_keywords = ["헨리넥", "로고", "프린터", "포켓", "카라", "후드"]
        feature_list = [keyword for keyword in detected_classes if keyword in feature_keywords]
        clo_name = [cls for cls in detected_classes if cls not in feature_keywords]

        feature_list = ["헨리넥", "로고"]
        clo_name = ["티셔츠"]
        # feature = [feature_hood, feature_printer, feature_henley, feature_kara, feature_pocket]
        # output = [detected_classes[0], color_keyword_array[0]]
        # 색상/키워드 bool값/옷 종류
    return  color_keyword_array[0], feature_list, clo_name