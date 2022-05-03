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
import { Line } from "react-chartjs-2";
import {
  getRestaurant,
  getBranch,
  
} from "../../../../redux/actions";
import { connect } from "react-redux";
import _ from "lodash";
import {
    RangeDatePicker,
  } from "react-google-flight-datepicker";
  import "react-google-flight-datepicker/dist/main.css";
const data = {
    labels: ["12am", "1am", "2am", "3am", "4am", "5am","6am","7am","8am","9am","10am","11am","12pm", "1pm", "2pm", "3pm", "4pm", "5pm","6pm","7pm","8pm","9pm","10pm","11pm"],
    datasets: [
      {
        label: "Sales hourly",
        fill: false,
        data: [0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0],
        borderColor: "#c5a114eb"
      }
    ]
  };
const data2 = [
    {
      Name:"Water Bottle",
      Discount_Applied:10,
      Ammount_Discounted:100.00,
    },
    {
      Name:"Chicken Wrap",
      Discount_Applied:20,
      Ammount_Discounted:50.00,
    },
  ];

class Discounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenBranch: false,
      branchSelect: {},
      
      data:[
        
      ],
     
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
  onBranchSelect = item => {
    this.setState(
      {
        branchSelect: item
      },
      () => {
          this.setState({ flag: true });
        }
      
    );
  };
  componentDidMount(){
    this.setState({data:data2});
  }
  UNSAFE_componentWillMount() {
    if (_.isEmpty(this.props.menuDishes.branches))
      this.props.getBranch(this.props.menuDishes.restaurant[0])
  }
  componentDidUpdate() {
    if (_.isEmpty(this.state.branchSelect))
      setTimeout(
        () => this.onBranchSelect(this.props.menuDishes.branches[0]),
        2200
      );
  }
  onDateChange = (start,end) => {
      this.setState({
          startDate: start,
          endDate: end
      })
  }

  render() {
    return (
      <Fragment>
        {this.props.dashboard.loading === true ? (
          <div className="loading" />
        ) : null}
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
                    <h1>Discounts</h1>
                  </CardTitle>
                </div>
                <hr/>
                {this.state.flag === true ? (
                  <div>
                    
                    
                    <p> Top Discount :Rs.1000 </p>
                    <Line data={data} />
                    <hr/>
                    <MaterialTable
                    
                            title="Discount Table"
                            data={this.state.data}
                            columns={[
                              {title: "Name", field: 'name', render: row => <div> {row.Name}</div> },
                              {title: "Discount Applied", field: 'price', render: row => <div> {row.Discount_Applied}</div> },
                              {title: "Ammount Discounted", field: 'category', render: row => <div> Rs.{row.Ammount_Discounted}</div> },

                            
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

       
      </Fragment>
    );
  }
}
const mapStateToProps = ({ menuDishes, dashboard }) => {
  return { menuDishes, dashboard };
};
export default connect(mapStateToProps, {
  getRestaurant,
  getBranch,
})(Discounts);
