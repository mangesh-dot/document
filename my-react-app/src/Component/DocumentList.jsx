import React from "react";

 

function DocumentList({ documents = [], onSelect }) {
  if (!documents || documents.length === 0) {
    return <div>No documents yet.</div>;
  }

    const handleDownload = async () => {
    try {
      const res = await fetch("http://localhost:5000/generate_pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entries: documents }),
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


  return (
    <div>
     
      <ul>
        {documents.map(doc => (
          <li key={doc.id}>
            {doc.entries && doc.entries.length > 0 ? (
              <div>
                {doc.entries.map((e, i) => (
                  <div key={i}>
                    <strong>{e.title}</strong>
                    <div>{e.content}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <strong>{doc.title}</strong>
                <div>{doc.content}</div>
              </div>
            )}
            <div>
              <button onClick={()=>onSelect && onSelect(doc)}>Review</button>
              
            </div>
          </li>
        ))}
      </ul>
       <div>
             <button onClick={handleDownload}>Download PDF</button>
          </div>
    </div>
  );
}
export default DocumentList;











