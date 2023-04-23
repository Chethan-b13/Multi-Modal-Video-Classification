from flask import Flask,jsonify
from keras.models import model_from_json
from keras.applications.vgg16 import VGG16
from scipy import stats as s
import keras.utils as image
import math
import os
import numpy as np
import pandas as pd
import cv2
from glob import glob
from tqdm import tqdm
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
base_model = VGG16(weights='imagenet', include_top=False)



@app.route('/')
def home():
    return jsonify("Hello World")

def loadModel():
    json_file = open('Saved_models/model_batch1.json', 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model_json)
    loaded_model.load_weights('Saved_models/model_batch1.h5')
    return loaded_model

@app.route('/predict/<video_file>')
def predict(video_file):

    model = loadModel()

    count = 0
    cap = cv2.VideoCapture('test_videos/'+video_file)   # capturing the video from the given path
    frameRate = cap.get(5) #frame rate
    x=1
    # removing all other files from the temp folder
    files = glob('temp/*')
    for f in files:
        os.remove(f)
    while(cap.isOpened()):
        frameId = cap.get(1) #current frame number
        ret, frame = cap.read()
        if (ret != True):
            break
        if (frameId % math.floor(frameRate) == 0):
            # storing the frames of this particular video in temp folder
            filename ='temp/' + "_frame%d.jpg" % count;count+=1
            cv2.imwrite(filename, frame)
    cap.release()
    
    # reading all the frames from temp folder
    images = glob("temp/*.jpg")
    prediction_images = []
    for i in range(len(images)):
        img = image.load_img(images[i], target_size=(224,224,3))
        img = image.img_to_array(img)
        img = img/255
        prediction_images.append(img)
        
    # converting all the frames for a test video into numpy array
    prediction_images = np.array(prediction_images)
    # extracting features using pre-trained model
    prediction_images = base_model.predict(prediction_images)
    # converting features in one dimensional array
    prediction_images = prediction_images.reshape(prediction_images.shape[0], 7*7*512)
    # predicting tags for each array
    # prediction = model.predict_classes(prediction_images)
    prediction  = np.argmax(model.predict(prediction_images))
    return jsonify(str(prediction))
    # appending the mode of predictions in predict list to assign the tag to the video
    train = pd.read_csv('UCF/train_new.csv')
    y = train['class']
    y = pd.get_dummies(y)
    return jsonify(y.columns.values[s.mode(prediction)[0][0]])



@app.route('/compress/<video_path>')
def compress(video_path):
    from moviepy.editor import VideoFileClip

    # Define the input and output video paths
    input_path = f'test_videos/{video_path}'
    output_path = f'test_videos/compressed_{video_path}'

    print("1")
    # Load the video clip
    clip = VideoFileClip(input_path)

    print("2")
    # Resize the video clip to 320x240 resolution
    resized_clip = clip.resize((320, 240))

    print("3")
    # Save the resized video clip to the output path
    resized_clip.write_videofile(output_path)

    print("4")
    # Release the video clip from memory
    clip.close()
    return jsonify({"Success":f"Video Compressed and downloaded into -> {output_path}"})


if __name__ == '__main__':
    app.run(host="0.0.0.0",port=8000,debug=True)