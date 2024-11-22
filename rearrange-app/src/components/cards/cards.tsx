import { useSortable } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities"
import { Doc } from "../../interfaces";
import { useState } from "react";

const Spinner = () => (
    <div style={{ margin: 'auto', alignContent: 'center', height: '100%' }}>
        Loading...
    </div>
);

const Card: React.FC<Doc> = ({ id, title }) => {

    const [isLoading, setIsLoading] = useState(true);

    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({ id });
    const styles = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    const handleImageLoad = () => {
        setIsLoading(false); // Hide the spinner once the image is loaded
    };

    return (
        <div className="" ref={setNodeRef} {...attributes} {...listeners} style={styles}>
            <div style={{height: '300px'}}>
                {isLoading && <Spinner />}
                <img src={`https://picsum.photos/id/${id+10}/300/300`} alt={title} onLoad={handleImageLoad}/>
            </div>
            <div>
                {title}
            </div>
        </div>
    );
};

export default Card;