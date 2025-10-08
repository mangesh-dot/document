from flask import Flask, request, jsonify
from db import init_db, fetch_all_documents, save_documents,delete_document
from pdf import generate_pdf
from flask_cors import CORS
app = Flask(__name__)
CORS(app, origins="http://localhost:5174")


init_db(app)


@app.route('/')
def home():
    return 'Home'



@app.route('/api/doc', methods=['POST'])
def api_add_doc():
    data = request.get_json()
    entries = data.get('entries', [])
    if not entries:
        return jsonify({'error': 'No entries provided'})

    saved_docs = save_documents(entries)
    return jsonify({ 'docs': saved_docs})






@app.route('/api/doc', methods=['GET'])
def get_docs():
    docs = fetch_all_documents()  
    return jsonify(docs) 


@app.route("/api/doc/<int:id>" , methods=["DELETE"])
def api_delete_section(id):
    result=delete_document(id)
    return jsonify(result);



@app.route('/generate_pdf', methods=['POST'])
def generate_pdf_route():
    
    return generate_pdf()
    

if __name__ == '__main__':
    app.run(debug=True)
