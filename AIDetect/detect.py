import cv2
import numpy as np
import time
from phone import YoloV3, load_darknet_weights, draw_outputs

yolo = YoloV3()
load_darknet_weights(yolo, "yolov3.weights")
faceCascade = cv2.CascadeClassifier("frontface.xml")
cap = cv2.VideoCapture(0)

detection_results = []

def stopCode(seconds = 10):
    print(f"Sleeping For {seconds} seconds")
    time.sleep(seconds)

def detect():
    global detection_results
    while True:
        ret, image = cap.read()
        if ret == False:
            break

        faces = faceCascade.detectMultiScale(
            cv2.cvtColor(image, cv2.COLOR_BGR2GRAY),
            scaleFactor=1.1,
            minNeighbors=5,
            minSize=(30, 30),
        )

        img = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        img = cv2.resize(img, (320, 320))
        img = img.astype(np.float32)
        img = np.expand_dims(img, 0)
        img = img / 255
        class_names = [c.strip() for c in open("classes.TXT").readlines()]
        boxes, scores, classes, nums = yolo(img)
        for i in range(nums[0]):
            if int(classes[0][i] == 63):
                print("Laptop detected")
                detection_results.append("Laptop")
                stopCode()
            if int(classes[0][i] == 67):
                print("Mobile Phone detected")
                detection_results.append("Mobile Phone")
                stopCode()
        if len(faces) > 1:
            print(f"Multiple Person ({len(faces)}) detected.")
            detection_results.append("Multiple Person")
            stopCode()

        image = draw_outputs(image, (boxes, scores, classes, nums), class_names)
        for (x, y, w, h) in faces:
            # Draw a rectangle around each detected face
            cv2.rectangle(image, (x, y), (x + w, y + h), (255, 255, 0), 2)

        cv2.imshow("Prediction", image)
        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

    cap.release()
    cv2.destroyAllWindows()