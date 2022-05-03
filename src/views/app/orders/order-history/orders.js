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
import NoAccess from "../../../../components/Extra/noAccessDialog";

import {
    getRestaurant,
    getBranch,
    getServices,
    getOrders,
} from "../../../../redux/actions";
import { connect } from "react-redux";
import _ from "lodash";
import Order from "./order"

class ordersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            branchSelect: {},
            flag: false,
            isOpenBranch: false,
            isOpenSection: false,
            access:false,
            accessmodalOpen:false,
            noAccess:false,
            services:{},
            isOpenTime: false,
            orders: [],
            sections: [{ "label": "Dine-In", "value": "CUSTOMERAPP-DINE-IN,BUSINESSAPP-DINE-IN" }, { "label": "Delivery", "value": "DELIVERY" }, { "label": "Takeaway", "value": "TAKEAWAY" }],
            selectedSection: {},
            times: [{ "label": "Today", "value": 0 }, { "label": "Yesterday", "value": 1 }, { "label": "Last 3 Days", "value": 3 }, { "label": "Last Week", "value": 7 }, { "label": "Last Month", "value": 30 },{ "label": "All Past Orders", "value": 100 }],
            selectedTime: {},
            
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
    
      NoAccess=()=>{
        this.setState({noAccess:!this.state.noAccess});
      }

    UNSAFE_componentWillMount() {
        if (_.isEmpty(this.props.menuDishes.branches))
            this.props.getBranch(this.props.menuDishes.restaurant[0])
        setTimeout(
            () => {
                this.onBranchSelect(this.props.menuDishes.branches[0]);
                this.onSectionSelect(this.state.sections[0]);
                this.onTimeSelect(this.state.times[0])
                console.log(this.state.times);

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
    onSectionSelect = (data) => {
        this.setState({
            selectedSection: data
        }, () => {
            this.setState({ flag: true })
        })
    }
    onTimeSelect = (time) => {
        this.setState({
            selectedTime: time
        }, () => {
            this.setState({ flag: true })
        })
    }
    toPerfectDateString=(d,value)=>{
        let months=[1,3,5,7,8,10,12];
        let date = new Date(d);
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let dt = date.getDate();
        if(value===1)
        {
            if (dt===1)
            {
                
                let found=-1;
                for(let i=0;i<months.length;i++)
                {
                    if(month===months[i])
                    {
                        found=1;
                        break;
                    }
                }
                if(found===-1)
                {
                    dt=30;
                }
                else
                {
                    let found2=-1;
                    let monthnumber;
                    for(let i=0;i<months.length;i++)
                    {
                        if(month===months[i])
                        {
                            found2=1;
                            monthnumber=i+1;
                            break;
                        }
                    }
                    if(found2===1)
                    {
                        if(monthnumber===8)
                        {
                            dt=31;
                            month=month-1;
                            if(month===0)
                            {
                                month=12
                                year=year-1;
                            }
                        }
                        else
                        {
                            dt=30;
                            month=month-1;
                            if(month===0)
                            {
                                month=12
                                year=year-1;
                            }
                        }
                    }
                }
        
                
            }
            else
            {
                dt=dt-1;
            }
        }
        if(value===3)
        {
            if (dt===1)
            {
                
                let found=-1;
                for(let i=0;i<months.length;i++)
                {
                    if(month===months[i])
                    {
                        found=1;
                        break;
                    }
                }
                if(found===-1)
                {
                    dt=29;
                }
                else
                {
                    let found2=-1;
                    let monthnumber;
                    for(let i=0;i<months.length;i++)
                    {
                        if(month===months[i])
                        {
                            found2=1;
                            monthnumber=i+1;
                            break;
                        }
                    }
                    if(found2===1)
                    {
                        if(monthnumber===8)
                        {
                            dt=29;
                            month=month-1;
                            if(month===0)
                            {
                                month=12
                                year=year-1;
                            }
                        }
                        else
                        {
                            dt=28;
                            month=month-1;
                            if(month===0)
                            {
                                month=12
                                year=year-1;
                            }
                        }
                    }
                }
        
                
            }
            if (dt===3)
            {
                
                let found=-1;
                for(let i=0;i<months.length;i++)
                {
                    if(month===months[i])
                    {
                        found=1;
                        break;
                    }
                }
                if(found===-1)
                {
                    dt=28;
                }
                else
                {
                    let found2=-1;
                    let monthnumber;
                    for(let i=0;i<months.length;i++)
                    {
                        if(month===months[i])
                        {
                            found2=1;
                            monthnumber=i+1;
                            break;
                        }
                    }
                    if(found2===1)
                    {
                        if(monthnumber===8)
                        {
                            dt=30;
                            month=month-1;
                            if(month===0)
                            {
                                month=12
                                year=year-1;
                            }
                        }
                        else
                        {
                            dt=29;
                            month=month-1;
                            if(month===0)
                            {
                                month=12
                                year=year-1;
                            }
                        }
                    }
                }
        
                
            }
            if (dt===3)
            {
                
                let found=-1;
                for(let i=0;i<months.length;i++)
                {
                    if(month===months[i])
                    {
                        found=1;
                        break;
                    }
                }
                if(found===-1)
                {
                    dt=30;
                }
                else
                {
                    let found2=-1;
                    let monthnumber;
                    for(let i=0;i<months.length;i++)
                    {
                        if(month===months[i])
                        {
                            found2=1;
                            monthnumber=i+1;
                            break;
                        }
                    }
                    if(found2===1)
                    {
                        if(monthnumber===8)
                        {
                            dt=31;
                            month=month-1;
                            if(month===0)
                            {
                                month=12
                                year=year-1;
                            }
                        }
                        else
                        {
                            dt=30;
                            month=month-1;
                            if(month===0)
                            {
                                month=12
                                year=year-1;
                            }
                        }
                    }
                }
        
                
            }
            else
            {
                dt=dt-3;
            }
        }
        if(value===7)
        {
            if(dt>=1 && dt<=7)
            {
                let found=-1;
                for(var i=0;i<months.length;i++)
                {
                    if(month===months[i])
                    {
                        found=1;
                        break
                    }
                }
                if(found===1)
                {
                    if((month-1)===7)
                    {
                        dt=(dt-7)+31;
                        month=month-1;
                        if(month===0)
                        {
                            month=12
                            year=year-1;
                        }
                    }
                    else
                    {
                        dt=(dt-7)+30; 
                        month=month-1;    
                        if(month===0)
                        {
                            month=12
                            year=year-1;
                        }
                    }
                }
                else
                {
                    let tempmonth=month-1;
                    if(tempmonth===0)
                    {
                        tempmonth=12;
                        year=year-1;
                    }
                    let mfound=-1;
                    for(i=0;i<months.length;i++)
                    {
                        if(tempmonth===months[i])
                        {
                            mfound=1;
                            break
                        }
                    }
                    if(mfound===1)
                    {
                        dt=(dt-7)+31;
                        month=month-1;
                        if(month===0)
                        {
                            month=12
                            year=year-1;

                        }
                    }
                    else
                    {
                        dt=(dt-7)+30;
                        month=month-1;
                        if(month===0)
                        {
                            month=12
                            year=year-1;
                        }
                    }
                }
            }
            else
            {
                dt=dt-7;
            }
        }
        if(value===30)
        {
            let prevmonth=month-1;
            if(prevmonth===0)
            {
                prevmonth=12;
                year=year-1;
            }
            let boolfound=-1;
            for(i=0;i<months.length;i++)
            {
                if(month===months[i])
                {
                    boolfound=1;
                    break
                }
            }
            if(boolfound===1)
            {
                let boolcheck=-1;
                for(i=0;i<months.length;i++)
                {
                    if(prevmonth===months[i])
                    {
                        boolcheck=1;
                        break
                    }
                }
                if(boolcheck===1)
                {
                    dt=dt-30+31;
                    month=month-1;
                    if(month===0)
                    {
                        month=12;
                        year=year-1
                    }
                    if(dt===0)
                    {
                        dt=1
                    }
                }
                else
                {   
                    month=month-1;
                    if(month===0)
                    {
                        month=12;
                        year=year-1
                    }
                }
            }

        }
        if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }
        
        return year+'-' + month + '-'+dt
  }
    componentDidUpdate(prevProps) {
        if(this.props.services.service && prevProps.services.service!==this.state.services)
    {
      this.setState({services:this.props.services.service})
      if(this.props.services.service["order_management"]===false)
      {
        
        this.NoAccess();
      }
    }
        if (
            (this.props.orders.historyOrders &&
                prevProps.orders.historyOrders !== this.props.orders.historyOrders)
        ) {
            this.setState({ orders: this.props.orders.historyOrders }, () => console.log(this.state.orders));
        }
        if (this.state.flag === true && !_.isEmpty(this.state.branchSelect) && !_.isEmpty(this.state.selectedSection) && !_.isEmpty(this.state.selectedTime)) {
            
            let startDate,endDate;
            if(this.state.selectedTime.value===0 || this.state.selectedTime.value===1)
            {
                let date=new Date(); 
                startDate=this.toPerfectDateString(date.toISOString(),this.state.selectedTime.value)
                endDate=startDate
                
                this.props.getOrders({
                    branch_id: this.state.branchSelect.id,
                    order_type: this.state.selectedSection.value,
                    status: "SERVED,DELIVERED,PICKED_UP,END",
                    order_for: "HISTORY",
                    //order_days: this.state.selectedTime.value
                    start_date:startDate,
                    end_date:endDate
                });
            }
            if(this.state.selectedTime.value===3 || this.state.selectedTime.value===7 
                || this.state.selectedTime.value===30)
            {
                
              
                let date=new Date(); 
                startDate=this.toPerfectDateString(date.toISOString(),this.state.selectedTime.value)
                endDate=this.toPerfectDateString(date.toISOString(),0)
                
                this.props.getOrders({
                    branch_id: this.state.branchSelect.id,
                    order_type: this.state.selectedSection.value,
                    status: "SERVED,DELIVERED,PICKED_UP,END",
                    order_for: "HISTORY",
                    //order_days: this.state.selectedTime.value
                    start_date:startDate,
                    end_date:endDate
                });
            }
            if(this.state.selectedTime.value===100)
            {
                this.props.getOrders({
                    branch_id: this.state.branchSelect.id,
                    order_type: this.state.selectedSection.value,
                    status: "SERVED,DELIVERED,PICKED_UP,END",
                    order_for: "HISTORY"
                });   
            }
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
                {this.state.services["order_management"]===true?
                <Row>
                    <Colxx xxs="12" className="mb-4">
                        <Card>
                            <CardBody>

                                <div className="btn-group float-right float-none-xs">

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
                                {!_.isEmpty(this.state.branchSelect) ?
                                    <div className="btn-group float-right float-none-xs">

                                        <ButtonDropdown
                                            className="mr-1 mb-1"
                                            isOpen={this.state.isOpenSection}
                                            toggle={this.toggleSection}
                                        >
                                            <DropdownToggle caret outline color="primary">
                                                {!_.isEmpty(this.state.selectedSection)
                                                    ? this.state.selectedSection.label
                                                    : "Select Section"}
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                {this.state.sections.map((data, i) => (
                                                    <DropdownItem
                                                        key={i}
                                                        onClick={() => this.onSectionSelect(data)}
                                                    >
                                                        {data.label}
                                                    </DropdownItem>
                                                ))}
                                            </DropdownMenu>
                                        </ButtonDropdown>
                                    </div> : null}
                                {!_.isEmpty(this.state.branchSelect) && !_.isEmpty(this.state.selectedSection) ?
                                    <div className="btn-group float-right float-none-xs">

                                        <ButtonDropdown
                                            className="mr-1 mb-1"
                                            isOpen={this.state.isOpenTime}
                                            toggle={this.toggleTime}
                                        >
                                            <DropdownToggle caret color="primary">
                                                {!_.isEmpty(this.state.selectedTime)
                                                    ? this.state.selectedTime.label
                                                    : "Select Time"}
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                {this.state.times.map((data, i) => (
                                                    <DropdownItem
                                                        key={i}
                                                        onClick={() => this.onTimeSelect(data)}
                                                    >
                                                        {data.label}
                                                    </DropdownItem>
                                                ))}
                                            </DropdownMenu>
                                        </ButtonDropdown>
                                    </div> : null}

                                <CardTitle>
                                    <h1>Orders History</h1>
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
                </Row>:<div><NoAccess ModuleName={"Order management"}
                modalOpen = {this.state.noAccess}
                toggleModal = { this.NoAccess }/></div>}
            </Fragment>
        );
    }
}
const mapStateToProps = ({ menuDishes, orders,services }) => {
    return { menuDishes, orders ,services};
};
export default connect(mapStateToProps, {
    getRestaurant,
    getBranch,
    getServices,
    getOrders,
})(ordersPage);
