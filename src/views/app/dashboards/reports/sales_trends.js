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
import { Line,Bar } from "react-chartjs-2";
import {
  getRestaurant,
  getBranch,
  getServices,
  getSaleTrend,
  getSaleTrendSuccess,
  getSaleWeekly,
  getSaleWeeklySuccess,
  getSaleYearly,
  getSaleYearlySuccess,
  
} from "../../../../redux/actions";
import { connect } from "react-redux";
import _ from "lodash";
import {
    RangeDatePicker,
  } from "react-google-flight-datepicker";
  import "react-google-flight-datepicker/dist/main.css";
 
class SalesTrends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenBranch: false,
      branchSelect: {},
      sales_Trend:{labels:[],datasets:[]},
      sales_Yearly:{},
      sales_weekly:{},
      access:false,
      accessmodalOpen:false,
      noAccess:false,
      services:{},
      Total_Sales_Hourly_Current:0,
      Total_Sales_Hourly_Previous:0,
      Total_Sales_Weekly_Current:0,
      Total_Sales_Weekly_Previous:0,
      sales_difference_daily:0,
      sales_difference_Weekly:0,
      sales_difference_Monthly:0,
      Precentage_Weekly:0,
      Precentage_Monthly:0,
      startDate: new Date(Date.now()),
      endDate: new Date(Date.now()),
      flag1:false,
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
         

          let obj = {
            branch_id:this.state.branchSelect.id,
            date_1:this.state.startDate.toISOString().split('T')[0],
            date_2:this.state.endDate.toISOString().split('T')[0],
          };
          this.props.getSaleTrend(obj);
          
          obj = {
            branch_id:this.state.branchSelect.id,
            year_1:"2021",
            year_2:"2020",
          };
          this.props.getSaleYearly(obj);
          
          this.props.getSaleWeekly({branch_id:this.state.branchSelect.id});
        }
      
    );
  };
  UpdateGraph=()=>{
    
      let obj1=this.props.dashboard.sales_trend.current;
      let obj2=this.props.dashboard.sales_trend.previous;
      var i,j;
      var keyArray1=[];
      var tempArray1=[];
      var keyArray2=[];
      var tempArray2=[];
      var sum=0;
      for (var key in obj1) 
      {
          if (obj1.hasOwnProperty(key))
          {
              keyArray1.push(key);
              tempArray1.push(obj1[key]);
          }
      }   
      sum=0;
      for(i=0;i<tempArray1.length;i++)
      {
        sum+=tempArray1[i]
      }
      this.setState({Total_Sales_Hourly_Current:sum})
      
      var temp_sales=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      var label= ["0", "01", "02", "03", "04", "05","06","07","08","09","1 0","11","12", "13", "14", "15", "16", "17","18","19","20","21","22","23"];
      for (i=0;i<temp_sales.length;i++)
      {
        var f=false;
        var index=-1;
        for (j=0;j<keyArray1.length &&!f;j++)
        {
          
              if(label[i]===keyArray1[j])
              {
                f=true;
                index=i;
              }
        }
        if(f===true)
        {
          temp_sales[index]=this.props.dashboard.sales_trend.current[label[index]];
        }
      }
      for (var key1 in obj2) 
      {
          if (obj2.hasOwnProperty(key1))
          {
              keyArray2.push(key1);
              tempArray2.push(obj2[key1]);
          }
      }         
      sum=0;
      for(i=0;i<tempArray2.length;i++)
      {
        sum+=tempArray2[i]
      }
      this.setState({Total_Sales_Hourly_Previous:sum})
      var temp_sales1=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      var label1= ["0", "01", "02", "03", "04", "05","06","07","08","09","10","11","12", "13", "14", "15", "16", "17","18","19","20","21","22","23"];
      for (i=0;i<temp_sales1.length;i++)
      {
        
        var f1=false;
        var index1=-1;
        for (j=0;j<keyArray2.length &&!f;j++)
        {
          
              if(label1[i]===keyArray2[j])
              {
                f1=true;
                index1=i;
              }
        }
        if(f1===true)
        {
          temp_sales1[index1]+=this.props.dashboard.sales_trend.previous[label1[index1]];
        }
      }
      let obj={
        labels: ["12am", "1am", "2am", "3am", "4am", "5am","6am","7am","8am","9am","10am","11am","12pm", "1pm", "2pm", "3pm", "4pm", "5pm","6pm","7pm","8pm","9pm","10pm","11pm"],
        datasets: [
          {
            label: "Sales hourly Today",
            fill: false,
            data: temp_sales,
            borderColor: "#c5a114eb"
          },
          {
            label: "Sales hourly Previous Day",
            fill: false,
            data: temp_sales1,
            borderColor: "#e7523e"
          }
        ],
      };
      this.setState({sales_Trend:obj});
      this.setState({sales_difference_daily:this.state.Total_Sales_Hourly_Current-this.state.Total_Sales_Hourly_Previous})




/////////////////////////////////////////////////////////////////////////////////


      obj1=this.props.dashboard.sales_yearly.current;
      obj2=this.props.dashboard.sales_yearly.previous;
      keyArray1=[];
      tempArray1=[];
      var Current_sum_Monthly=0;
      var Previous_sum_Monthly=0;
      for (var keys in obj1) 
      {
          if (obj1.hasOwnProperty(keys))
          {
              keyArray1.push(keys);
              tempArray1.push(obj1[keys]);
          }
      }   
      
      for(i=0;i<tempArray1.length;i++)
      {
        Current_sum_Monthly+=tempArray1[i]
      }
      
      var Month_label= ["1", "2", "3", "4", "5","6","7","8","9","10","11","12"];
      var temp_sales_Monthly=[0,0,0,0,0,0,0,0,0,0,0,0];
      
      for (i=0;i<temp_sales_Monthly.length;i++)
      {
        
        f1=false;
        index1=-1;
        for (j=0;j<keyArray1.length &&!f;j++)
        {
          
              if(Month_label[i]===keyArray1[j])
              {
                f1=true;
                index1=i;
              }
        }
        if(f1===true)
        {
          temp_sales_Monthly[index1]=this.props.dashboard.sales_yearly.current[Month_label[index1]];
        }
      }
      
      var temp_sales_MonthlyP=[0,0,0,0,0,0,0,0,0,0,0,0];
      keyArray1=[];
      tempArray1=[];
      for (var keys2 in obj2) 
         {
          if (obj2.hasOwnProperty(keys2))
          {
              keyArray1.push(keys2);
              tempArray1.push(obj2[keys2]);
          }
      }   
      
      for(i=0;i<tempArray1.length;i++)
      {
        Previous_sum_Monthly+=tempArray1[i]
      }


      this.setState({Total_Sales_Monthly_Previous:sum})
      for (i=0;i<temp_sales_MonthlyP.length;i++)
      {
        
        f1=false;
        index1=-1;
        for (j=0;j<keyArray1.length &&!f;j++)
        {
          
              if(Month_label[i]===keyArray1[j])
              {
                f1=true;
                index1=i;
              }
        }
        if(f1===true)
        {
          temp_sales_MonthlyP[index1]=this.props.dashboard.sales_yearly.previous[Month_label[index1]];
        }
      }
      obj = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        datasets: [
          {
            label: "Sales this year",
            fill: false,
            data: temp_sales_Monthly,
            backgroundColor: "#c5a114eb",
           
          },
          {
            label: "Sales Previous year",
            fill: false,
            data: temp_sales_MonthlyP,
            backgroundColor:  "#e7523e",
    
          }
        ]
      }; 
      this.setState({sales_Yearly:obj});
      var Sales_Difference_Monthly=Current_sum_Monthly-Previous_sum_Monthly;
      var Sales_Sum_Monthly=Current_sum_Monthly+Previous_sum_Monthly;

    
      
      var Sales_Percentage_Monthly=0;
      this.setState({sales_difference_Monthly:Sales_Difference_Monthly});
      if(Sales_Difference_Monthly>0)
      {
        Sales_Percentage_Monthly=(Sales_Difference_Monthly/Sales_Sum_Monthly)*100;
        this.setState({Precentage_Monthly:parseInt(Sales_Percentage_Monthly)})
      }
      else
      {
        Sales_Percentage_Monthly=((Sales_Difference_Monthly*-1)/Sales_Sum_Monthly)*100;
        this.setState({Precentage_Monthly:parseInt(Sales_Percentage_Monthly)})
      }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      var Days=[]
      obj1=this.props.dashboard.sales_weekly.current;
      obj2=this.props.dashboard.sales_weekly.previous;
      keyArray1=[];
      tempArray1=[];
      Days=[]
      var weekdays=new Array(7);
      weekdays[0]=  "Sunday"
      weekdays[1] = "Monday";
      weekdays[2] = "Tuesday";
      weekdays[3] = "Wednesday";
      weekdays[4] = "Thursday";
      weekdays[5] = "Friday";
      weekdays[6] = "Saturday";
      for (var keyss in obj1) 
      {
          if (obj1.hasOwnProperty(keyss))
          {
              keyArray1.push(keyss);
              tempArray1.push(obj1[keyss]);
          }
      }   
      var CurrentsumWeekly=0;
      for(i=0;i<tempArray1.length;i++)
      {
        CurrentsumWeekly+=tempArray1[i]
      }
     
      for (i=0;i<keyArray1.length;i++)
      {
        var date=new Date (keyArray1[i]);
        Days.push(weekdays[date.getDay()]);
      }
      let NewObj={}
      for(i=0;i<keyArray1.length;i++)
      {
        let val=Days[i];
        NewObj[val]=tempArray1[i];
      }
      var Week_label= ["Friday", "Saturday", "Sunday", "Monday", "Tuesday","Wednesday","Thursday"];
      var temp_sales_Weekly=[0,0,0,0,0,0,0];
      
      for (i=0;i<temp_sales_Weekly.length;i++)
      {
        
        f1=false;
        index1=-1;
        for (j=0;j<Days.length &&!f;j++)
        {
          
              if(Week_label[i]===Days[j])
              {
                f1=true;
                index1=i;
              }
        }
        if(f1===true)
        {
          //console.log(NewObj[Week_label[index1]]);
          temp_sales_Weekly[index1]=NewObj[Week_label[index1]];
        }
      }





      keyArray1=[];
      tempArray1=[];
      Days=[]
      for (var objkey in obj2) 
      {
          if (obj2.hasOwnProperty(objkey))
          {
              keyArray1.push(objkey);
              tempArray1.push(obj2[objkey]);
          }
      }   
      var PrevioussumWeekly=0;
      for(i=0;i<tempArray1.length;i++)
      {
        PrevioussumWeekly+=tempArray1[i]
      }
      for (i=0;i<keyArray1.length;i++)
      {
        date=new Date (keyArray1[i]);
        Days.push(weekdays[date.getDay()]);
      }
      NewObj={}
      for(i=0;i<keyArray1.length;i++)
      {
        let val=Days[i];
        NewObj[val]=tempArray1[i];
      }
      
      var temp_sales_WeeklyP=[0,0,0,0,0,0,0];
      for (i=0;i<temp_sales_WeeklyP.length;i++)
      {
        
        f1=false;
        index1=-1;
        for (j=0;j<Days.length &&!f;j++)
        {
          
              if(Week_label[i]===Days[j])
              {
                f1=true;
                index1=i;
              }
        }
        if(f1===true)
        {
          temp_sales_WeeklyP[index1]=NewObj[Week_label[index1]];
        }
      }
      

      obj = {
        labels: ["Friday","Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday"],
        datasets: [
          {
            label: "Sales this week",
            fill: false,
            data: temp_sales_Weekly,
            backgroundColor: "#c5a114eb",
           
          },
          {
            label: "Sales Previous week",
            fill: false,
            data:temp_sales_WeeklyP,
            backgroundColor:  "#e7523e",
    
          }
        ]
      };
      this.setState({sales_weekly:obj});
      var Sales_Difference_Weekly=CurrentsumWeekly-PrevioussumWeekly;
      var Sales_Sum_Weekly=CurrentsumWeekly+PrevioussumWeekly;

    
      
      var Sales_Percentage_Weekly=0;
      this.setState({sales_difference_Weekly:Sales_Difference_Weekly});
      if(Sales_Difference_Weekly>0)
      {
        Sales_Percentage_Weekly=(Sales_Difference_Weekly/Sales_Sum_Weekly)*100;
        this.setState({Precentage_Weekly:parseInt(Sales_Percentage_Weekly)})
      }
      else
      {
        Sales_Percentage_Weekly=((Sales_Difference_Weekly*-1)/Sales_Sum_Weekly)*100;
        this.setState({Precentage_Weekly:parseInt(Sales_Percentage_Weekly)})
      }

/////////////////////////////////////////////////////////////////////////       


  
  }
  NoAccess=()=>{
    this.setState({noAccess:!this.state.noAccess});
  }
  componentDidUpdate(prevProps)
  {
    if(this.props.services.service && prevProps.services.service!==this.state.services)
    {
      this.setState({services:this.props.services.service})
      if(this.props.services.service["analytics_management"]===false)
      {
        this.NoAccess();
      }
    }

    if (
      (this.props.dashboard.sales_trend && prevProps.dashboard.sales_trend !== this.props.dashboard.sales_trend) ||
      (this.props.dashboard.sales_yearly && prevProps.dashboard.sales_yearly !== this.props.dashboard.sales_yearly) ||
      (this.props.dashboard.sales_weekly && prevProps.dashboard.sales_weekly !== this.props.dashboard.sales_weekly)
    )
    {
        this.UpdateGraph();
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
      })
      if(this.state.flag===true)
      {
        let obj = {
          branch_id:this.state.branchSelect.id,
          date_1:this.state.startDate.toISOString().split('T')[0],
          date_2:this.state.endDate.toISOString().split('T')[0],
        };
        this.props.getSaleTrend(obj);
        
        obj = {
          branch_id:this.state.branchSelect.id,
          year_1:"2021",
          year_2:"2020",
        };
        this.props.getSaleYearly(obj);
        
        this.props.getSaleWeekly({branch_id:this.state.branchSelect.id});
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
                  <h1>Sales Trends</h1>
                </CardTitle>
                </div>
                <hr/>
                {                this.state.flag === true ? (
                  <div>
                    <h3>Daily Gross Sales</h3>
                    <div>{String(this.state.startDate)}</div>
                    {
                      this.state.sales_difference_daily>0?
                      <div><p> +₨ {this.state.sales_difference_daily} more in sales so far than the previous Day </p></div>:
                      <div><p> +₨ {-1*this.state.sales_difference_daily} more sales in the previous Day than Today</p></div>
                    }
                    
                    <Line data={this.state.sales_Trend} />
                    <hr/>
                    <h3>Weekly Gross Sales</h3>
                    <div>{String(this.state.startDate)} compared with previous week</div>
                    {
                    this.state.sales_difference_Weekly>0?
                      <p> {this.state.Precentage_Weekly}% more in sales so far than the previous Week </p>:
                      <p> {this.state.Precentage_Weekly}% more sales in previous Week than the current one so far</p>
                    }
                    <Bar data={this.state.sales_weekly}/>
                    <hr/>
                    <h3>Yearly Gross Sales</h3>
                    <div>{String(this.state.startDate.getFullYear())} compared with previous year</div>
                    {this.state.sales_difference_Monthly>0?<p> {this.state.Precentage_Monthly}% more in sales so far than the previous Year </p>:
                    <p> {this.state.Precentage_Monthly}% more sales in the previous Year than the current one so far</p>}
                    

                    <Bar data={this.state.sales_Yearly}/>
                
                  </div>
                ) : null}
              </CardBody>
            </Card>
          </Colxx>
        </Row>:<div><NoAccess ModuleName={"Analytics management"}
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
  getSaleTrend,
  getSaleTrendSuccess,
  getSaleWeekly,
  getSaleWeeklySuccess,
  getSaleYearly,
  getSaleYearlySuccess,
  getServices 
})(SalesTrends);
