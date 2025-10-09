import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/DocumentList.css";


function DocumentDetail() {
  const { id } = useParams();
  const [doc, setDoc] = useState(null);



async function onDelete(i){

    const res=await fetch(`http://localhost:5000/api/doc/${id}/${i}`,{
        method:"DELETE"
    });
    if(!res) return jsonify({"message":"invalidres"})

        const data =await res.json();

        setDoc((prev)=>({...prev, entries:data.entries}));

    

}

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
  <div>
    <h2>Document #{doc.id}</h2>
    <hr />
   


    <div>
        <button type="button" onClick={handleDownload}>Download PDF</button>
    </div>

    {doc.entries.map((entry, i) => (
      <div key={i} className="document-entry">
        <strong>{entry.title}</strong>
        <div>{entry.content}</div>

        <button
          className="delete-btn"
          type="button"
          onClick={() =>  onDelete(i)}
        >
          Delete
        </button>
      </div>
    ))}
  </div>
);

}

export default DocumentDetail;
