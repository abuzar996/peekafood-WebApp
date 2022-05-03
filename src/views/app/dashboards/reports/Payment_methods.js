import React, { Component, Fragment } from "react";
import MaterialTable from 'material-table';
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
  getPaymentMethods
  
} from "../../../../redux/actions";
import { connect } from "react-redux";
import _ from "lodash";
import {
    RangeDatePicker,
  } from "react-google-flight-datepicker";
  import "react-google-flight-datepicker/dist/main.css";
class PaymentMethods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenBranch: false,
      branchSelect: {},
      access:false,
      accessmodalOpen:false,
      noAccess:false,
      services:{},
      payment_methods:[],
      startDate: new Date(Date.now()),
      endDate: new Date(Date.now()),
      flag: false
    };
  }
  toggleBranch = () => {
    this.setState(prevState => ({
      isOpenBranch: !prevState.isOpenBranch
    }));
  };
  toPerfectDateString=(d)=>
  {
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
  onBranchSelect = item => {
    this.setState(
      {
        branchSelect: item
      },
      () => {
          this.setState({ flag: true });
          var date= this.toPerfectDateString(this.state.startDate.toISOString())
          var nextDay = new Date(this.state.endDate);
          nextDay.setDate(this.state.endDate.getDate() + 1);
          var date2= this.toPerfectDateString(nextDay.toISOString())
    
          let obj={
            "branch_id":this.state.branchSelect.id,
            "start_date": date,
            "end_date": date2
          };
          this.props.getPaymentMethods(obj);
        }
      
    );
  };
  UNSAFE_componentWillMount() {
    if (_.isEmpty(this.props.menuDishes.branches))
    this.props.getBranch(this.props.menuDishes.restaurant[0])
    if(!_.isEmpty(this.props.menuDishes.branches))
    setTimeout(
      () => this.onBranchSelect(this.props.menuDishes.branches[0]),
      4000
    );
  }

  updateFeatures=()=>{
    let obj1=this.props.dashboard.payment_methods;
    let payment_types=Object.keys(obj1);
    let payment=[];
    let tempobj={};
    if(!_.isEmpty(payment_types))
    {
      for(var i=0;i<payment_types.length;i++)
      {
        tempobj=obj1[payment_types[i]];
        tempobj["payment_type"]=payment_types[i];
        payment.push(tempobj);

      }
      this.setState({payment_methods:payment});
    }
  }
  NoAccess=()=>{
    this.setState({noAccess:!this.state.noAccess});
  }
  componentDidUpdate(prevProps) {
    if(this.props.services.service && prevProps.services.service!==this.state.services)
    {
      this.setState({services:this.props.services.service})
      if(this.props.services.service["analytics_management"]===false)
      {
        this.NoAccess();
      }
    }
    if(this.props.dashboard.payment_methods && prevProps.dashboard.payment_methods !== this.props.dashboard.payment_methods)
    {
      this.updateFeatures();
    }
  }
  onDateChange = (start,end) => {
      this.setState({
          startDate: start,
          endDate: end
      })
      if(this.state.flag===true)
      {
        var date= this.toPerfectDateString(start.toISOString())
        var nextDay = new Date(this.state.endDate);
        nextDay.setDate(this.state.endDate.getDate() + 1);
        var date2= this.toPerfectDateString(nextDay.toISOString())
    
        /*var obj={
          "branch_id":17,
          "start_date": "2021-03-01",
          "end_date": "2021-03-30"
        };*/
        var obj={
          "branch_id":this.state.branchSelect.id ,
          "start_date": date,
          "end_date": date2
        };
        this.props.getPaymentMethods(obj);
      
    }
  }

  render() {
    return (
      <Fragment>
        {this.props.dashboard.loading === true ? (
          <div className="loading" />
        ) : null}
        {this.state.services["analytics_management"]===true?
        <Row>
          <Colxx xxs="12" className="mb-4">
            <Card>
              <CardBody>
                <div>
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
                    <h1>Payment Methods</h1>
                  </CardTitle>
                </div>
                <hr/>
                {
                this.state.flag === true ? (
                  <div>
                    
                    <h4>Payment Methods </h4>
                    <MaterialTable
                          title="Item Sales Table"
                          data={this.state.payment_methods}
                          columns={[
                            {title: "Payment Method", field: 'name', render: row => <div> {row["payment_type"]}</div> },
                            {title: "Payments", field: 'sku', render: row => <div> {row["num_of_transactions"]}</div> },
                            {title: "Refund", field: 'category', render: row => <div> {row["num_of_refunds"]}</div> },
                            {title: "Payment Amount", field: 'unit', render: row => <div> {row["total_collected"]}</div> },
                            {title: "Refund Amount", field: 'quantity', render: row => <div> {row["refund_amount"]}</div> },
                            {title: "Total Collected", field: 'quantity', render: row => <div> {row["total_collected"]}</div> },
                            {title: "Net Total", field: 'price', render: row => <div> {row["total_collected"]-row["refund_amount"]}</div> },
                        ]}  
                        options={{
                            actionsColumnIndex: -1,
                            search: true,
                            toolbar: false,
                            paging: false,
                            sorting: true
                        }}
                  />
                
                  </div>
                ) : null}
              </CardBody>
            </Card>
          </Colxx>
        </Row>
:<div><NoAccess ModuleName={"Analytics management"}
modalOpen = {this.state.noAccess}
toggleModal = { this.NoAccess }/></div>}
       
      </Fragment>
    );
  }
}
const mapStateToProps = ({ menuDishes, dashboard,services }) => {
  return { menuDishes, dashboard,services };
};
export default connect(mapStateToProps, {
  getRestaurant,
  getBranch,
  getPaymentMethods,
  getServices
})(PaymentMethods);
