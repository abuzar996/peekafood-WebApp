import React, { Component } from "react";
import { Button, Card, CardBody, CardFooter, Input } from "reactstrap";
import _ from "lodash";
class OrdersIncoming extends Component {
  constructor(props) {
    super(props);
    this.state = { time: 0, cartTime: 0 };
  }

  UNSAFE_componentWillMount() {

    if (!_.isEmpty(this.props.incomingOrders)) {
      this.setState({
        cartTime: Math.floor(
          (Date.now() -
            Date.parse(this.props.incomingOrders.creation_time)) /
          1000 /
          60
        )
      }, () => {

        if (this.state.cartTime < 1) {

          this.showNotification()
        }
      })

    }
  }
  showNotification = () => {

    var options = {
      body: `There is a new order with Order ID:${this.props.incomingOrders.id}`,
      icon: `../../../../assets/css/sass/img/login-balloon.jpg`,
      sound: "../../../../assets/css/sass/alert.mp3"
    };


    let audio = new Audio('/assets/alert.mp3');
    //new Notification("New Incoming order", options);
    // NotificationManager.info(
    //   `There is a new order with Order ID:${this.props.incomingOrders.id}`,
    //   "New Order Incoming",
    //   7000,
    //   null,
    //   null
    // );
    Notification.requestPermission(function (result) {
      if (result === 'granted') {
        try {
          navigator.serviceWorker.ready.then(function (registration) {
            registration.showNotification("New Incoming order @ Delivery", options);
          });
        }
        catch (e) {
          console.log("Error showing notifications");
        }

      }
    });
    audio.play();
  }
  acceptOrder = orderId => {
    this.props.acceptingOrder(orderId, this.state.time);
    var content = document.getElementById(this.props.incomingOrders.id);
    var pri = document.getElementById('ifmcontentstoprint').contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
  };
  render() {
    return (
      <Card> {/*assign id*/}
        <iframe title=" " id="ifmcontentstoprint" style={{
                        height: '0px',
                        width: '0px',
                        position: 'absolute'
                    }}></iframe> 
        <CardBody id={this.props.incomingOrders.id}>
          <div>
            {!_.isEmpty(this.props.incomingOrders) ? (
              <div>
                <div className="d-flex justify-content-between align-items-center">

                  <strong>Order Id: </strong>
                  {this.props.incomingOrders.id}
                  <strong>Address: </strong>
                  {this.props.incomingOrders.delivery_address}
                </div>
                <div className="d-flex justify-content-between align-items-center">

                  <strong>Name: </strong>
                  {this.props.incomingOrders.name}
                  <strong>Contact: </strong>
                  {this.props.incomingOrders.contact_number}
                </div>
                <hr className="style-one" />

                {this.props.incomingOrders.cart_items ? (
                  <div>
                    {this.props.incomingOrders.cart_items.dishes.map(
                      (dish, i) => (
                        <div key={i}>
                          <div className="d-flex justify-content-between align-items-center">
                            <strong>Dish Name: </strong>
                            {dish.dishName}
                            <strong>Quantity: </strong>
                            {dish.quantity}
                          </div>
                          <div className="d-flex justify-content-between">
                            <strong>Subprice: </strong>
                            {dish.subPrice ? (
                              <div>{dish.subPrice.dish_sub_name}</div>
                            ) : null}

                            <strong>Addons: </strong>
                            {dish.addOns ? (
                              <div>
                                {dish.addOns.map((add, i) => (
                                  <div key={i} className="d-flex">
                                    {add.title}-{add.name}
                                  </div>
                                ))}
                              </div>
                            ) : null}
                          </div>
                          {!_.isEmpty(dish.comments) ? <div className="d-flex">
                            <strong>Dish Instructions/Comments:</strong>
                            <div className="ml-2">{dish.comments}</div>
                          </div> : null}

                          <hr className="my-2" />
                        </div>
                      )
                    )}
                    {!_.isEmpty(this.props.incomingOrders.cart_items.comments) ? <div className="d-flex justify-content-between">
                      <strong>Order Instructions:</strong>
                      <div className="ml-2">{this.props.incomingOrders.cart_items.comments}</div>
                    </div> : null}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </CardBody>
        <CardFooter>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-start align-items-center">
              <strong>Expected Time:</strong>
              <Input
                type="number"
                className="w-15"
                value={this.state.time}
                onChange={(e) => this.setState({ time: e.target.value })}
              />
              mins
            </div>
            <div className="d-flex">
              <strong>Status: </strong>
              <div>{this.props.incomingOrders.order_status}</div>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">

            <div className="d-flex">
              <h3  aria-hidden="true"  className="iconsminds-clock" />
              <strong>
                {Math.floor(
                  (Date.now() -
                    Date.parse(this.props.incomingOrders.creation_time)) /
                  1000 /
                  60
                )}
              </strong>
              -Minutes
            </div>


            <Button
              color="danger"
              onClick={e =>
                this.props.deleteOrder(this.props.incomingOrders.id)
              }
            >
              Cancel
            </Button>
            <Button
              color="success"
              disabled={this.state.time === 0 || _.isEmpty(this.state.time) ? true : false}
              onClick={e =>
                this.acceptOrder(this.props.incomingOrders.id)
              }
              title="Enter Expected Time to Enable"
              data-toggle="popover"
              data-placement="top"
              data-content="Content"
            >
              Accept
            </Button>



          </div>

        </CardFooter>
      </Card>
    );
  }
}
export default OrdersIncoming;
