from flask import Flask,jsonify,request
from flask_cors import CORS
from utils import scrape_videos,predictor

app = Flask(__name__)
CORS(app)




@app.route('/')
def home():
    return jsonify("Hello World")



@app.route('/predict/<video_file>')
def predict(video_file):
    return jsonify(predictor(video_file))
    



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


@app.route('/scrape',methods=['POST'])
def scrape():
    if request.method == "POST":
        data = request.json
        try:
            scrape_videos(data['class'],data['numberofvideos'])
            return jsonify(f"Successfully Scraped {data['numberofvideos']}")
        except Exception as e:
            print(e)


if __name__ == '__main__':
    app.run(host="0.0.0.0",port=8000,debug=True)