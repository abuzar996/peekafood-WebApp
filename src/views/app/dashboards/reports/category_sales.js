import React, { Component, Fragment } from "react";
import MaterialTable from 'material-table';
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
  getServices,
  getBranch,
  getCategorySaleStats,
  getCategorySaleStatsSuccess,
  getCategorySaleStatsHourly,
  getCategorySaleStatsHourlySuccess,
  
} from "../../../../redux/actions";
import { connect } from "react-redux";
import _, { toPlainObject }  from "lodash";
import {
    RangeDatePicker,
  } from "react-google-flight-datepicker";
import "react-google-flight-datepicker/dist/main.css";

  

class CategorySales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenBranch: false,
      branchSelect: {},
      access:false,
      accessmodalOpen:false,
      noAccess:false,
      services:{},
      startDate: new Date(Date.now()),
      endDate: new Date(Date.now()),
      name:"",
      data:[],
      Gross_Sales:0.0,
      CategorySales:{},
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
    var day = new Date('Apr 30, 2000');
    console.log(day); // Apr 30 2000

     
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
          this.props.getCategorySaleStats(obj);
         
          
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
    let obj=this.props.dashboard.category_sales_stats;
    if(!_.isEmpty(obj))
    {
      this.setState({data:obj});
    }
  }
  updateGraph=()=>{
    
    let obj=this.props.dashboard.category_sales_stats_hourly;
    var keyArray,tempArray;
    var Times=[]
    if(Object.keys(obj).length!==0)
    {
      keyArray=[];
      tempArray=[];
      var GrossSales=0.0;

      for (var key in obj) 
      {
          if (obj.hasOwnProperty(key))
          {
              keyArray.push(key);
              tempArray.push(obj[key]);
              GrossSales+=parseInt(obj[key]);
          }
      }   
      this.setState({Gross_Sales:GrossSales});
    }
    var i,j;
    for (i=0;i<Object.keys(obj).length;i++)
    {
      var dates=keyArray[i].split(" ");
      var hours=dates[1][0]+dates[1][1];
      Times.push(hours.toString());
    }
    let tempArray2=[];
    let Times2=[];
    for (i=0;i<Times.length;i++)
    {
      if(_.isEmpty(Times2))
      {
        Times2.push(Times[i]);
        tempArray2.push(tempArray[i]);
      }
      else
      {
        let found=false;
        let index=-1;
        let inindex=-1;
        for (j=0;j<Times2.length && found===false;j++)
        {
          if(Times[i]===Times2[j])
          {
            
            found=true;
            index=i;
            inindex=j;
          }
        }
        if(found===true && index!==-1)
        {
          
          tempArray2[inindex]+=tempArray[index];
        }
        else
        {
          Times2.push(Times[i]);
          tempArray2.push(tempArray[i]);
        }
      }

      
    }
    let Times3=[];
    let Times4=[];
    for(i=0;i<Times2.length;i++)
    {
      Times3.push(parseInt(Times2[i])+5)
      
    }
    for (i=0;i<Times2.length;i++)
    {
      let num =Times3[i].toString();
      Times4.push(num);
    }
    
    
    var NewObj={}
    for(i=0;i<Times2.length;i++)
    {
      let val=Times4[i];
      NewObj[val]=tempArray2[i];
    }
    
    var temp_sales=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var label= ["0", "01", "02", "03", "04", "05","06","07","08","09","10","11","12", "13", "14", "15", "16", "17","18","19","20","21","22","23"];
    for (i=0;i<temp_sales.length;i++)
    {
      var f=false;
      var index=-1;
      for (j=0;j<Object.keys(this.props.dashboard.category_sales_stats_hourly).length &&!f;j++)
      {
            if(label[i]===Times4[j])
            {
              f=true;
              index=i;
            }
      }
      if(f===true)
      {
        temp_sales[index]+=NewObj[label[index]];
      }
      
    }
    if (this.state.name==="")
    {
        var obj1=this.props.dashboard.category_sales_stats[0];
        var obj2 =toPlainObject(obj1);
    }

    var data = {
      labels: ["12am", "1am", "2am", "3am", "4am", "5am","6am","7am","8am","9am","10am","11am","12pm", "1pm", "2pm", "3pm", "4pm", "5pm","6pm","7pm","8pm","9pm","10pm","11pm"],
      datasets: [
        {
          label: this.state.name!==""?this.state.name:obj2.category_name,
          fill: false,
          data: temp_sales,
          borderColor: "#c5a114eb"
        }
      ]
    };
    this.setState({CategorySales:data});
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
    if(this.props.dashboard.category_sales_stats && prevProps.dashboard.category_sales_stats !== this.props.dashboard.category_sales_stats)
    {
      this.updateFeatures();
      var date= this.toPerfectDateString(this.state.startDate.toISOString())
      var nextDay = new Date(this.state.endDate);
          nextDay.setDate(this.state.endDate.getDate() + 1);
          var date2= this.toPerfectDateString(nextDay.toISOString())
      var obj1=toPlainObject(this.props.dashboard.category_sales_stats[0]);
      if(obj1.category_id!=null)
      {
        /*var obj={
          "category_id":24,
          "start_date": "2021-03-01",
          "end_date": "2021-03-30"
        };*/
        var obj={
          "category_id":obj1.category_id,
          "start_date":date,
          "end_date": date2
          };
          this.props.getCategorySaleStatsHourly(obj);
      }
    }
    if(this.props.dashboard.category_sales_stats_hourly && prevProps.dashboard.category_sales_stats_hourly !== this.props.dashboard.category_sales_stats_hourly)
    {
      
      this.updateGraph();
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
        var nextDay = new Date(end);
          nextDay.setDate(end.getDate() + 1);
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
        this.props.getCategorySaleStats(obj);
      
    }
  }
  HandleClick =(event,rowData)=>
  {
    var id=rowData.category_id;
    
    var date= this.toPerfectDateString(this.state.startDate.toISOString())
    var nextDay = new Date(this.state.endDate);
          nextDay.setDate(this.state.endDate.getDate() + 1);
          var date2= this.toPerfectDateString(nextDay.toISOString())
    var obj={
      "category_id":id ,
      "start_date": date,
      "end_date": date2
    };
    /*
    var obj={
      "category_id":id,
      "start_date": "2021-03-01",
      "end_date": "2021-03-30"
    };*/
    this.setState({name:rowData.category_name});
    this.props.getCategorySaleStatsHourly(obj);
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
                    <h1>Category Sales</h1>
                  </CardTitle>
                </div>
                <hr/>
                {this.state.flag === true ? (
                  <div>
                    
                    <h4>Time of Day : </h4>
                    <p> Number of categories Sold:<span>{this.state.Gross_Sales}</span>. </p>
                    <Line data={this.state.CategorySales} />
                    <hr/>
                    <MaterialTable

                            title="Category Sales Table"
                            data={this.state.data}
                            columns={[
                              {title: "Category", field: 'category', render: row => <div> {row.category_name}</div> },
                              {title: "Items Sold", field: 'quantity', render: row => <div> {row.total}</div> },
                              {title: "Gross Sales", field: 'price', render: row => <div> {row.gross_total}</div> },
                            
                          ]}  
                          onRowClick={this.HandleClick}  
                          options={{
                            search:false,
                            paging:false,
                            maxBodyHeight:330,
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
const mapStateToProps = ({ menuDishes, dashboard ,services}) => {
  return { menuDishes, dashboard ,services};
};
export default connect(mapStateToProps, {
  getRestaurant,
  getBranch,
  getCategorySaleStats,
  getCategorySaleStatsSuccess,
  getCategorySaleStatsHourly,
  getCategorySaleStatsHourlySuccess,
  getServices
})(CategorySales);
