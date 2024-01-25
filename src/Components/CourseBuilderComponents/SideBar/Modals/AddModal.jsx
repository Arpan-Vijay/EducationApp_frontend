// import { Button, Modal } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const AddModal = ({addShow , handleAddClose , info}) => {

    return (<>
        <Modal centered show={addShow} onHide={handleAddClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add {info.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Modal content goes here.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleAddClose}>Close</Button>
                <Button variant="primary" onClick={handleAddClose}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    </>);
}

export default AddModal;