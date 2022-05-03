import React, { Component, Fragment } from "react";
import './style.css';
import MaterialTable from 'material-table';

import {
  Row,
  Card,
  Button,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  ButtonDropdown,
} from "reactstrap";
import { Colxx } from "../../../components/common/CustomBootstrap";
import FeedbackTable from "../../../containers/dashboards/feedback_table";

import {
  getRestaurant,
  
  getBranch,
  getSummary,
  getSummarySuccess,
  
  getFeedbackSentiments
} from "../../../redux/actions";
import { connect } from "react-redux";
import _ from "lodash";


class DashboardAnalytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenBranch: false,
      branchSelect: {},
      access:false,
      accessmodalOpen:false,
      noAccess:false,
      services:{},
      gross_sales:0.0,
      transactions:0.0,
      payment_types:[],
      dish_sales_report:[],
      category_sales_report:[],
      hovr: false,
      hovr2: false,
      hovr3: false,
      hovr4: false,
      hovr5: false,
      hovr6: false,
      hovr7: false,
      flag: false
    };
    
  }


  onGrossClick = () => {
     this.props.history.push('reports/sales-summary')
  }
   
    toggleHover=()=> {
      this.setState({ hovr: !this.state.hovr });
    }
    toggleHover2=()=> {
      this.setState({ hovr2: !this.state.hovr2 });
    }
    toggleHover3=()=> {
      this.setState({ hovr3: !this.state.hovr3 });
    }
    toggleHover4=()=> {
      this.setState({ hovr4: !this.state.hovr4 });
    }
    toggleHover5=()=> {
      this.setState({ hovr5: !this.state.hovr5 });
    }
    toggleHover6=()=> {
      this.setState({ hovr6: !this.state.hovr6 });
    }
    toggleHover7=()=> {
      this.setState({ hovr7: !this.state.hovr7 });
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
          flag: true
        },
        () => {
          if (!_.isEmpty(this.state.branchSelect) ) {
            var date=new Date(Date.now());
      let obj = {
        start_date:date.toISOString().split('T')[0],
        end_date:date.toISOString().split('T')[0],
        branch_id:this.state.branchSelect.id,
        limit:3
      };
      this.props.getSummary(obj);
      this.props.getFeedbackSentiments(this.state.branchSelect.id);  
           
    
          }
        }
      );
    };
    onTransactionClick = () => {
      this.props.history.push('transactions')
    }
    UNSAFE_componentWillMount() {
      if (_.isEmpty(this.props.menuDishes.branches))
        this.props.getBranch(this.props.menuDishes.restaurant[0])
       
          setTimeout(
            () => this.onBranchSelect(this.props.menuDishes.branches[0]),
            4000
          );
    
        
    }
    
    render() {
      var linkStyle1;
      var linkStyle2;
      var linkStyle3;
      var linkStyle4;
      var linkStyle5;
      if (this.state.hovr) {
        linkStyle1 = {backgroundColor: '#efefef',cursor: 'pointer'}
      } else {
        linkStyle1 = {color: '#000'}
      }
      if (this.state.hovr2) {
        linkStyle2 = {backgroundColor: '#efefef',cursor: 'pointer'}
      } else {
        linkStyle2 = {color: '#000'}
      }
      if (this.state.hovr3) {
        linkStyle3 = {backgroundColor: '#efefef',cursor: 'pointer'}
      } else {
        linkStyle3 = {color: '#000'}
      }
      if (this.state.hovr4) {
        linkStyle4 = {backgroundColor: '#efefef',cursor: 'pointer'}
      } else {
        linkStyle4 = {color: '#000'}
      }
      if (this.state.hovr5) {
        linkStyle5 = {backgroundColor: '#efefef',cursor: 'pointer'}
      } else {
        linkStyle5 = {color: '#000'}
      }
      return (
        
        <Fragment>
          {this.props.dashboard.loading === true  || this.props.menuDishes.loading === true ? (
            <div className="loading" />
          ) : null}
          
          <Row>
            <Colxx xxs="12" className="mb-4">
              <Card>
                <CardBody>
                  <div>
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
                    <CardTitle>
                      <h1>Dashboard at glance</h1>
                      <br/><br/><br/>
                      <h2>Today</h2>
                    </CardTitle>
                  </div>
                  {_.isEmpty(this.props.dashboard.summary) || this.state.flag === false ? null : 
                  <Row>
                    <Colxx xs="7">
                    <Row>
                        <Colxx className="mb-4">
                          <Card   onClick={this.onGrossClick}> 
                            <CardBody style={linkStyle1} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
                              <Row>
                                <Colxx>
                                <CardTitle>Gross sales</CardTitle>       
                                </Colxx>
                              </Row>
                              <Row>
                                <Colxx>
                                <div>
                                {this.props.dashboard.summary.gross_sales ===0 || this.props.dashboard.summary.gross_sales === null?<h1 style={{alignItems:'center',opacity: 0.5}}>No sales yet</h1>:<h1 className="d-flex">Rs. {this.props.dashboard.summary.gross_sales}<div style={{opacity: 0.2}}>  {' >'} </div> </h1>}
                                </div>
                                </Colxx>
                              </Row>
                            </CardBody>
                          </Card>
                          
                        </Colxx>
                        <Colxx  className="mb-4">
                        <Card onClick={this.onTransactionClick} > 
                            <CardBody style={linkStyle2} onMouseEnter={this.toggleHover2} onMouseLeave={this.toggleHover2}>
                              <Row>
                                <Colxx>
                                <CardTitle>Transactions</CardTitle>
                                
                                </Colxx>
                              </Row>
                              <Row>
                                <Colxx>
                                <div>
                                {this.props.dashboard.summary.transactions=== 0 || this.props.dashboard.summary.transactions === null?<h1 style={{alignItems:'center',opacity: 0.5}}>No sales yet</h1>:<h1 className="d-flex">{this.props.dashboard.summary.transactions}<div style={{opacity: 0.2}}>  {' >'} </div> </h1>}    
                                                            </div>
                                </Colxx>
                              </Row>
                            </CardBody>
                          </Card>
                        </Colxx>
                        
                          
                  </Row>      
                  <Row>
                  <Colxx className="mb-4">
                  <Card style={linkStyle3} onMouseEnter={this.toggleHover3} onMouseLeave={this.toggleHover3} > 
                            <CardBody>
                              <Row>
                                <Colxx>
                                <CardTitle className="d-flex">Payment Type<div style={{opacity: 0.2}}> {' >'} </div></CardTitle>
                                
                                </Colxx>
                              </Row>
                              
                                
                                <div>
                                {_.isEmpty(this.props.dashboard.summary.payment_types) ? <h1 style={{alignItems:'center',opacity: 0.5}}>No sales yet</h1>:
                                <MaterialTable style={linkStyle3} onMouseEnter={this.toggleHover3} onMouseLeave={this.toggleHover3}
                                 title="Payment Type"
                                 data={this.props.dashboard.summary.payment_types}
                                 columns={[
                                   {title: "Payment Type", field: 'payment', render: row => <div> {row.payment_type}</div> },
                                   {title: "Total", field: 'payment', render: row => <div> {row.total}</div> },
                                   
                                 
                               ]}  
     
                               options={{
                                   actionsColumnIndex: -1,
                                   search: true,
                                   toolbar: false,
                                   paging: false,
                                   sorting: true
                               }}
                                />
                               }
                                  
                                </div>
                                
                            </CardBody>
                          </Card>
                          </Colxx>
                  </Row>
                  <Row>
                  <Colxx className="mb-4">
                  <Card style={linkStyle4} onMouseEnter={this.toggleHover4} onMouseLeave={this.toggleHover4} > 
                            <CardBody>
                              <Row>
                                <Colxx>
                                <CardTitle className="d-flex">Top items by sales<div style={{opacity: 0.2}}>  {' >'} </div></CardTitle>
      
                                
                                </Colxx>
                              </Row>
                              <Row>
                                <Colxx>
                                <div>
                                {_.isEmpty(this.props.dashboard.summary.dish_sales_report)?<h1 style={{alignItems:'center',opacity: 0.5}}>No sales yet today</h1>:
                                <MaterialTable style={linkStyle4} onMouseEnter={this.toggleHover4} onMouseLeave={this.toggleHover4}
                                        title="Top Dishes"
                                        data={this.props.dashboard.summary.dish_sales_report}
                                        columns={[
                                          {title: "Dish Name", field: 'name', render: row => <div> {row.dish_name}</div> },
                                          {title: "Sales Count", field: 'count', render: row => <div> {row.sales_count}</div> },
                                          
                                        
                                      ]}  
            
                                      options={{
                                          actionsColumnIndex: -1,
                                          search: true,
                                          toolbar: false,
                                          paging: false,
                                          sorting: true
                                      }}
                                        />
                              }
                                </div>
                                </Colxx>
                              </Row>
                            </CardBody>
                          </Card>
                          </Colxx>
                  </Row>
                  <Row>
                  <Colxx className="mb-4">
                  <Card style={linkStyle5} onMouseEnter={this.toggleHover5} onMouseLeave={this.toggleHover5} > 
                    
                            <CardBody>
                              <Row>
                                <Colxx>
                                <CardTitle className="d-flex">Top categories by sale<div style={{opacity: 0.2}}>  {' >'} </div></CardTitle>
                             
                                
                                </Colxx>
                              </Row>
                              <Row>
                                <Colxx>
                                <div>
                                {_.isEmpty(this.props.dashboard.summary.category_sales_report) ? <h1 style={{alignItems:'center',opacity: 0.5}}>No sales yet today</h1>:
                                 <MaterialTable style={linkStyle5} onMouseEnter={this.toggleHover5} onMouseLeave={this.toggleHover5}
                                      title="Top Dishes"
                                      data={this.props.dashboard.summary.category_sales_report}
                                      columns={[
                                        {title: "Dish Name", field: 'name', render: row => <div> {row.category_name}</div> },
                                        {title: "Sales Count", field: 'count', render: row => <div> {row.sales_count}</div> },
                                      ]}  
          
                                      options={{
                                        actionsColumnIndex: -1,
                                        search: true,
                                        toolbar: false,
                                        paging: false,
                                        sorting: true
                                      }}
                                 />
                                }
                                </div>
                                </Colxx>
                              </Row>
                            </CardBody>
                          </Card>
                          </Colxx>
                          
                      <Colxx xxs="12" className="mb-4">
                        <FeedbackTable
                          feedbacks={this.props.dashboard.feedbackSentiments}
                        />
                      </Colxx>
                  
                  </Row>
                  
                    </Colxx>
                    <Colxx xs="5">
                    
                        <Button className='d-flex' color="primary" size="xl" block>Add a Dish</Button>
                        <Button className='d-flex' color="primary" size="xl" block>Add a category</Button>
                        <br/>
                        <br></br>    
                      
                    
                  
                    </Colxx>
                  </Row>}
                
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
    
    getFeedbackSentiments,
    getSummary,
    getSummarySuccess,
    
  })(DashboardAnalytics);
  