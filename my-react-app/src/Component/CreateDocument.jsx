import { useState } from "react";
import "../styles/DocumentForm.css";

function CreateDocument({ onAdd }) {
  const [sections, setSections] = useState([{ title: "", content: "" }]);

  function deleteSection(index) {
    const updated = sections.filter((_, i) => i !== index);
    setSections(updated);
  }

  function addSection() {
    setSections((prev) => [...prev, { title: "", content: "" }]);
  }

  function handleTitleChange(index, e) {
    const updated = [...sections];
    updated[index].title = e.target.value;
    setSections(updated);
  }

  function handleContentChange(index, e) {
    const updated = [...sections];
    updated[index].content = e.target.value;
    setSections(updated);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:5000/api/doc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entries: sections }),
      });

      const data = await res.json();
      console.log("Document saved:", data);

      if (onAdd) onAdd(sections);
      setSections([{ title: "", content: "" }]);
      alert("Document created ");
    } catch (err) {
      console.error(err);
      alert("error while creating.");
    }
  }

  return (
    <div className="document-form-container">
      <form onSubmit={handleSubmit} className="document-form">
        <h3>Create Document</h3>

        {sections.map((s, index) => (
          <div key={index} className="document-section">
            <label>Title</label>
            <input
              type="text"
              value={s.title}
              onChange={(e) => handleTitleChange(index, e)}
              placeholder="Enter section title"
            />

            <label>Content</label>
            <textarea
              value={s.content}
              onChange={(e) => handleContentChange(index, e)}
              placeholder="Enter section content"
              rows={4}
            />

            <div className="section-actions">
              <button
                type="button"
                className="delete-btn"
                onClick={() => deleteSection(index)}
              >
                 Delete Section
              </button>
            </div>
            <hr />
          </div>
        ))}

        <div className="form-actions">
          <button type="button" className="add-btn" onClick={addSection}>
           Add Section
          </button>
          <button type="submit" className="save-btn">
           Save Document
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateDocument;
