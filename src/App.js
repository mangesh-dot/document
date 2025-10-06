import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css';


import DocumentList from "./Component/DocumentList";
import CreateDocument from "./Component/CreateDocument";
import DocumentsPage from "./Component/DocumentPage";

function App() {
  const [documents, setDocuments] = useState([]);

async function fetchDocs() {
  try {
    const res = await fetch('http://127.0.0.1:5000/api/doc');
    const data = await res.json();
    
    setDocuments(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error('Failed to fetch docs:', err);
  }
}


  useEffect(() => {
    fetchDocs();
  }, []);



function handleAdd(doc) {
  const newDoc = {
    id: Date.now(),
    title: doc.title || "",   
    content: doc.content || "" 
  };
  setDocuments(prev => [...prev, newDoc]);
}


function handleSelect(doc) {
  if (!doc) return;
  alert("Selected: " + (doc.title || "Untitled Document"));
}


 

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/create">Create Document</Link> |{" "}
        <Link to="/documents">Documents Page</Link> |{" "}
        <button onClick={fetchDocs} >Refresh</button>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <h2>Documents</h2>
              <DocumentList documents={documents} />
            </>
          }
        />

        <Route path="/create" element={<CreateDocument onCreate={handleAdd} />} />

        {/* Use a unique path for each page */}
        <Route
          path="/list"
          element={<DocumentList documents={documents} onSelect={handleSelect} />}
        />
        <Route path="/documents" element={<DocumentsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
