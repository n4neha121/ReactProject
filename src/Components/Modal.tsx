import { FC } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../Css/All.css';
import 'bootstrap/dist/css/bootstrap.min.css';


interface modalProps {
    modalOpen: boolean;
    title: string;
    handleClose: () => void;
}
const ModalComponent: FC<modalProps> = ({
    modalOpen, title, handleClose
}) => {
    return (
        <>
            <Modal
                show={modalOpen}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className='modalStyle'
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    I will not close if you click outside me. Do not even try to press
                    escape key.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/* <Button variant="primary">Understood</Button> */}
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalComponent;