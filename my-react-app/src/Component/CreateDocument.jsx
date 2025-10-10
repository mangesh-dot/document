import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../styles/DocumentForm.css";

function CreateDocument({ onAdd }) {
  const [sections, setSections] = useState([{ title: "", content: "" }]);
  const{id}=useParams()
  const isEdit = Boolean(id);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (isEdit) {
      fetch(`http://127.0.0.1:5000/api/doc/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setSections(data.entries || [{ title: "", content: "" }]);
        })
        .catch((err) => console.error("Error loading document:", err));
    }
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    const method = isEdit ? "PUT" : "POST";
    const url = isEdit
      ? `http://127.0.0.1:5000/api/doc/${id}`
      : "http://127.0.0.1:5000/api/doc";

    try {
      const res = await fetch(url, {
        method, // ✅ fixed
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entries: sections }),
      });

      const data = await res.json();
      console.log("Document saved:", data);

      if (onAdd) onAdd(sections);
      alert(isEdit ? "Document updated" : "Document created");

      setSections([{ title: "", content: "" }]);
      navigate("/list"); // ✅ go back after saving
    } catch (err) {
      console.error(err);
      alert(isEdit ? "Error updating document" : "Error creating document");
    }
  }

  return (
    <div className="document-form-container">
      <form onSubmit={handleSubmit} className="document-form">
        <h3>{isEdit ? "Edit Document" : "Create Document"}</h3>

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
            {isEdit ? "Update Document" : "Save Document"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateDocument;
