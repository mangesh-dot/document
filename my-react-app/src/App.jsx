import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css';


import DocumentList from "./Component/DocumentList";
import CreateDocument from "./Component/CreateDocument";

import Home from "./Component/Home";
import DocumentPage from "./Component/DocumentPage";

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



async function DeleteSection(docId){
  try{
    const res= await fetch(`http://localhost:5000/api/doc/${docId}` ,{
      method:"DELETE",

      

    });
    if(!res.ok) throw new Error("faildtodelete");

   
    setDocuments((prev)=>prev.filter(doc=>doc.id!==docId));

    
  }catch(err){
    console.error("error deleting",err);

  }


}

function handleAdd(doc) {
  const newDoc = {
    id: Date.now(),
    title: doc.title || "",   
    content: doc.content || "" 
  };
  setDocuments(prev => [...prev, newDoc]);
}


// function handleSelect(doc) {
//   if (!doc) return;
//   alert("Selected: " + (doc.title || "Untitled Document"));
// }


 

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/create">Create Document</Link> |{" "}
        <Link to="/list">Documents list</Link> |{" "}
        <Link to="page">Document </Link>
        <button onClick={fetchDocs} >+</button>
      </nav>


    <Routes>
      <Route path="/" element={<Home />} />
      <Route
          path="/list"
          element={<DocumentList documents={documents}  onDelete={DeleteSection} />}
        />
      <Route path="/create" element={<CreateDocument onAdd={handleAdd}  />} />
      <Route path="/page" element={<DocumentPage />} />
    </Routes>
    </BrowserRouter>
  );
}
export default App;
