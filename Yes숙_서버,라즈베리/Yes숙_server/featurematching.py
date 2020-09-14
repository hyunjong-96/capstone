import cv2
import sys
import os
import json

import matplotlib.pyplot as plt

foldername=[]
correctfolder=[]


def Read_QR():
	folders = os.listdir('.\\QR_img')
	length = len(folders)
	for i in folders:
		foldername.append(i)
		pass
	for i in range(0,length):
		#featureMatching(sys.argv[1],foldername[i])
		featureMatching('qr-1589459974522.jpg',foldername[i])
		pass
	pass


def featureMatching(scanQR,comQR):
	img1 = cv2.imread('.\\compare\\scan_QRimg\\'+scanQR,cv2.IMREAD_GRAYSCALE)
	img2 = cv2.imread('.\\QR_img\\'+comQR,cv2.IMREAD_GRAYSCALE)
	res = None

	sift = cv2.xfeatures2d.SIFT_create()

	kp1, des1 = sift.detectAndCompute(img1, None)
	kp2, des2 = sift.detectAndCompute(img2, None)

	bf = cv2.BFMatcher()
	matches = bf.knnMatch(des1, des2,k=2)

	good = []
	for m,n in matches:
		if m.distance <0.65 * n.distance:
			good.append([m])
			pass
	if(len(good)>=200):
		#print("correct!")
		correctfolder.append(comQR)
	#else :
		#print("wrong!")

	img3 = cv2.drawMatchesKnn(img1,kp1,img2,kp2,good,None,flags=2)
	plt.imshow(img3),plt.show() 

	pass

Read_QR()
	
json_object={
	'object' : correctfolder
}
json_string = json.dumps(json_object)
print(json_string)
