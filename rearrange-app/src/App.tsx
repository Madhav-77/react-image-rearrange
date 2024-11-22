import './App.css'
import { useState } from "react";
import data from "./data/data.json";
// import Card from './components/cards/cards';
import { Doc } from './interfaces';
import { closestCorners, DndContext } from '@dnd-kit/core';
import { Grid } from './components/grid/grid';
import { arrayMove } from '@dnd-kit/sortable';

function App() {
  const [documents, setDocuments] = useState<Doc[]>(data);

  const getDocPosition = (id: number) => documents.findIndex(doc => doc.id === id);

  const handleDragEnd = event => {
    const {active, over} = event;
    if(active.id == over.id) return;
    setDocuments(docs => {
      const originalPosition = getDocPosition(active.id)
      const newPosition = getDocPosition(over.id)

      return arrayMove(docs, originalPosition, newPosition);
    }) 
  }

  return (
    <>
      <div>
        <div className="">
          <h1 className='text-center'>Zania's rearrange app</h1>
          <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
            <Grid data={documents}></Grid>
          </DndContext>
        </div>
      </div>
    </>
  )
}

export default App
