// src/Component/DocumentsPage.jsx
import React, { useEffect, useState } from 'react';
import DocumentList from './DocumentList';

export default function DocumentsPage() {
  const [docs, setDocs] = useState([]);

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
    
    console.log('Selected document:', doc);
  }

  return <DocumentList documents={docs} onSelect={handleSelect} />;
}
