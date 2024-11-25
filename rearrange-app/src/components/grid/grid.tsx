import { ImageDatatype } from "../../interfaces";
import Card from "../cards/cards";
import "./grid.css";

export const Grid: React.FC<{ data: ImageDatatype[] }> = ({ data }) => {

    return (    
        <div className="row text-center justify-content-center m-0">
            {data.map((item: ImageDatatype) => (
                <div className="col-4" key={item.id}>
                    <Card data={item}></Card>
                </div>
            ))}
        </div>
    )
}