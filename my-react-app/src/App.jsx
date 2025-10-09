import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css';


import DocumentList from "./Component/DocumentList";
import CreateDocument from "./Component/CreateDocument";
import DocumentDetail from "./Component/DocumentDetail";

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

function handleAdd(sections) {

  const newDoc = {
    id: Date.now(),
    entries:sections,
  };
  setDocuments(prev => [...prev, newDoc]);
}





 

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/create">Create Document</Link> |{" "}
        <Link to="/list">Documents list</Link> |{" "}
      
        <button onClick={fetchDocs} >+</button>
      </nav>


    <Routes>
      <Route path="/" element={<Home />} />
      <Route
          path="/list"
          element={<DocumentList documents={documents}  onDelete={DeleteSection}  />}
        />
      <Route path="/create" element={<CreateDocument onAdd={handleAdd}  />} />
     
      <Route path="/documents/:id" element={<DocumentDetail />} />
    </Routes>
    </BrowserRouter>
  );
}
export default App;
