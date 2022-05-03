import React, { Component } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import ReactTable from "react-table";
import { Button } from "reactstrap";
//import DataTablePagination from "../../../components/DatatablePagination";
//import data from "../../../data/products";
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";
import BranchModal from "./branchaddmodal";
import BranchEditModal from "./brancheditmodal";
import _ from "lodash";
var rowData = {};
const dataTableColumns = [
  {
    Header: "Branch Name",
    accessor: "branch_name",
    Cell: props => <p className="list-item-heading">{props.value}</p>
  },
  {
    Header: "Address",
    accessor: "address",
    Cell: props => <p className="text-muted">{props.value}</p>
  },
  {
    Header: "Phone Number",
    accessor: "phone_number",
    Cell: props => <p className="text-muted">{props.value}</p>
  },
  {
    Header: "Open Time",
    accessor: "open_time",
    Cell: props => <p className="text-muted">{props.value}</p>
  },
  {
    Header: "Close Time",
    accessor: "close_time",
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
    rowData = Object.assign({}, row);
    rowData = row;
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
        <BranchModal
          modalOpen={this.state.modalOpen}
          toggleModal={this.toggleModal}
          restaurant={this.props.restaurant}
          addBranch={this.props.addBranch}
        />
        <BranchEditModal
          modalOpen={this.state.editModalOpen}
          toggleModal={this.toggleEditModal}
          editBranch={this.props.editBranch}
          deleteBranch={this.props.deleteBranch}
          restaurant={this.props.restaurant}
          data={rowData}
        />
        <CardBody>
          <CardTitle>
            Restaurant's Branches
            <div className="text-zero top-right-button-container">
              {localStorage.getItem("role") === "RESTAURANT_OWNER" ? (
                <Button
                  color="primary"
                  size="lg"
                  className="top-right-button"
                  disabled={_.isEmpty(this.props.restaurant) ? true : false}
                  onClick={this.toggleModal}
                >
                  Add Branch
                </Button>
              ) : null}
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
