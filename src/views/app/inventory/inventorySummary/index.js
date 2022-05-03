import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle, ButtonDropdown, DropdownToggle, DropdownItem, DropdownMenu } from "reactstrap";
import { Colxx } from "../../../../components/common/CustomBootstrap";
import { connect } from "react-redux";
import {
    getRestaurant,
    getBranch,
    getInventory,
    editInventory,
    getServices
} from "../../../../redux/actions";
import _ from "lodash";
import NoAccess from "../../../../components/Extra/noAccessDialog";
import SummaryTable from './summarytable';
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
        };
    }
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
        if (_.isEmpty(this.state.branchSelect))
            setTimeout(
                () => this.onBranchSelect(this.props.menuDishes.branches[0]),
                2200
            );

    }
    onBranchSelect = item => {
        this.setState(
            {
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
            <Fragment>
                {this.props.inventory.loading === true ? (
                    <div className="loading"></div>
                ) : null}
                {this.state.services["inventory_management"]===true?
                <Row>
                    <Colxx xxs="12" className="mb-4">
                        <Card>
                            <CardBody>
                                <div className="float-right float-none-xs">
                                    <ButtonDropdown
                                        className="mr-1 mb-4"
                                        isOpen={this.state.isOpenBranch}
                                        toggle={this.toggleBranch}
                                        
                                    >
                                        <DropdownToggle caret outline color="primary">
                                            {!_.isEmpty(this.state.branchSelect)
                                                ? this.state.branchSelect.branch_name
                                                : "Select Branch"}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {this.props.menuDishes.branches.map(data => (
                                                <DropdownItem
                                                    key={data.id}
                                                    onClick={() => this.onBranchSelect(data)}
                                                >
                                                    {data.branch_name}
                                                </DropdownItem>
                                            ))}
                                        </DropdownMenu>
                                    </ButtonDropdown>
                                </div>
                                <CardTitle>
                                    <h1>Inventory Summary</h1>
                                </CardTitle>
                                {this.props.menuDishes.loading === true ? (
                                    <div className="loading"></div>
                                ) : null}
                                   {this.state.noAccess===true?<NoAccess ModuleName={"Inventory Management Module"}
                                    modalOpen = { this.state.noAccess}
                                   toggleModal = { this.NoAccess }
                                 />:
                                <div className="pointing">
                                    <SummaryTable data={this.props.inventory.inventoryItems} branch={this.state.branchSelect} editInventory={this.props.editInventory} />
                                </div>}
                            </CardBody>
                        </Card>
                    </Colxx>
                </Row>: <div><NoAccess ModuleName={"Inventory management"}
                modalOpen = {this.state.noAccess}
                toggleModal = { this.NoAccess }/></div>}
            </Fragment>
        );
    }
}
const mapStateToProps = ({ menuDishes, inventory ,services}) => {
    return { menuDishes, inventory ,services};
};
export default connect(mapStateToProps, {
    getRestaurant,
    editInventory,
    getBranch,
    getInventory,
    getServices,
})(Menu);
