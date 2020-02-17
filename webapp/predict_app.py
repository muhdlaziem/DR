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

app = Flask(__name__)
# app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 999999999999
def get_model():
    global model
    model = load_model('./assets/10epoch74%.h5')
    print(" * Model loaded!")

def preprocessing_image(image, target_size):
    if image.mode != 'RGB':
        image = image.convert('RGB')
    image = image.resize(target_size)
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)

    return image

print(' * Loading Keras model...')
get_model()

@app.route('/predict', methods = ['POST'])
def predict():
    message = request.get_json(force=True)
    encoded = message['image']
    decoded = base64.b64decode(encoded)
    image = Image.open(io.BytesIO(decoded))
    processed_image = preprocessing_image(image , target_size = (64,64))

    prediction = model.predict(processed_image).tolist()

    response = {
        'prediction' : {
            'Normal' : prediction[0][0],
            'Mild': prediction[0][1],
            'Moderate': prediction[0][2],
            'Severe': prediction[0][3],
            'Proliferative': prediction[0][4]

        }
    }
    return jsonify(response)