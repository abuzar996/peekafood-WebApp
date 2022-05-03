import React, { Component } from "react";
import { Card, CardBody } from "reactstrap";
import ReactTable from "react-table";
import { Button } from "reactstrap";
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";
import WaiterModal from "./waitermodal";
import WaiterEditModal from "./waitereditmodal";
var Rowdata = {};
const dataTableColumns = [
  {
    Header: "First Name",
    accessor: "first_name",
    Cell: props => <p className="list-item-heading">{props.value}</p>
  },
  {
    Header: "Last Name",
    accessor: "last_name",
    Cell: props => <p className="text-muted">{props.value}</p>
  },
  {
    Header: "Phone Number",
    accessor: "phone_number",
    Cell: props => <p className="text-muted">{props.value}</p>
  },
  {
    Header: "Activated",
    accessor: "activated",
    Cell: props => (
      <p className="text-muted">{props.value === true ? "Yes" : "No"}</p>
    )
  }
];
class WaiterTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      editModalOpen: false
    };
  }
  toggleModal = () => {
    this.setState(prevState => ({ modalOpen: !prevState.modalOpen }));
  };
  toggleEditModal = () => {
    this.setState(prevState => ({ editModalOpen: !prevState.editModalOpen }));
  };
  CustomTbodyComponent = props => (
    <div {...props} className={classnames("rt-tbody", props.className || [])}>
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        {props.children}
      </PerfectScrollbar>
    </div>
  );
  rowData = row => {
    Rowdata = Object.assign({}, row);
    Rowdata = row;
  };
  onRowClick = (state, rowInfo) => {
    return {
      onClick: e => {
        this.rowData(rowInfo.original);
        this.toggleEditModal();
      }
    };
  };
  render() {
    return (
      <Card className="mb-4">
        <WaiterModal
          modalOpen={this.state.modalOpen}
          toggleModal={this.toggleModal}
          addWaiter={this.props.addWaiter}
          branch={this.props.branch}
          restaurant={this.props.restaurant}
        />
        <WaiterEditModal
          modalOpen={this.state.editModalOpen}
          toggleModal={this.toggleEditModal}
          editWaiter={this.props.editWaiter}
          deleteWaiter={this.props.deleteWaiter}
          data={Rowdata}
          restaurant={this.props.restaurant}
        />

        <CardBody>
          <Button
            color="primary"
            size="lg"
            className="float-right"
            onClick={this.toggleModal}
          >
            Add Server
          </Button>
          <br />
          <br />
          <Card className="mt-2">
            <CardBody>
              <ReactTable
                data={this.props.waiters}
                TbodyComponent={this.CustomTbodyComponent}
                columns={dataTableColumns}
                getTrProps={this.onRowClick}
                defaultPageSize={5}
                showPageJump={false}
                showPageSizeOptions={false}
                showPagination={true}
                className={"react-table-fixed-height"}
              />
            </CardBody>
          </Card>
        </CardBody>
      </Card>
    );
  }
}
export default WaiterTable;
