import React, { Component } from "react";
import { Card, CardBody} from "reactstrap";
import ReactTable from "react-table";
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";
import matchSorter from 'match-sorter'
import EditModal from "./editinventory"
const dataTableColumns = [{
        Header: "Item Name",
        accessor: "item_name",
        Cell: props => <p className = "list-item-heading" > { props.value } </p>,
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["item_name"] }),
        filterAll: true
    },
    {
        Header: "Unit",
        accessor: "unit",
        Cell: props => <p className = "text-muted" > { props.value } </p>,
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["unit"] }),
        filterAll: true
    },
    {
        Header: "Value",
        accessor: "quantity",
        Cell: props => <p className = "text-muted" > { props.value } </p>,
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["quantity"] }),
        filterAll: true
    },

];
var dataRow;

class ReactTableWithScrollableCard extends Component {

    CustomTbodyComponent = props => ( <div {...props }
        className = { classnames("rt-tbody", props.className || []) } >
        <PerfectScrollbar options = {{suppressScrollX: true }}>{ props.children } 
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
        return ( <div>
            <br/>
            <br/>
            <EditModal data = { dataRow }
            modalOpen = { this.props.modalOpen }
            toggleModal = { this.props.toggleModal }
            branch = { this.props.branch }
            editInventory = { this.props.editInventory }
            deleteInventory = { this.props.deleteInventory }
            /> 
            <Card className = "mt-2" >
            <CardBody>

            <ReactTable data = { this.props.data }
            TbodyComponent = { this.CustomTbodyComponent }
            columns = { dataTableColumns }
            getTrProps = { this.onRowClick }
            pageSize = { this.props.data.length }
            filterable defaultFilterMethod = {
                (filter, row) =>
                String(row[filter.id]) === filter.value
            }
            showPageJump = { false }
            showPageSizeOptions = { false }
            showPagination = { false }
            className = { "react-table-fixed-height" }/> 
            </CardBody> 
            </Card> </div>
        );
    }
}
export default ReactTableWithScrollableCard;