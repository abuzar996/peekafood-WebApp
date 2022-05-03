import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
import QRCode from "react-qr-code";

class StaticMenuModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: ""
        };
    }
    componentDidMount() {
        let u = window.location.href.split('/app');
        setTimeout(() => {
            this.setState({ url: `${u[0]}/static-menu/${this.props.restaurant.id}/${this.props.restaurant.name}` });
        }, 2200);


    }
    render() {
        return (
            <Modal
                isOpen={this.props.modalOpen}
                toggle={this.props.toggleModal}
                wrapClassName="modal-top"
            >
                <ModalHeader toggle={this.props.toggleModal}>
                    Static Menu Link
        </ModalHeader>
                <ModalBody>
                    <div className="d-flex justify-content-center align-items center">
                        <QRCode size={150} value={this.state.url} />
                    </div>
                    <div className="d-flex justify-content-center align-items center mt-2">
                        <Input type="url" required value={this.state.url} readOnly />
                    </div>


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

export default StaticMenuModal;
