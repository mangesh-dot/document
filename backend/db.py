from flask_sqlalchemy import SQLAlchemy
import json,jsonify
import os


db = SQLAlchemy()


def init_db(app):
  
    
    DATABASE_URL = os.environ.get("DATABASE_URL")  # we’ll set this on Render

    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    with app.app_context():
        db.create_all()





class Document(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    entries=db.Column(db.Text,nullable=False)

    def to_dict(self):
        try:
            entries = json.loads(self.entries) if self.entries else []
            
            # If entries is empty or invalid JSON, fallback to empty list
            return {
                'id': self.id,
                'entries': entries,
            }
        except json.JSONDecodeError:
            return {
                'id': self.id,
                'entries': []
            }


def fetch_all_documents(app=None):
    
    docs = Document.query.order_by(Document.id.desc()).all()

    result = []
    for doc in docs:
        result.append({
            'id': doc.id,
            'entries': json.loads(doc.entries)  # string → Python list
        })
           
    return result

def fetch_doc_id(id):
    doc=Document.query.get(id)
    return doc.to_dict()



def delete_document(id):

    doc=Document.query.get(id)
    if not doc:
        return {"message":"Document not found"}
    
    db.session.delete(doc)
    db.session.commit()
    return {"message":"Document deleted"}



def delete_entries(id,index):
    doc=Document.query.get(id)

    entries=json.loads(doc.entries)

    deleted_entry=entries.pop(index)

    doc.entries=json.dumps(entries)

    db.session.commit()

    return ({
            "message": "Entry deleted successfully",
            "deleted": deleted_entry,
            "entries": entries
        }),





def save_documents(entries,doc_id=None):

    if(doc_id):
        doc=Document.query.get(doc_id)
        doc.entries=json.dumps(entries)
        db.session.commit()
        return doc.to_dict()
   
    
    
    else:
        saved_docs = []
        doc=Document(entries=json.dumps(entries))
        db.session.add(doc)

        db.session.commit()
        saved_docs.append(doc)
        return [d.to_dict() for d in saved_docs]


