from flask_sqlalchemy import SQLAlchemy

import os


db = SQLAlchemy()


def init_db(app):
    # """Initialize SQLAlchemy with the provided Flask app and create tables.

    # This function should be called once from the application's entrypoint
    # after `app = Flask(__name__)` is created.
    # """
    
    db_uri = 'mysql+pymysql://root:password@localhost/react_db'
    app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    app.config.setdefault('SQLALCHEMY_TRACK_MODIFICATIONS', False)
    db.init_app(app)
    with app.app_context():
        db.create_all()


class Document(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=True)
    content = db.Column(db.Text, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
        }


def fetch_all_documents(app=None):
    # """Return all documents as a list of dicts.

    # If `app` is provided, this will push an app context; otherwise it
    # assumes there is an active Flask app context.
    # """
    if app is not None:
        with app.app_context():
            rows = Document.query.order_by(Document.id.desc()).all()
    else:
        rows = Document.query.order_by(Document.id.desc()).all()
    return [r.to_dict() for r in rows]


def save_documents(entries):
   
    saved_docs = []
    for entry in entries:
        doc = Document(title=entry.get('title', ''), content=entry.get('content', ''))
        db.session.add(doc)
        saved_docs.append(doc)

    db.session.commit()
    return [d.to_dict() for d in saved_docs]


