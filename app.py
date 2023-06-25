from flask import Flask, request, jsonify
from flask_cors import CORS
from tika import parser
import unicodedata

app = Flask(__name__)

CORS(app, origins="http://localhost:3000")

"""Handles the upload of a file."""
@app.route('/api/sendPDF', methods=['POST'])
def upload_file():
    d = {}
    try:
        file = request.files['pdf']
        file_bytes = file.read()
        tika_document = parser.from_buffer(file_bytes)

        text = tika_document.get('content')        

        normalized_text = unicodedata.normalize('NFC', text)
        # Filter out characters that are not in the printable ASCII range
        clean_text = ''.join(c if c.isprintable() and ord(
            c) < 128 or c == '\n' else '' for c in normalized_text)
        
        print(clean_text)
        print(len(clean_text))

        filename = file.filename

        d['filename'] = filename
        d['status'] = 1
        d['content'] = clean_text

    except Exception as e:
        print(f"Couldn't upload file {e}")
        d['status'] = 0

    return jsonify(d)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
