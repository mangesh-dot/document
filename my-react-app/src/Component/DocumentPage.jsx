// src/Component/DocumentsPage.jsx
import React, { useEffect, useState } from 'react';
import DocumentList from './DocumentList';

function DocumentsPage() {
  const [docs, setDocs] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null); // track selected document

  useEffect(() => {
    fetch('http://localhost:5000/api/doc')
      .then((r) => r.json())
      .then((data) => setDocs(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error('Failed to fetch documents:', err);
        setDocs([]);
      });
  }, []);

  function handleSelect(doc) {
    setSelectedDoc(doc); // update selected document
    console.log('Selected document:', doc);
  }

  const handleDownload = async () => {
    if (!selectedDoc) {
      alert("Please select a document first!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/generate_pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entries: [selectedDoc] }), // send only selected document
      });

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${selectedDoc.title || "document"}.pdf`;
      link.click();
    } catch (err) {
      console.error(err);
      alert("Failed to download PDF");
    }
  };

  return (
    <div>
      <h2>Documents Page</h2>
      <button onClick={handleDownload} disabled={!selectedDoc}>
        Download Selected Document as PDF
      </button>
      <br />
      <DocumentList documents={docs} onSelect={handleSelect} />
    </div>
  );
}

export default DocumentsPage;
