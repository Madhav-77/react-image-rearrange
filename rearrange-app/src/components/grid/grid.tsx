import { Doc } from "../../interfaces";
import Card from "../cards/cards";
import "./grid.css";

export const Grid: React.FC<{ data: Doc[] }> = ({ data }) => {

    return (    
        <div className="row text-center justify-content-center">
            {data.map((item: Doc) => (
                <div className="col-4" key={item.id}>
                    <Card id={item.id} title={item.title} type={item.type} position={item.position}></Card>
                </div>
            ))}
        </div>
    )
}