import React from "react";
import "../styles/DocumentList.css";

 function DocumentList({ documents = [], onDelete }) {
  if (!documents || documents.length === 0) {
    return <div>No documents yet.</div>;
  }



  return (
    <div className="document-list">
      <ul>
        {documents.map((doc) => (
          <li key={doc.id}>
            {doc.entries && doc.entries.length > 0 ? (
              <div>
                {doc.entries.map((e, i) => (
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
            <div className="document-buttons">
              <button onClick={() => onSelect && onSelect(doc)}>Review</button>
            </div>
            <div>
              <button type="button" onClick={()=>onDelete(doc.id)}>Delete</button>
              </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DocumentList;











