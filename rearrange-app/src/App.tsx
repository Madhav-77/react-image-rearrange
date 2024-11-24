import './App.css'
import { useEffect, useState } from "react";
import data from "./data/data.json";
// import Card from './components/cards/cards';
import { Doc } from './interfaces';
import { closestCorners, DndContext } from '@dnd-kit/core';
import { Grid } from './components/grid/grid';
import { rectSwappingStrategy, SortableContext } from '@dnd-kit/sortable';

function App() {
  const [documents, setDocuments] = useState<Doc[]>(data);

  // const getDocPosition = (id: number) => documents.findIndex(doc => doc.id === id);

  useEffect(() => {
    // Sort data by position in ascending order
    const sortedData = [...data].sort((a, b) => a.position - b.position);
    setDocuments(sortedData);
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setDocuments((prevDocs) => {
      console.log(prevDocs)
      // Find the two documents being swapped
      const activeDoc = prevDocs.find((doc) => doc.id === active.id);
      const overDoc = prevDocs.find((doc) => doc.id === over.id);

      if (activeDoc && overDoc) {
        // Swap their position values
        const temp = activeDoc.position;
        activeDoc.position = overDoc.position;
        overDoc.position = temp;

        // Return a new sorted array
        return [...prevDocs].sort((a, b) => a.position - b.position);
      }

      return prevDocs;
    });
  };

  return (
    <>
      <div>
        <div className="">
          <h1 className='text-center'>Zania's rearrange app</h1>
          <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
            <SortableContext items={data} strategy={rectSwappingStrategy}>
              <Grid data={documents}></Grid>
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </>
  )
}

export default App
