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
import {
  getRestaurant,
  getServices,
  getOrdersChannel,
  stopOrdersChannel,
  getBranch,
  getOrders,
  editOrderStatus,
  deleteOrder,
 deleteNotification
} from "../../../../redux/actions";
import OrdersIncoming from "./ordersIncoming";
import OrdersActive from "./ordersActive";
import { connect } from "react-redux";
import _ from "lodash";

class ordersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      branchSelect: {},
      flag: false,
      isOpenBranch: false,
      isOpenSection: false,
      activeOrders: [],
      access:false,
      accessmodalOpen:false,
      noAccess:false,
      services:{},
      incomingOrders: [],

    };
  }
  intervalId = 0;
  toggleBranch = () => {
    this.setState(prevState => ({
      isOpenBranch: !prevState.isOpenBranch
    }));
  };

  componentWillUnmount() {
    this.props.stopOrdersChannel();

    this.setState({
      incomingOrders: [],
      activeOrders: []
    });
  }
  onBranchSelect = item => {
    this.setState(
      {
        branchSelect: item,
        flag: false,
        activeOrders: [],
        incomingOrders: []
      }, () => {
        if (!_.isEmpty(this.state.branchSelect)) {
          if (this.state.flag === false) {
       
            setTimeout(
              () => {
                this.props.getOrdersChannel({
                  branch_id: this.state.branchSelect.id,
                  order_type: "TAKEAWAY",
                  status: "INCOMING"
                })
            
                this.props.getOrders({
                  branch_id: this.state.branchSelect.id,
                  order_type: "TAKEAWAY",
                  status: "IN_PROGRESS,PARTIAL_READY,READY"
                });
              },

              2000
            );

            this.setState({ flag: true });

          }

         

        }

      });
  };

  deleteOrder = (id) => {
    this.props.deleteOrder({
      cart_id: id,
      branch_id: this.state.branchSelect.id,
    });
    this.setState({
      incomingOrders: this.state.incomingOrders.filter(
        order => order.id !== id
      )
    });
  }
  
  NoAccess=()=>{
    this.setState({noAccess:!this.state.noAccess});
  }
  UNSAFE_componentWillMount() {
    if (_.isEmpty(this.props.menuDishes.branches))
      this.props.getBranch(this.props.menuDishes.restaurant[0])
    if (this.state.flag === false && this.intervalId === 0) {
      setTimeout(
        () => this.onBranchSelect(this.props.menuDishes.branches[0]),
        4000
      );
    }
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
      (this.props.orders.incomingOrders &&
        prevProps.orders.incomingOrders !== this.props.orders.incomingOrders)
    ) {
      this.setState({ incomingOrders: this.props.orders.incomingOrders });
    }
    if (
      (this.props.orders.activeOrders &&
        prevProps.orders.activeOrders !== this.props.orders.activeOrders)
    ) {
      this.setState({ activeOrders: this.props.orders.activeOrders });
    }
  }
  acceptingOrder  (orderId, time)  {

    var previous_data = this.state.activeOrders;

    this.state.incomingOrders.map(order => {
      if (order.id === orderId) {
        this.props.editOrderStatus({
          cart_id: orderId,
          branch_id: this.state.branchSelect.id,
          expected_time: time,
          order_status: "IN_PROGRESS"
        });
        order.expected_time = time;
        order.order_status = "IN_PROGRESS";
        previous_data.push(order);
      }
      return null;
    });
    this.props.deleteNotification(orderId);
    this.setState({
      incomingOrders: this.state.incomingOrders.filter(
        order => order.id !== orderId
      )
    });

  };
  orderReady = (orderId, cart_item) => {
    let previous_data = this.state.activeOrders;
    this.state.activeOrders.map(order => {
      if (order.id === orderId) {
        this.props.editOrderStatus({
          cart_id: orderId,
          branch_id: this.state.branchSelect.id,
          order_status: "READY",
          cart_items: cart_item
        });
        order.order_status = "READY";
      }
      return null;
    });
    this.setState({
      activeOrders: previous_data
    });
  };
  orderPartialReady = (orderId, cart_item) => {
    let previous_data = this.state.activeOrders;
    this.state.activeOrders.map(order => {
      if (order.id === orderId) {
        this.props.editOrderStatus({
          cart_id: orderId,
          branch_id: this.state.branchSelect.id,
          order_status: "PARTIAL_READY",
          cart_items: cart_item
        });
        order.order_status = "PARTIAL_READY";
      }
      return null;
    });
    this.setState({
      activeOrders: previous_data
    });
  };
  orderPickedUp = orderId => {
    let previous_data = this.state.activeOrders;
    this.state.activeOrders.map(order => {
      if (order.id === orderId) {
        this.props.editOrderStatus({
          cart_id: orderId,
          branch_id: this.state.branchSelect.id,
          order_status: "PICKED_UP"
        });
        order.order_status = "PICKED_UP";
      }
      return null;
    });
    this.setState({
      activeOrders: previous_data
    });
  };
  componentDidMount() {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else {

      Notification.requestPermission();
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


                <CardTitle>
                  <h1>TakeAway Orders Portal</h1>
                </CardTitle>
                
                <Row>
                  <Colxx lg="12" xl="6" className="mb-4">
                    <hr className="my-2" />
                    <h4 className="d-flex justify-content-center align-items-center">
                      <strong>Incoming</strong>
                    </h4>
                    <hr className="my-2" />
                    {!_.isEmpty(this.state.incomingOrders) ? (
                      <div>

                        {this.state.incomingOrders.map((order, i) => (
                          <div key={i}>
                            <OrdersIncoming
                              incomingOrders={order}
                              acceptingOrder={this.acceptingOrder}
                              deleteOrder={this.deleteOrder}
                            />

                            <br />
                          </div>
                        ))}
                      </div>
                    ) : (
                        <div className="d-flex justify-content-center align-items-center">
                          No Incoming orders
                        </div>
                      )}
                  </Colxx>
                  <Colxx lg="12" xl="6" className="mb-4">
                    <hr className="my-2" />
                    <h4 className="d-flex justify-content-center align-items-center">
                      <strong>Active</strong>
                    </h4>
                    <hr className="my-2" />
                    {!_.isEmpty(this.state.activeOrders) ? (
                      <div>

                        {this.state.activeOrders.map((order, i) => (
                          <div key={i}>

                            <OrdersActive
                              activeOrders={order}
                              orderReady={this.orderReady}
                              orderPickedUp={this.orderPickedUp}
                              orderPartialReady={this.orderPartialReady}
                            />
                            <br />
                          </div>
                        ))}
                      </div>
                    ) : (
                        <div className="d-flex justify-content-center align-items-center">
                          No Active orders
                        </div>
                      )}
                  </Colxx>
                </Row>
              </CardBody>
            </Card>
          </Colxx>
        </Row>: <div><NoAccess ModuleName={"Order management"}
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
  getOrdersChannel,
  getServices,
  stopOrdersChannel,
  getBranch,
  getOrders,
  editOrderStatus,
  deleteOrder,
  deleteNotification
})(ordersPage);
