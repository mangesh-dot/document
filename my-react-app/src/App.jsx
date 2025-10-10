import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css';

const API_URL = import.meta.env.VITE_API_URL;



import DocumentList  from "./Component/DocumentList";
import CreateDocument from "./Component/CreateDocument";



import Home from "./Component/Home";
import ReviewDocument from "./Component/ReviewDocument";


function App() {
  const [documents, setDocuments] = useState([]);
  

async function fetchDocs() {
  try {
    const res = await fetch(`${API_URL}/api/doc`);
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
    const res= await fetch(`${API_URL}/api/doc/${docId}` ,{
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
        <Link to="/list">Documents list</Link> 
        
      
        <button onClick={fetchDocs} >refresh</button>
      </nav>


    <Routes>
      <Route path="/" element={<Home />} />
      <Route
          path="/list"
          element={<DocumentList documents={documents}  onDelete={DeleteSection}   />}
        />
      <Route path="/create" element={<CreateDocument onAdd={handleAdd}  />} />

      <Route path="/create/:id" element={<CreateDocument onAdd={handleAdd}/> }/>
     
      

      <Route path="/review/:id" element={<ReviewDocument />}/>
    </Routes>
    </BrowserRouter>
  );
}
export default App;
