import { Doc } from "../../interfaces";
import Card from "../cards/cards";
import "./grid.css";
import { horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";

export const Grid: React.FC<{ data: Doc[] }> = ({ data }) => {

    return (    
        <div className="row text-center justify-content-center">
            <SortableContext items={data} strategy={horizontalListSortingStrategy}>
                {data.map((item: Doc) => (
                    <div className="col-4">
                        <Card id={item.id} title={item.title} key={item.id} type={item.type} position={item.position}></Card>
                    </div>
                ))}
            </SortableContext>
        </div>
    )
}