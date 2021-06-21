import React from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

const OptionModal = (props) => (

  <Modal
    isOpen={!!props.toggle}
    onRequestClose={props.handleDeleteOption}
    contentLabel="Selected Option"
    closeTimeoutMS={200}
    className="modal"
  >
  <ModalBody>
  <p>Do you want to remove:</p>
  <h1>{props.textOption}</h1>
</ModalBody>
<ModalFooter>
  <Button color="primary" onClick={props.handleDeleteOption}>
    OK
  </Button>
  <Button color="secondary" onClick={() => props.handleOpenModal(false)}>
    CANCEL
  </Button>
</ModalFooter>
</Modal>

);

export default OptionModal;
