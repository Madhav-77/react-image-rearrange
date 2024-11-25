import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { ImageDatatype } from "../../interfaces";
import { Modal } from "react-bootstrap";

const Card: React.FC<{ data: ImageDatatype }> = ({ data }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: data.id });

  const styles = {
    transition,
    transform: CSS.Transform.toString(transform),
    width: "fit-content",
    margin: "10px auto"
  };

  return (
    <div className="card" ref={setNodeRef} {...attributes} {...listeners} style={styles}>
      <div style={{ height: "300px" }}>
        <img src={`/images/${data.type}.jpg`} alt={data.title} onDoubleClick={handleShowModal} style={{ cursor: "pointer", height: "inherit" }}
        />
      </div>
      <div style={{margin: "10px auto"}}>{data.title}</div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Body className="p-0">
            <img src={`/images/${data.type}.jpg`} alt={data.title} className="img-fluid"/>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Card;
