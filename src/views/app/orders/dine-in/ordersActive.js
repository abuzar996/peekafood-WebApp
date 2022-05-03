import React, { Component } from "react";
import { Card, CardBody, CardFooter, Button, CustomInput, Badge } from "reactstrap";
import _ from "lodash";
class OrdersActive extends Component {
  constructor(props) {
    super(props);
    this.state = { dishes: [], selectAll: false };
  }

  UNSAFE_componentWillMount() {

    if (this.state.dishes !== this.props.activeOrders.cart_items.dishes) {
      this.setState({ dishes: this.props.activeOrders.cart_items.dishes })

    }
  }
  UNSAFE_componentDidUpdate(prevProps) {
    if (prevProps.activeOrders.cart_items.dishes !== this.props.activeOrders.cart_items.dishes) {

      this.setState({ dishes: this.props.activeOrders.cart_items.dishes })
    }
  }
  onDishReady = index => e => {
    const { checked } = e.target;

    this.setState(prevState => {
      const newDishes = [...prevState.dishes];
      newDishes[index].ready = !checked;

      return { dishes: newDishes };
    });

  };
  onAllDishReady = () => {
    var tempArray = this.state.dishes.map((dish) => {

      var temp = dish;
      temp.ready = !this.state.selectAll;

      return temp
    })
    this.setState({
      dishes: tempArray,
      selectAll: !this.state.selectAll
    });


  }
  onReady = () => {

    let cart_items = {
      "id": this.props.activeOrders.cart_items.id,
      "table": this.props.activeOrders.cart_items.table,
      "dishes": this.state.dishes,
      "status": this.props.activeOrders.cart_items.status,
      "waiter": this.props.activeOrders.cart_items.waiter,
      "section": this.props.activeOrders.cart_items.section,
      "bucketID": this.props.activeOrders.cart_items.bucketID,
      "quantity": this.props.activeOrders.cart_items.quantity
    }
    this.props.orderReady(this.props.activeOrders.id, cart_items)

  }
  onPartialReady = () => {
    let cart_items = {
      "id": this.props.activeOrders.cart_items.id,
      "table": this.props.activeOrders.cart_items.table,
      "dishes": this.state.dishes,
      "status": this.props.activeOrders.cart_items.status,
      "waiter": this.props.activeOrders.cart_items.waiter,
      "section": this.props.activeOrders.cart_items.section,
      "bucketID": this.props.activeOrders.cart_items.bucketID,
      "quantity": this.props.activeOrders.cart_items.quantity

    };
    this.props.orderPartialReady(this.props.activeOrders.id, cart_items)

  }
  checkReady = () => {
    var ret = false;
    this.state.dishes.map(dish => {
      if (dish.ready === false) {
        ret = true
      }
      return ret;
    })
    return ret;
  }

  render() {
    return (
      <div>

        {!_.isEmpty(this.state.dishes) ? <Card>

          <CardBody>
            {this.props.activeOrders.order_type === "BUSINESSAPP-DINE-IN" ? <div className="d-flex justify-content-end align-items-start" ><Badge variant="secondary">Business App</Badge></div> : <div className="d-flex justify-content-end align-items-start" ><Badge variant="secondary">Customer App</Badge></div>}
            <div>

              <div>
                <div className="d-flex justify-content-between align-items-center">
                  <strong>Order Id: </strong>
                  {this.props.activeOrders.id}
                  {this.props.activeOrders.order_type === "BUSINESSAPP-DINE-IN" ? <div><strong>Waiter: </strong>
                    {this.props.activeOrders.waiter_name}</div> : <div><strong>Name: </strong>
                      {this.props.activeOrders.name}</div>}
                  <strong>Section: </strong>
                  {this.props.activeOrders.section}
                  <strong>Table: </strong>

                  {this.props.activeOrders.table_number}
                </div>

                <hr className="style-one" />

                <CustomInput
                  type="checkbox"
                  id={this.props.activeOrders.id}
                  label={<strong>Select All</strong>}
                  className="mb-1 d-flex justify-content-end"
                  checked={this.state.selectAll}
                  onClick={this.onAllDishReady}
                />

                <div>
                  {this.state.dishes.map(
                    (dish, i) => (
                      <div key={i}>
                        <div className="d-flex justify-content-between align-items-center">
                          <strong>Dish Name: </strong>
                          {dish.dishName}
                          <strong>Quantity: </strong>
                          {dish.quantity}

                          <CustomInput
                            checked={dish.ready}
                            id={i + this.props.activeOrders.id}
                            label={<strong>DishReady</strong>}
                            onClick={this.onDishReady(i)}
                            type="checkbox"
                          />

                        </div>
                        <div className="d-flex justify-content-around">
                          <strong>Subprice: </strong>
                          {dish.subPrice ? (
                            <div>{dish.subPrice.dish_sub_name}</div>
                          ) : null}

                          <strong className="ml-2">Addons: </strong>
                          {dish.addOns ? (
                            <div>
                              {dish.addOns.map((add, i) => (
                                <div key={i} className="d-flex">
                                  {add.title}-{add.name}
                                </div>
                              ))}
                            </div>
                          ) : null}

                        </div>{!_.isEmpty(dish.comments) ? <div className="d-flex">
                          <strong>Dish Instructions/Comments:</strong>
                          <div className="ml-2">{dish.comments}</div>
                        </div> : null}

                        <hr className="my-2" />
                      </div>
                    )
                  )}
                  {!_.isEmpty(this.props.activeOrders.cart_items.comments) ? <div className="d-flex justify-content-between">
                    <strong>Order Instructions:</strong>
                    <div className="ml-2">{this.props.activeOrders.cart_items.comments}</div>
                  </div> : null}

                </div>

              </div>

            </div>
          </CardBody>
          <CardFooter>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex">
                <h3 aria-hidden="true" className="iconsminds-clock" />
                <strong>
                  {Math.floor(
                    (Date.now() -
                      Date.parse(this.props.activeOrders.creation_time)) /
                    1000 /
                    60
                  )}
                </strong>
                -Min
              </div>
              <Button
                color="primary"
                disabled={
                  this.props.activeOrders.order_status === "SERVED" ||
                    this.props.activeOrders.order_status === "READY"
                    ? true
                    : false
                }
                onClick={this.onPartialReady}
              >
                Partial Ready
    </Button>
              <Button
                color="primary"
                disabled={
                  this.props.activeOrders.order_status === "READY" ||
                    this.checkReady() || this.props.activeOrders.order_status === "SERVED"
                    ? true
                    : false
                }
                onClick={this.onReady}
              >
                Ready
    </Button>
              <Button
                color="secondary"
                disabled={
                  this.props.activeOrders.order_status !== "READY" ? true : false
                }
                onClick={() =>
                  this.props.orderPickedUp(this.props.activeOrders.id)
                }
              >
                SERVED
    </Button>
              <div>
                <strong>Status: </strong>
                <div>{this.props.activeOrders.order_status}</div>
              </div>
            </div>
          </CardFooter>
        </Card> : null
        }
      </div>

    );
  }
}
export default OrdersActive;
