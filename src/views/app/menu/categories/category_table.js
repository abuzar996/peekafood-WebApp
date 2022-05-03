import React, { Component } from "react";
import { Card, CardBody } from "reactstrap";
import ReactTable from "react-table";
//import data from "../../../data/products";
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";
import EditModal from "./editmodal";
const dataTableColumns = [
  {
    Header: "Category Name",
    accessor: "name",
    Cell: props => <p className="list-item-heading">{props.value}</p>
  },
  {
    Header: "Description",
    accessor: "description",
    Cell: props => <p className="text-muted">{props.value}</p>
  }
];
var dataRow;

class ReactTableWithScrollableCard extends Component {

  CustomTbodyComponent = props => (
    <div {...props} className={classnames("rt-tbody", props.className || [])}>
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        {props.children}
      </PerfectScrollbar>
    </div>
  );
  toggleModal = () => {
    this.props.toggleModal();
  };
  rowData = row => {
    dataRow = Object.assign({}, row);
    dataRow = row;
  };

  onRowClick = (state, rowInfo) => {
    return {
      onClick: e => {
        this.rowData(rowInfo.original);
        this.toggleModal();
      }
    };
  };
  render() {
    return (
      <div>
        <br />
        <br />
        <EditModal
          modalOpen={this.props.modalOpen}
          toggleModal={this.props.toggleModal}
          data={dataRow}
          editCategory={this.props.editCategory}
          deleteCategory={this.props.deleteCategory}
        />
        <Card className="mt-2">
          <CardBody>
            <ReactTable
              data={this.props.data}
              TbodyComponent={this.CustomTbodyComponent}
              columns={dataTableColumns}
              getTrProps={this.onRowClick}
              pageSize={this.props.data.length}
              showPageJump={false}
              showPageSizeOptions={false}
              showPagination={false}
              className={"react-table-fixed-height"}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default ReactTableWithScrollableCard;
