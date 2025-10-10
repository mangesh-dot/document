import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "../styles/ReviewDocument.css";


function ReviewDocument() {
  const { id } = useParams();
  const [doc, setDoc] = useState(null);
   const navigate = useNavigate();

  const [status, setStatus] = useState(null);


   function handleApproval(mark){
    setStatus(mark)
   };



// async function onDelete(i){

//     const res=await fetch(`http://localhost:5000/api/doc/${id}/${i}`,{
//         method:"DELETE"
//     });
//     if(!res) return jsonify({"message":"invalidres"})

//         const data =await res.json();

//         setDoc((prev)=>({...prev, entries:data.entries}));

    

// }

  const handleDownload = async () => {
    try {
      const res = await fetch("http://localhost:5000/generate_pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entries: doc.entries }),
      });

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "documents.pdf";
      link.click();
    } catch (err) {
      console.error(err);
      alert("Failed to download PDF");
    }
  };






  useEffect(() => {
    fetch(`http://localhost:5000/api/doc/${id}`)
      .then((r) => r.json())
      .then((data) => setDoc(data))
      .catch((err) => console.error("Failed to fetch document:", err));
  }, [id]);

   if (!doc) return <p>Loading...</p>;
 
 return (
    <div className="document-container">
      <h2 className="document-title">Document #{doc.id}</h2>
      <hr className="divider" />

      
      {status === "Approve" && (
        <div className="action-section">
          <button
            type="button"
            className="download-btn"
            onClick={handleDownload}
          >
             Download PDF
          </button>
        </div>
      )}

      {status === "Reject" && (
        <div className="action-section">
          <button
            type="button"
            className="edit-btn"
            onClick={() => navigate(`/create/${doc.id}`)}
          >
            Edit Document
          </button>
        </div>
      )}

      
      {doc.entries.map((entry, i) => (
        <div key={i} className="document-entry">
          <strong className="entry-title">{entry.title}</strong>
          <div className="entry-content">{entry.content}</div>
          {/* <button className="delete-btn" onClick={() => onDelete(i)}>🗑 Delete</button> */}
        </div>
      ))}

      
      <div className="approval-section">
        <button
          className="approve-btn"
          onClick={() => handleApproval("Approve")}
        >
          Approve
        </button>
        <button
          className="reject-btn"
          onClick={() => handleApproval("Reject")}
        >
          Reject
        </button>
        {status && <span className="status-text">Status: {status}</span>}
      </div>
    </div>
  );
}

export default ReviewDocument;