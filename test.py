import torch
import torchvision
from torchvision.models.detection import fasterrcnn_resnet50_fpn
from torchvision.transforms import functional as F

# 모델 불러오기
model = fasterrcnn_resnet50_fpn(pretrained=True)
model.eval()

# 이미지 전처리 및 추론
image_path = 'path/to/your/image.jpg'
image = Image.open(image_path)
image_tensor = F.to_tensor(image).unsqueeze(0)

with torch.no_grad():
    prediction = model(image_tensor)

# 추론 결과에서 바운딩 박스 및 클래스 정보 가져오기
boxes = prediction[0]['boxes']
labels = prediction[0]['labels']

# 원하는 클래스의 바운딩 박스 추출
desired_class_index = labels == your_desired_class
desired_boxes = boxes[desired_class_index]

# 바운딩 박스 영역 자르기
clothing_regions = [image.crop((box[0], box[1], box[2], box[3])) for box in desired_boxes]

