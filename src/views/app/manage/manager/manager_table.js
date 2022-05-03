import React, { Component } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import ReactTable from "react-table";
import { Button } from "reactstrap";
//import DataTablePagination from "../../../components/DatatablePagination";
//import data from "../../../data/products";
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";
import AddNewModal from "./manageraddmodal";
import EditModal from "./managereditmodal";
var Rowdata = {};
const dataTableColumns = [
  {
    Header: "(Account ID).(Username)",
    accessor: "username",
    Cell: props => <p className="list-item-heading">{props.value}</p>
  },
  {
    Header: "Name",
    accessor: "first_name",
    Cell: props => <p className="text-muted">{props.value}</p>
  },
  {
    Header: "Phone Number",
    accessor: "phone_number",
    Cell: props => <p className="text-muted">{props.value}</p>
  },
  {
    Header: "Email",
    accessor: "contact_email",
    Cell: props => <p className="text-muted">{props.value}</p>
  },
  {
    Header: "Branch Name",
    accessor: "branch_name",
    Cell: props => <p className="text-muted">{props.value}</p>
  }
];

class BranchTable extends Component {
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
        <AddNewModal
          modalOpen={this.state.modalOpen}
          toggleModal={this.toggleModal}
          addManager={this.props.addManager}
          restaurant={this.props.restaurant}
        />
        <EditModal
          editModalOpen={this.state.editModalOpen}
          toggleModal={this.toggleEditModal}
          data={Rowdata}
          editManager={this.props.editManager}
          deleteManager={this.props.deleteManager}
          branches={this.props.branches}
          restaurant={this.props.restaurant}
        />

        <CardBody>
          <CardTitle>
            Branch Managers
            <div className="text-zero top-right-button-container">
              <Button
                color="primary"
                size="lg"
                className="top-right-button"
                onClick={this.toggleModal}
              >
                Add Manager
              </Button>{" "}
            </div>
          </CardTitle>
          <ReactTable
            data={this.props.data}
            TbodyComponent={this.CustomTbodyComponent}
            columns={dataTableColumns}
            getTrProps={this.onRowClick}
            defaultPageSize={5}
            showPageJump={false}
            showPageSizeOptions={false}
            showPagination={true}
          //className={"react-table-fixed-height"}
          />
        </CardBody>
      </Card>
    );
  }
}
export default BranchTable;
