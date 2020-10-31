import os
os.environ['CUDA_VISIBLE_DEVICES']='-1'
import base64
import numpy as np
import io
import keras
from keras import Sequential
from keras.models import load_model
from flask import request
from flask import jsonify
from flask import Flask, render_template
import cv2
import requests

app = Flask(__name__)
# app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 999999999999

@app.route('/')
def home():
    return render_template('index.html')

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

@app.route('/sendreport', methods = ['POST'])
def sendEmail():
    try:
        url = "https://api.sendinblue.com/v3/smtp/email"
        message = request.get_json(force=True)
        name = message['name']
        acc = message['acc']
        email = message['email']
        level = message['level']
        color = "color:inherit !important"
        payload = {
            "sender": {
                "name": "NDR Team",
                "email": "muhdlaziem@gmail.com"
            },
            "to": [
                {
                    "email": email,
                    "name": name
                }
            ],
            "htmlContent": f"""<html xmlns="http://www.w3.org/1999/xhtml" lang="en-GB"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><title>D-CNN Retina Result</title><meta name="viewport" content="width=device-width, initial-scale=1.0" /><style type="text/css">a[x-apple-data-detectors]{color}</style></head><body style="margin: 0; padding: 0;"><table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td style="padding: 20px 0 30px 0;"><table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; border: 1px solid #cccccc;"><tr><td align="center" bgcolor="#ee4c50" style="padding: 20px 0 0 0; color: #153643; font-family: Arial, sans-serif;" ><h1 style="font-size:100;"><b>RESULT<b><h1/></td></tr><tr><td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;"><tr><td style="color: #153643; font-family: Arial, sans-serif;"><h1 style="font-size: 24px; margin: 0;">Hi {name}, Your Result is Here !</h1></td></tr><tr><td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; padding: 20px 0 30px 0;"><p style="margin: 0;">Based on your previous Diabetic Retinopathy Diagnosis. Here is the results:</p></td></tr><tr><td><table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;"><tr><td width="260" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;"><tr><td><table style="font-family: arial, sans-serif; border-collapse: collapse; width: 100%;"><tr><th style="border: 1px solid #dddddd; text-align: center; padding: 8px; background-color: #dddddd;">Details</th><th style="border: 1px solid #dddddd; text-align: center; padding: 8px; background-color: #dddddd;">Results</th></tr><tr id ="ch"><td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">Confident</td><td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">{acc}</td></tr><tr id = "ch"><td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">Level</td><td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">{level}</td></tr></table></td></tr><tr><td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; padding: 25px 0 0 0;"><p style="margin: 0;">The result of your Diagnosis is you have a {level} eye level. For further inquiries, please contact hospital near you or direct contact us on +60162820437</p></td></tr></table></td></tr></table></td></tr></table></td></tr><tr><td bgcolor="#ee4c50" style="padding: 30px 30px;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;"><tr><td style="color: #ffffff; font-family: Arial, sans-serif; font-size: 14px;"><p style="margin: 0;">&reg; NDR, 2020<br /></p></td><td align="right"><table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse;"><tr><td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td><td> <a href="https://github.com/muhdlaziem/DR.git"> <img src="https://raw.githubusercontent.com/muhdlaziem/store-file/main/github.png" alt="GitHub." width="38" height="38" style="display: block;" border="0"/> </a></td></tr></table></td></tr></table></td></tr></table></td></tr></table></body></html>""",
            "textContent": "Result of Diabetic Retinopathy Diagnosis",
            "subject": "Result of Diabetic Retinopathy Diagnosis"
        }
        headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "api-key": "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"
        }

        response = requests.request("POST", url, json=payload, headers=headers)

        print(response.text)
        response = {
            'response' : response.text,
            'status' : 'success'
        }
        return jsonify(response)
    except Exception as ex:
        print(ex)
        response = {
            'response' : ex,
            'status' : 'fail'
        }
        return jsonify(response)



if __name__ == "__main__":
    app.run(debug=True)