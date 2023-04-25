import urllib.request 
import requests
from bs4 import BeautifulSoup as bs
from selenium import webdriver
import os
import time
from selenium.webdriver.chrome.options import Options

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




base_model = VGG16(weights='imagenet', include_top=False)


def download_videos(source,video_class,filename,num_of_videos):
    for i,link in enumerate(source):
        if num_of_videos < i-1:
            break
        video = link.get('src')
        try:
            print(filename)
            urllib.request.urlretrieve(video , f"ScrapedData/{video_class}/{filename}.{link.get('type').split('/')[1]}")
            filename+=1
        except:
            continue
            
def scrape_videos(video_class,num):
    path = "ScrapedData/{}".format(video_class)
    if os.path.exists(path):
        filename = len(os.listdir(path))
    else:
        print('Folder doesnt exists ..! Creating folder\n ')
        os.makedirs(path)
        filename = 0
        
    print("Scarping data...\n")
    scrape_link = f"https://www.pexels.com/search/videos/{video_class}/"
    options = Options()
    options.headless = True
    options.add_argument("--window-size=1920,1200")
    
    driver = webdriver.Chrome(executable_path='chromedriver')
    driver.get(scrape_link)
    time.sleep(2)  # Allow 2 seconds for the web page to open
    scroll_pause_time = 1 # You can set your own pause time. My laptop is a bit slow so I use 1 sec
    screen_height = driver.execute_script("return window.screen.height;")   # get the screen height of the web
    i = 1

    while i<(num//5):
        # scroll one screen height each time
        driver.execute_script("window.scrollTo(0, {screen_height}*{i});".format(screen_height=screen_height, i=i))  
        i += 2
        time.sleep(scroll_pause_time)
        # update scroll height each time after scrolled, as the scroll height can change after we scrolled the page
        scroll_height = driver.execute_script("return document.body.scrollHeight;")  
        # Break the loop when the height we need to scroll to is larger than the total scroll height
        if (screen_height) * i > scroll_height:
            break 
        time.sleep(0.02)
    
    soup = bs(driver.page_source,'html.parser')
    source  = soup.find_all(['source'])
    print(len(source),'number of videos')
    time.sleep(1)
    print("Downloading videos...\n")
    if num > len(source):
        print('Increase scrolling lenght ..\n Exiting ..!')
    else:
        download_videos(source,video_class,filename,num)

def loadModel():
    json_file = open('Saved_models/model_batch1.json', 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model_json)
    loaded_model.load_weights('Saved_models/model_batch1.h5')
    return loaded_model
    

def predictor(video_file):
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
    # prediction  = np.argmax(model.predict(prediction_images))
    # return jsonify(str(prediction))
    # appending the mode of predictions in predict list to assign the tag to the video
    train = pd.read_csv('UCF/train_batch1.csv')
    y = train['class']
    y = pd.get_dummies(y)
    # return jsonify(y.columns.values[s.mode(prediction)[0][0]])

    pred = model.predict(prediction_images)
    prediction  = np.argmax(np.bincount(np.argmax(pred,axis=1)))
    return y.columns.values[prediction]