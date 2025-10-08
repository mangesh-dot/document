import { useState } from "react";
import "../styles/DocumentForm.css";



function CreateDocument({ onAdd }) {


   const [sections, setSections] = useState([{ title: "", content: "" }]);
 
   


   function deleteSection(index){
    const updated=sections.filter((_,i)=>i!==index);
    setSections(updated);


   }
   function addSection() {
     setSections((prev) => [...prev, { title: "", content: "" }]);
   }
 
   
   function handleTitleChange(index, e) {
     const updated = [...sections];
     updated[index].title =e.target.value;
     setSections(updated);
   }
 
  
   function handleContentChange(index, e) {
     const updated = [...sections];
     updated[index].content =e.target.value;
     setSections(updated);
   }
 
   
   async function handleSubmit(e) {
     e.preventDefault();

   
       const res = await fetch("http://127.0.0.1:5000/api/doc", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ entries: sections }),
       });
 
       const data = await res.json();
       console.log("Document saved:", data);
     
     if (onAdd) onAdd(sections); 
     setSections([{ title: "", content: "" }]); 
     alert("Document created!");
   }
 
   return (
     <form onSubmit={handleSubmit}>
       <h3>Create Document</h3>
 

       <br />
       <br />
       
 
       {sections.map((s, index) => (
         <div key={index} >
           <label>Title:</label>
           <br />
           <input
             type="text"
             value={s.title}
             onChange={(e) => handleTitleChange(index, e)}
           />
           <br />
 
           <label>Content:</label>
           <br />
           <textarea
             value={s.content}
             onChange={(e) => handleContentChange(index, e)}
           />

           <button type="button" onClick={()=>deleteSection(index)}>Delete Section</button>
           <hr />
         </div>
       ))}

              <button type="button" onClick={addSection}>
     Add
       </button>
 
       
       <br />
       <button type="submit">Save Document </button>
     </form>
   );
 }
 


export default CreateDocument;