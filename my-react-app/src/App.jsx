import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css';


import DocumentList from "./Component/DocumentList";
import CreateDocument from "./Component/CreateDocument";
// import DocumentsPage from "./Component/DocumentPage";
import Home from "./Component/Home";

function App() {
  const [documents, setDocuments] = useState([]);

async function fetchDocs() {
  try {
    const res = await fetch('http://127.0.0.1:5000/api/doc');
    const data = await res.json();
    
    setDocuments(data);
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
        <Link to="/list">Documents Page</Link> |{" "}
        <button onClick={fetchDocs} >+</button>
      </nav>


    <Routes>
      <Route path="/" element={<Home />} />
      <Route
          path="/list"
          element={<DocumentList documents={documents} onSelect={handleSelect} />}
        />
      <Route path="/create" element={<CreateDocument onAdd={handleAdd}/>} />
      {/* <Route path="/documents" element={<DocumentPage />} /> */}
    </Routes>
    </BrowserRouter>
  );
}
export default App;
