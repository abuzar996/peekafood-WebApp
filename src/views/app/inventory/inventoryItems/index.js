import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, Button, CardTitle, ButtonDropdown, DropdownToggle, DropdownItem, DropdownMenu } from "reactstrap";
import { Colxx } from "../../../../components/common/CustomBootstrap";
import { connect } from "react-redux";
import NoAccess from "../../../../components/Extra/noAccessDialog";

import {
    getServices,
    getRestaurant,
    getBranch,
    getInventory,
    addInventory,
    editInventory,
    deleteInventory
} from "../../../../redux/actions";
import InventoryTable from "./inventory_table";
import AddInventory from "./addinventory"

import _ from "lodash";
class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenBranch: false,
            branchSelect: {},
            access:false,
            accessmodalOpen:false,
            noAccess:false,
            services:{},
            openAddModal: false,
            editModalOpen: false
        };
    }
    toggleAddModal = () => {
        this.setState(prevState => ({
            openAddModal: !prevState.openAddModal
        }));
    };
    toggleEditModal = () => {
        this.setState(prevState => ({
            editModalOpen: !prevState.editModalOpen
        }));
    };
    toggleBranch = () => {
        this.setState(prevState => ({
            isOpenBranch: !prevState.isOpenBranch
        }));
    };
    UNSAFE_componentWillMount() {
        if (_.isEmpty(this.props.menuDishes.branches))
            this.props.getBranch(this.props.menuDishes.restaurant[0])
    }
    componentDidUpdate(props)
    {
        if(this.props.services.service && props.services.service!==this.state.services)
        {
          this.setState({services:this.props.services.service})
          if(this.props.services.service["inventory_management"]===false)
          {
            
            this.NoAccess();
          }
        }
    }
    NoAccess=()=>{
      this.setState({noAccess:!this.state.noAccess});
    }
    componentDidMount() {

        //if (_.isEmpty(this.props.restaurant[0])) this.props.getRestaurant();
        if (_.isEmpty(this.state.branchSelect))
            setTimeout(
                () => this.onBranchSelect(this.props.menuDishes.branches[0]),
                2200
            );
    }
    onBranchSelect = item => {
        this.setState({
                branchSelect: item,

            }, () => {
                if (!_.isEmpty(this.state.branchSelect)) {
                    this.props.getInventory({ branch_id: this.state.branchSelect.id })
                }
            }

        );
    };
    render() {
        return ( 
            <Fragment> {
                this.props.inventory.loading === true ? ( <div className = "loading" > </div> ) : null
            }
            
             <AddInventory ModuleName={'Online Ordering'} modalOpen = { this.state.openAddModal }
            toggleModal = { this.toggleAddModal }
            branch = { this.state.branchSelect }
            addInventory = { this.props.addInventory }
            />
            {this.state.services["inventory_management"]===true?
             <Row >
            <Colxx xxs = "12"
            className = "mb-4" >
            <Card >
            <CardBody >
            <div className = "float-right float-none-xs" >
            <ButtonDropdown className = "mr-1 mb-4"
            isOpen = { this.state.isOpenBranch }
            toggle = { this.toggleBranch } >
            <DropdownToggle caret outline color = "primary" > {!_.isEmpty(this.state.branchSelect) ?
                this.state.branchSelect.branch_name :
                    "Select Branch"
            } </DropdownToggle> <
            DropdownMenu > {
                this.props.menuDishes.branches.map(data => ( 
                <DropdownItem key = { data.id }
                    onClick = {
                        () => this.onBranchSelect(data) } >
                    { data.branch_name } </DropdownItem>
                ))
            } </DropdownMenu> </ButtonDropdown> </div> <CardTitle >
            <h1> Inventory Management </h1> </CardTitle> {
                this.props.menuDishes.loading === true ? ( <div className = "loading" > </div>
                ) : null
            } <Row >
            < Colxx xxs = "12" >

            <Button 
            color = "primary"
            size = "lg"
            className = "float-right"
            disabled = { _.isEmpty(this.state.branchSelect) === true }
            onClick={this.toggleAddModal}
            >
            Add Item </Button>
            <div className = "pointing" >
            <InventoryTable data = { this.props.inventory.inventoryItems }
            modalOpen = { this.state.editModalOpen }
            toggleModal={this.toggleEditModal}
            branch = { this.state.branchSelect }
            deleteInventory = { this.props.deleteInventory }
            editInventory = { this.props.editInventory }
            /> 
            </div> 
            </Colxx> 
            </Row> 
            </CardBody> 
            </Card> 
            </Colxx> 
            </Row> : <div><NoAccess ModuleName={"Inventory management"}
            modalOpen = {this.state.noAccess}
            toggleModal = { this.NoAccess }/></div>}
        </Fragment>
        );
    }
}
const mapStateToProps = ({ menuDishes, inventory,services }) => {
    return { menuDishes, inventory ,services};
};
export default connect(mapStateToProps, {
    getServices,
    getRestaurant,
    getBranch,
    getInventory,
    addInventory,
    editInventory,
    deleteInventory
})(Menu);