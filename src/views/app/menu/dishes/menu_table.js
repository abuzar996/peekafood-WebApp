import React, { Component } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import ReactTable from "react-table";
import IntlMessages from "../../../../helpers/IntlMessages";
import DataTablePagination from "../../../../components/DatatablePagination";
//import data from "../../../data/products";
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";
import EditModal from "./editmodal";
import matchSorter from 'match-sorter'
const dataTableColumns = [
  {
    Header: "Name",
    accessor: "dish_name",
    Cell: props => <p className="list-item-heading ">{props.value}</p>,
    filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["dish_name"] }),
    filterAll: true
  },
  {
    Header: "Code",
    accessor: "unique_dish_code",
    Cell: props => <p className="text-muted">{props.value}</p>,
    filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["unique_dish_code"] }),
    filterAll: true
  },
  {
    Header: "Category",
    accessor: "category_id",
    Cell: props => <p className="text-muted">{props.value}</p>,
    filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["category_id"] }),
    filterAll: true
  },
  {
    Header: "Price (PKR)",
    accessor: "price",
    Cell: props => <p className="text-muted">{props.value}</p>,
    filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["price"] }),
    filterAll: true
  },

];
var dataRow;

export const ReactTableAdvancedCard = props => {
  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle>
          <IntlMessages id="table.react-advanced" />
        </CardTitle>
        <ReactTable
          data={this.props.data}
          columns={dataTableColumns}
          defaultPageSize={20}
          filterable={true}
          showPageJump={true}
          PaginationComponent={DataTablePagination}
          showPageSizeOptions={true}
        />
      </CardBody>
    </Card>
  );
};

class ReactTableWithScrollableCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      createDate: "",
      description: "",
      id: 0,
      img: "",
      sales: 0,
      status: "",
      statusColor: "",
      stock: 0,
      title: ""
    };
  }
  CustomTbodyComponent = props => (
    <div {...props} className={classnames("rt-tbody", props.className || [])}>
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        {props.children}
      </PerfectScrollbar>
    </div>
  );
  toggleModal = () => {
    this.props.toggleModal(!this.props.modalOpen);
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
        <Card className="mt-2">
          <EditModal
            modalOpen={this.props.modalOpen}
            toggleModal={this.props.toggleModal}
            data={dataRow}
            branches={this.props.branches}
            categories={this.props.categories}
            branch={this.props.branch}
            editDish={this.props.editDish}
            deleteDish={this.props.deleteDish}
            restaurant={this.props.restaurant}
            allInventory={this.props.allInventory}
          />
          <CardBody>
            <ReactTable
              data={this.props.data}
              TbodyComponent={this.CustomTbodyComponent}
              columns={dataTableColumns}
              getTrProps={this.onRowClick}
              pageSize={this.props.data.length}
              filterable
              defaultFilterMethod={(filter, row) =>
                String(row[filter.id]) === filter.value}
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
