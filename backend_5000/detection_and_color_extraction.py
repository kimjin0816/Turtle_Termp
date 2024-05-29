import subprocess
import os
import glob

def detect_objects_and_extract_colors(image_path, weights_path, detect_script_path, color_feature_script_path):
    # YOLOv5 객체 감지 수행
    detect_command = [
        'python', detect_script_path, '--source', image_path, '--weights', weights_path,
        '--img', '768', '--conf', '0.1', '--save-txt', '--save-crop'
    ]
    subprocess.run(detect_command, check=True)
    
    # 객체 감지 결과 디렉토리 찾기
    detect_dir = sorted(glob.glob('runs/detect/*'), key=os.path.getmtime, reverse=True)[0]
    image_basename = os.path.basename(image_path)
    image_name, image_extension = os.path.splitext(image_basename)
    image_name = image_name  # 확장자 제외

    label_path = os.path.join(detect_dir, 'labels', f'{image_name}.txt')
    
    if not os.path.isfile(label_path):
        raise FileNotFoundError("Object detection results not found")
    
    with open(label_path, 'r') as file:
        lines = file.readlines()
        detected_classes = sorted(set(line.split()[0] for line in lines))
    
    color_keyword_array = []
    for cls in detected_classes:
        crop_image_path = os.path.join(detect_dir, 'crops', cls, f'{image_name}.jpg')
        color_keyword_command = [
            'python', color_feature_script_path, '--image', crop_image_path
        ]
        result = subprocess.run(color_keyword_command, capture_output=True, text=True, check=True)
        color_keyword_array.append(result.stdout.strip())
    
    return color_keyword_array, detected_classes