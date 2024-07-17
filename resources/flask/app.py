from flask import Flask, request, jsonify
from selectorlib import Extractor
import requests
import json

app = Flask(__name__)

def create_extractor(url):
    # Create an Extractor by reading from the YAML file
    if("amazon" in url):
        return Extractor.from_yaml_file('selectorsAmazon.yml')
    elif("flipkart" in url):
        return Extractor.from_yaml_file('selectorsFlipkart.yml')
    elif("ebay" in url):
        return Extractor.from_yaml_file('selectorsEbay.yml')

@app.route('/scrape', methods=['POST'])
def scrape():
    try:
        data = request.get_json()
        url = data['url']
        
        e = create_extractor(url)
        headers = {
            'dnt': '1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-user': '?1',
            'sec-fetch-dest': 'document',
            'referer': 'https://www.amazon.com/',
            'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
        }

        # Download the page using requests
        print("Downloading %s" % url)
        r = requests.get(url, headers=headers)

        # Simple check to check if page was blocked (Usually 503)
        if r.status_code > 500:
            if "To discuss automated access to Amazon data please contact" in r.text:
                return jsonify({"error": "Page was blocked by Amazon. Please try using better proxies."}), 403
            else:
                return jsonify({"error": f"Page must have been blocked by Amazon as the status code was {r.status_code}"}), 403

        # Pass the HTML of the page and create
        result = e.extract(r.text)
        result['price'] = result['price'].replace(' .', '') 
        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0', port=8080)
