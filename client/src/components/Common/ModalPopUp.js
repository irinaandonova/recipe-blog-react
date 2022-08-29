import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalPopUp = ({ show, warningMessage, onClose, onNavigate }) => {
  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Opps...</Modal.Title>
        </Modal.Header>
        <Modal.Body>{warningMessage}</Modal.Body>
        <Modal.Footer>
          {
            onNavigate ?
              <Button variant="secondary" onClick={onNavigate}>
                Login
              </Button>
              :
              null
          }
          <Button variant="primary" onClick={onClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalPopUp;