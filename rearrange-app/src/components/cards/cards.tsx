import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { Doc } from "../../interfaces";
import { Modal } from "react-bootstrap";

const Spinner = () => (
    <div style={{ margin: "auto", alignContent: "center", height: "100%", textAlign: "center" }}>
        Loading...
    </div>
);

const Card: React.FC<Doc> = ({ id, title }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalImageLoading, setIsModalImageLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const styles = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleModalImageLoad = () => {
    setIsModalImageLoading(false);
  };

  return (
    <div className="" ref={setNodeRef} {...attributes} {...listeners} style={styles}>
      <div style={{ height: "300px" }}>
        {isLoading && <Spinner />}
        <img src={`https://picsum.photos/id/${id + 10}/300/300`} alt={title} onLoad={handleImageLoad} onMouseDown={handleShowModal} style={{ cursor: "pointer" }}
        />
      </div>
      <div>{title}</div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Body className="p-0">
            {isModalImageLoading && <Spinner />}
            <img src={`https://picsum.photos/id/${id + 10}/600/600`} alt={title} className="img-fluid" onLoad={handleModalImageLoad}/>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Card;
