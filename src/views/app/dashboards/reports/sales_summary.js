import React, { Component, Fragment } from "react";
import NoAccess from "../../../../components/Extra/noAccessDialog";
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
  getServices,
  getSale,
  getSaleSuccess,
  
} from "../../../../redux/actions";
import { connect } from "react-redux";
import _ from "lodash";
import {
    RangeDatePicker,
  } from "react-google-flight-datepicker";
  import "react-google-flight-datepicker/dist/main.css";
class SalesSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenBranch: false,
      branchSelect: {},
      startDate: new Date(),
      endDate: new Date(),
      sales_summary:{},
      access:false,
      accessmodalOpen:false,
      noAccess:false,
      services:{},
      times:[],
	    sales:[],
      temp_sales:[],
	    data : {},
      gross_Sales:0,
	    flag: false,
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
        branchSelect: item,
      },
      () => {
          this.setState({ flag: true });
          var obj={
            branch_id:this.state.branchSelect.id,
            start_date:this.state.startDate.toISOString().split('T')[0],
            end_date:this.state.endDate.toISOString().split('T')[0],

          }
          this.props.getSale(obj);

        } 
    );
  };

  updateGraph = () =>{
  
        this.setState({
          sales_summary:this.props.dashboard.sales,
          times:Object.keys(this.props.dashboard.sales),
        });
        var sum=0;
        var object = this.props.dashboard.sales;
        var tempArray=[];
       
        for (var key in object) 
        {
            if (object.hasOwnProperty(key))
            {
                tempArray.push(object[key]);
                sum=sum+object[key];
            }
        }   
        this.setState({gross_Sales:sum});
        this.setState({sales:tempArray});
        var i,j;
        var temp_sales=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        var label= ["0", "01", "02", "03", "04", "05","06","07","08","09","10","11","12", "13", "14", "15", "16", "17","18","19","20","21","22","23"];
        for (i=0;i<temp_sales.length;i++)
        {
          var f=false;
          var index=-1;
          for (j=0;j<Object.keys(this.props.dashboard.sales).length &&!f;j++)
          {
                if(label[i]===Object.keys(this.props.dashboard.sales)[j])
                {
                  f=true;
                  index=i;
                }
          }
          if(f===true)
          {
            temp_sales[index]+=this.props.dashboard.sales[label[index]];
          }
        }
        let obj ={
          labels: ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM","6 AM","7 AM","8 AM","9 AM","10 AM","11 AM","12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM","6 PM","7 PM","8 PM","9 PM","10 PM","11 PM"],
		      datasets: [
		      {
			      label: "Sales hourly",
			      fill: false,
			      data: temp_sales,
			      borderColor: "#c5a114eb"
		      }
		    ]
      }
      this.setState({data:obj})
    
   
    
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

    if (
      (this.props.dashboard.sales &&
          prevProps.dashboard.sales !== this.props.dashboard.sales)
  ) {
      this.updateGraph();
  }
}
  UNSAFE_componentWillMount() {
    if (_.isEmpty(this.props.menuDishes.branches))
      this.props.getBranch(this.props.menuDishes.restaurant[0])
      if(!_.isEmpty(this.props.menuDishes.branches))
      setTimeout(
        () => this.onBranchSelect(this.props.menuDishes.branches[0]),
        4000
      );
  }
 
  onDateChange = (start,end) => {
      this.setState({
          startDate: start,
          endDate: end
      });
      if(this.state.flag===true)
      {
        var obj={
          branch_id:this.state.branchSelect.id,
          start_date:this.state.startDate.toISOString().split('T')[0],
          end_date:this.state.endDate.toISOString().split('T')[0],
        }
        this.props.getSale(obj);
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
                    <h1>Sales Summary</h1>
                  </CardTitle>
                </div>
                <hr/>
               {
                !_.isEmpty(this.state.data) ? (
                  <div>
                    
                    <h4>Time of Day : </h4>
                    <p> Gross sales today are Rs <span>{this.state.gross_Sales}</span>.</p>
                    
                    <Line data={this.state.data} />
                
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
const mapStateToProps = ({ menuDishes, dashboard ,services}) => {
  return { menuDishes, dashboard ,services};
};
export default connect(mapStateToProps, {
  getRestaurant,
  getBranch,
  getSale,
  getSaleSuccess,
  getServices
})(SalesSummary);
