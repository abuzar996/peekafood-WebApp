import React, { Component, Fragment } from "react";
import {
    Row,
    Card,
    CardBody,
    CardTitle,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    ButtonDropdown
} from "reactstrap";
import { Colxx } from "../../../../components/common/CustomBootstrap";
import {
    getRestaurant,
    getBranch,
    getOrders,
} from "../../../../redux/actions";
import { connect } from "react-redux";
import _ from "lodash";
import Order from "./order"
import {
    RangeDatePicker,
  } from "react-google-flight-datepicker";
  import "react-google-flight-datepicker/dist/main.css";
class transactionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            branchSelect: {},
            flag: false,
            isOpenBranch: false,
            startDate: new Date(Date.now()),
            endDate: new Date(Date.now()),
            isOpenTime: false,
            orders: [],
            
        };
    }
    toggleBranch = () => {
        this.setState(prevState => ({
            isOpenBranch: !prevState.isOpenBranch
        }));
    };
    toggleSection = () => {
        this.setState(prevState => ({
            isOpenSection: !prevState.isOpenSection
        }));
    };
    toggleTime = () => {
        this.setState(prevState => ({
            isOpenTime: !prevState.isOpenTime
        }));
    }
    onDateChange = (start,end) => {
        this.setState({
            startDate: start,
            endDate: end
        }, () => {
            this.setState({ flag: true })
        })
    }

    UNSAFE_componentWillMount() {
        if (_.isEmpty(this.props.menuDishes.branches))
            this.props.getBranch(this.props.menuDishes.restaurant[0])
        setTimeout(
            () => {
                this.onBranchSelect(this.props.menuDishes.branches[0]);

            },
            4000
        );

    }
    onBranchSelect = (branches) => {
        this.setState({
            branchSelect: branches
        }, () => {
            this.setState({ flag: true })
        })
    }
    toPerfectDateString=(d)=>{
        let date = new Date(d);
let year = date.getFullYear();
let month = date.getMonth()+1;
let dt = date.getDate();

if (dt < 10) {
  dt = '0' + dt;
}
if (month < 10) {
  month = '0' + month;
}

return year+'-' + month + '-'+dt
    }
   
    componentDidUpdate(prevProps) {
        if (
            (this.props.orders.historyOrders &&
                prevProps.orders.historyOrders !== this.props.orders.historyOrders)
        ) {
            this.setState({ orders: this.props.orders.historyOrders }, () => console.log(this.state.orders));
        }
        if (this.state.flag === true && !_.isEmpty(this.state.branchSelect)) {
            var date= this.toPerfectDateString(this.state.startDate.toISOString())
          var date2= this.toPerfectDateString(this.state.endDate.toISOString())
            this.props.getOrders({
                branch_id: this.state.branchSelect.id,
                order_type: "CUSTOMERAPP-DINE-IN,BUSINESSAPP-DINE-IN,DELIVERY,TAKEAWAY",
                status: "SERVED,DELIVERED,PICKED_UP,END",
                start_date: date,
                end_date: date2,
                order_for: "HISTORY",
            });
            this.setState({
                flag: false
            })
        }
    }

    render() {
        return (
            <Fragment>
                {this.props.orders.loading === true ? (
                    <div className="loading" />
                ) : null}
                <Row>
                    <Colxx xxs="12" className="mb-4">
                        <Card>
                            <CardBody>

                                <div className="btn-group float-right float-none-xs">
                                <RangeDatePicker
    	    	startDate={this.state.startDate}
	        	endDate={this.state.endDate}
        		onChange={(startDate, endDate) => this.onDateChange(startDate, endDate)}
        		minDate={new Date(1900, 0, 1)}
  				maxDate={new Date(2100, 0, 1)}
      />
                                    <ButtonDropdown
                                        className="mr-1 mb-1"
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
                                    <h1>Past Transactions</h1>
                                </CardTitle>
                                <hr className="style-one" />
                                <div className="container-fluid">
                                    <Row>
                                        {this.state.orders.map((order, i) => <Colxx key={i} lg="12" xl="6" className="mb-4"><Order orders={order}></Order>  </Colxx>)}




                                    </Row>
                                </div>

                            </CardBody>
                        </Card>
                    </Colxx>
                </Row>
            </Fragment>
        );
    }
}
const mapStateToProps = ({ menuDishes, orders }) => {
    return { menuDishes, orders };
};
export default connect(mapStateToProps, {
    getRestaurant,
    getBranch,
    getOrders,
})(transactionPage);
