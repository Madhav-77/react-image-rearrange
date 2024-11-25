import './App.css';
import { useEffect, useRef, useState } from "react";
import { closestCorners, DndContext } from '@dnd-kit/core';
import { Grid } from './components/grid/grid';
import { rectSwappingStrategy, SortableContext } from '@dnd-kit/sortable';
import { getImages, updateImagePosition } from './services/imageService';
import { ImageDatatype } from './interfaces';
import { Spinner } from 'react-bootstrap';
import { DragEndEvent } from '@dnd-kit/core';

function App() {
  const [imageData, setImageData] = useState<ImageDatatype[]>([]); //stores image data, gets updated on dragging
  const [isAPILoading, setIsAPILoading] = useState<boolean>(false); 
  const [lastSaveTime, setLastSaveTime] = useState<number | null>(null);
  const initialImageData = useRef<ImageDatatype[]>([]); //stores initial image data, does not update on dragging
  const [error, setError] = useState<string | null>(null);

  // for calling save API every 5 seconds, only if data is modified
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (JSON.stringify(initialImageData.current) != JSON.stringify(imageData)) {
        saveImageData(imageData);
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [imageData]);

  // for fetching initial data, gets called only once
  useEffect(() => {
    fetchData();
  }, []);

  // getImageData api call
  const fetchData = () => {
    setIsAPILoading(true);
    getImages()
      .then((data) => {
        setImageData(data);
        initialImageData.current = JSON.parse(JSON.stringify(data));
      })
      .catch((error) => {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred while getting the images.');
        }
      })
      .finally(() => setIsAPILoading(false));
  };

  // updateImageData api call
  const saveImageData = (updatedImageDataRows: ImageDatatype[]) => {
    setIsAPILoading(true);
    updateImagePosition(updatedImageDataRows)
      .then((data) => {
        initialImageData.current = JSON.parse(JSON.stringify(data));
        setLastSaveTime(Date.now()); // Update last save time
      })
      .catch((error) => {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred while saving the images.');
        }
      })
      .finally(() => setIsAPILoading(false));
  };

  // to handle drag end event, update new dragged positions to imageData 
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setImageData((prevDocs) => {
      const activeDoc = prevDocs.find((doc) => doc.id === active.id);
      const overDoc = prevDocs.find((doc) => doc.id === over.id);

      if (activeDoc && overDoc) {
        const temp = activeDoc.position;
        activeDoc.position = overDoc.position;
        overDoc.position = temp;

        return [...prevDocs].sort((a, b) => a.position - b.position);
      }

      return prevDocs;
    });
  };

  // if lastSaveTime is available, this calculates the time lapsed since lastSaveTime
  const getElapsedTime = () => {
    if (lastSaveTime) {
      const seconds = Math.floor((Date.now() - lastSaveTime) / 1000);
      return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    }
    return 'Never';
  };

  return (
    <>
      <div>
        <div className="">
          <div className='text-center'>
            <h1>Zania's rearrange app</h1>
            <span>Last saved: {getElapsedTime()}</span>
          </div>
          {isAPILoading ? (
            <div className='text-center'>
              <Spinner/>
            </div>
          ) : (
            imageData.length === 0 || error != null ? (
              <>
                <p className="text-center">No data available.</p>
                <p className="text-center text-danger">{error}</p>
              </>
            ) : (
              <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                <SortableContext items={imageData} strategy={rectSwappingStrategy}>
                  <Grid data={imageData}></Grid>
                </SortableContext>
              </DndContext>
            )
          )}
        </div>
      </div>
    </>
  )
}

export default App