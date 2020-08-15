import base64
import numpy as np
import io
from PIL import Image
import keras
from keras import backend as K
from keras import Sequential
from keras.models import load_model
from keras.preprocessing.image import ImageDataGenerator
from keras.preprocessing.image import img_to_array
from flask import request
from flask import jsonify
from flask import Flask
import cv2

app = Flask(__name__)
# app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 999999999999
def get_model():
    global model
    model = load_model('./assets/denseNet_3_all.h5')
    print(" * Model loaded!")

def preprocessing_image(img, desired_size):
    # if img.mode != 'RGB':
    #     img = img.convert('RGB')
    # img = img.resize(desired_size)
    # img = img_to_array(img)
    # img = np.expand_dims(img, axis=0)
    
    # img = cv2.imread(image_path)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    #img = crop_image_from_gray(img)
    img = cv2.resize(img, (desired_size,desired_size))
    img = cv2.addWeighted(img,4,cv2.GaussianBlur(img, (0,0), desired_size/40) ,-4 ,128)
    img = np.expand_dims(img, axis=0)

    return img

print(' * Loading Keras model...')
get_model()

@app.route('/predict', methods = ['POST'])
def predict():
    message = request.get_json(force=True)
    encoded = message['image']
    decoded = base64.b64decode(encoded)
    image = io.BytesIO(decoded)
    file_bytes = np.asarray(bytearray(image.read()), dtype=np.uint8)
    print(file_bytes.shape)
    img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
    print(img.shape)

    processed_image = preprocessing_image(img , desired_size = 320)

    prediction = model.predict(processed_image).tolist()
    print(prediction)
    response = {
        'prediction' : {
            'Normal' : prediction[0][0],
            'Moderate': prediction[0][1],
            'Severe': prediction[0][2],

        }
    }
    print(response)
    return jsonify(response)