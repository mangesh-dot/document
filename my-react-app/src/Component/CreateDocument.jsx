
import React from 'react';
import DocumentForm from './DocumentForm';

function CreateDocument({ onCreate }) {

  return (
    <div>
      <h2>Create Document</h2>
      <DocumentForm onAdd={onCreate} />
    </div>
    
  );
  
}

export default CreateDocument;