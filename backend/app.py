from flask import Flask, request, jsonify
import json
from db import init_db, fetch_all_documents, save_documents,delete_document,fetch_doc_id,delete_entries
from pdf import generate_pdf
from flask_cors import CORS
app = Flask(__name__)
CORS(app)


init_db(app)


@app.route('/')
def home():
    return 'Home'



@app.route('/api/doc', methods=['POST'])
def api_add_doc():
    data = request.get_json() #converting json to python list

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
    return jsonify(result)

@app.route("/api/doc/<int:id>/<int:i>",methods=["DELETE"])
def api_delete_entries(id,i):
    result=delete_entries(id,i)
    return jsonify(result)



@app.route('/generate_pdf', methods=['POST'])
def generate_pdf_route():
    
    return generate_pdf()


@app.route("/api/doc/<int:id>",methods=["GET"])
def get_doc_id(id):
    docs= fetch_doc_id(id)
    return jsonify(docs)

@app.route("/api/doc/<int:id>" ,methods=["PUT"])
def update_doc(id):
    data = request.get_json()
    entries = data.get("entries", [])
    result = save_documents(entries,id)
    return jsonify(result)


    

if __name__ == '__main__':
    app.run(debug=True)
