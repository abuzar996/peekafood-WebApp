import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import IntlMessages from "../../../../helpers/IntlMessages";

class DishesImportModal extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.modalOpen}
        toggle={this.props.toggleModal}
        wrapClassName="modal-top"
      >
        <ModalHeader toggle={this.props.toggleModal}>
          Branch QR Code
        </ModalHeader>
        <ModalBody>
          <img
            className="modalImage"
            alt="editBranchImage"
            src={this.props.branch.branch_qr_code}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" outline onClick={this.props.toggleModal}>
            <IntlMessages id="pages.cancel" />
          </Button>
          <Button color="primary" onClick={window.print}>
            Print
          </Button>{" "}
        </ModalFooter>
      </Modal>
    );
  }
}

export default DishesImportModal;
