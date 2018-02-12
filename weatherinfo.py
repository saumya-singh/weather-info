import requests, pprint, json
from flask import Flask, request, render_template, url_for, session, redirect

app = Flask(__name__, static_folder = 'static', static_url_path = '')

@app.route('/')
def home_page():
    return render_template('weatherinfo.html')

@app.route('/api/weatherinfo/', methods = ['POST'])
def weathermap():
    content = request.get_json()
    latitude = str(content["latitude"])
    longitude = str(content["longitude"])
    url = "http://api.openweathermap.org/data/2.5/weather?lat=" + \
    latitude + "&lon=" + longitude + "&APPID=4974fcc872d0bd14f909e5ecab5de04d"
    info = requests.get(url)
    info_decoded = info.content.decode('utf8').replace("'", '"')
    info_json = json.loads(info_decoded)
    pprint.pprint(info_json)
    return json.dumps(info_json)

if __name__ == '__main__':
	app.run(debug = True)
