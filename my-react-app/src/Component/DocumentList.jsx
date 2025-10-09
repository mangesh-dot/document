import React from "react";
import "../styles/DocumentList.css";
import { useNavigate } from "react-router-dom";

function DocumentList({ documents = [], onDelete }) {
   const navigate = useNavigate();
  if (!documents || documents.length === 0) {
    return <div className="no-documents">No documents yet.</div>;
  }

  return (
    <div className="document-list">
      <ul>
        {documents.map((doc) => (
          <li key={doc.id} className="document-card"
            onClick={() => navigate(`/documents/${doc.id}`)}>
            {doc.entries && doc.entries.length > 0 ? (
              <div>
                {(doc.entries).map((e, i) => (
                  <div key={i} className="document-entry">
                    <strong>{e.title}</strong>
                    <div>{e.content}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="document-entry">
                <strong>{doc.title}</strong>
                <div>{doc.content}</div>
              </div>
            )}

            <div className="document-actions">
              <button
                className="review-btn"
                onClick={() => navigate(`/documents/${doc.id}` )}
              >
                Review
              </button>
              <button
                className="delete-btn"
                type="button"
                onClick={() => onDelete && onDelete(doc.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DocumentList;
