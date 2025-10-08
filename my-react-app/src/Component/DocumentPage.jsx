// src/Component/DocumentsPage.jsx
import React, { useEffect, useState } from 'react';
import DocumentList from './DocumentList';

function DocumentsPage() {
  const [docs, setDocs] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/doc')
      .then((r) => r.json())
      .then((data) => setDocs(data))
      .catch((err) => {
        console.error('Failed to fetch documents:', err);
        setDocs([]);
      });
  }, []);

  // function handleSelect(doc) {
  //   setSelectedDoc(doc);
  //   console.log('Selected document:', doc);
  // }

  const handleDownload = async () => {
    // if (!selectedDoc) {
    //   alert("Please select a document first!");
    //   return;
    // }

    try {
      const res = await fetch("http://localhost:5000/generate_pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entries: docs }), // send only selected document
      });

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "document".pdf;
      link.click();
    } catch (err) {
      console.error(err);
      alert("Failed to download PDF");
    }
  };

  return (
    <div>
      <h2>Documents Page</h2>
      <button onClick={handleDownload}>
        Download Selected Document as PDF
      </button>
      <br />
      <DocumentList documents={docs}  />
    </div>
  );
}

export default DocumentsPage;
