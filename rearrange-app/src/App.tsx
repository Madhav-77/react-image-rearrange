import './App.css'
import { useState } from "react";
import data from "./data/data.json";
import Card from './components/cards/cards';
import { Document } from './interfaces';

function App() {
  const [documents, setDocuments] = useState<Document[]>(data);

  return (
    <>
      <div>
        <div className="grid">
          {documents.map((doc: Document, index: number) => (
            <Card document={doc} />
          ))}
        </div>
      </div>
    </>
  )
}

export default App
