import { FC } from 'react';
import Modal from 'react-bootstrap/Modal';
import '../Css/All.css';
import 'bootstrap/dist/css/bootstrap.min.css';


interface modalProps {
    modalOpen: boolean;
    title: string;
    handleClose: () => void;
    handleLogout: () => void;
}
const ModalComponent: FC<modalProps> = ({
    modalOpen, title, handleClose, handleLogout
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
                    <div className='buttonContainer' onClick={handleLogout}>
                        <div style={{ height: '15px' }} />
                        <p className='modalTxt'>Logout</p>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default ModalComponent;