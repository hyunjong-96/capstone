import face_recognition
import cv2
import os
import sys
import numpy as np
import json
foldername = []
result =''
DATA_PATH = ".\\face\\" 
'''
def inputfolder():
    folders = os.listdir('.\\uploads')
    length = len(folders)
    for i in folders:
        faceimage.append(i)
        pass
    pass
'''
'''
def compare():
    length = len(faceimage)
    for i in range(0,length):
        known_image = face_recognition.api.load_image_file(".\\compareface\\"+sys.argv[1],mode='RGB')
        unknown_image = face_recognition.api.load_image_file(".\\uploads\\"+faceimage[i],mode='RGB')

        encodings = face_recognition.face_encodings(known_image, num_jitters=10)[0]
        unknown_image = face_recognition.face_encodings(unknown_image,num_jitters=10)[0]
        results = face_recognition.compare_faces([encodings],unknown_image,tolerance=0.436)
        if(results==True):
            result = results
        else:
            result = False
        pass
    pass
'''

class FaceRecog():
    def __init__(self):
        self.known_face_encodings = []
        self.known_face_names = []

        dirname='face'  #사용자 얼굴사진 폴더
        files = os.listdir(dirname)
        distance = []
        names=[]
        imge = face_recognition.load_image_file("./compare/compareface/"+sys.argv[1])  # 비교할 이미지 불러오기
        #imge = face_recognition.load_image_file("./compare/compareface/face-1591088534157.jpg")  # 비교할 이미지 불러오기
        face_encodinge = face_recognition.face_encodings(imge, num_jitters=5)[0]
        for filename in files:
            name, ext = os.path.splitext(filename)

            if ext == '.jpg': # 만약 확장자명이 .jpg 라면 ?
                self.known_face_names.append(name) #know_face_names[] 배열에 파일이름(name) 추가
                pathname = os.path.join(dirname, filename) #경로와 파일이름 합치기
                img = face_recognition.load_image_file(pathname) # 합친 경로를 img 변수로 불러오기
                face_encoding = face_recognition.face_encodings(img,num_jitters=5)[0] #불러온 이미지를 face_encoding에 인코딩
                self.known_face_encodings.append(face_encoding) # known_face_encodings[] 배열에 인코딩된 이미지를 추가한다.

                # Initialize some variables(변수)
                
                self.face_locations = []
                self.face_encodings = []
                self.face_names = []
                self.process_this_frame = True

                
                names.append(filename)
                
            distance.append(face_recognition.api.face_distance([face_encodinge],face_encoding))

        t=min(distance)

        if (t)<0.436:
            json_object = {
                'object' : names[(int(distance.index(t)))]
            }
            json_string = json.dumps(json_object)
            print(json_string)
            
        else:
            print("no match")


if __name__ == '__main__':
    face_recog = FaceRecog()
