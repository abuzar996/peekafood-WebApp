import React, { Component } from "react";
import { Card, CardBody, CardFooter, Badge } from "reactstrap";
import _ from "lodash";

class orders extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Card>
                {!_.isEmpty(this.props.orders) ? (
                    <CardBody>
                        <div className="d-flex justify-content-end align-items-start" ><Badge variant="secondary">{this.props.orders.order_type}</Badge></div>
                        <div>

                            <div>
                                <div className="d-flex justify-content-between align-items-center">

                                    <strong>Order Id: </strong>
                                    {this.props.orders.id}
                                    {this.props.orders.order_type === "BUSINESSAPP-DINE-IN" ? <div><strong>Waiter: </strong>
                                        {this.props.orders.waiter_name}</div> : <div><strong>Name: </strong>
                                            {this.props.orders.name}</div>}

                                    <strong>Section: </strong>
                                    {this.props.orders.section}
                                    <strong>Table: </strong>

                                    {this.props.orders.table_number}


                                </div>


                                <hr className="style-one" />

                                {this.props.orders.cart_items ? (
                                    <div>
                                        {this.props.orders.cart_items.dishes.map(
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
                                        {!_.isEmpty(this.props.orders.cart_items.comments) ? <div className="d-flex justify-content-between">
                                            <strong>Order Instructions:</strong>
                                            <div className="ml-2">{this.props.orders.cart_items.comments}</div>
                                        </div> : null}
                                    </div>
                                ) : null}
                            </div>

                        </div>
                    </CardBody>) : null}
                <CardFooter>



                    <div className="d-flex justify-content-between align-items-center">
                    <strong>Total Amount: </strong>
                        <div>{this.props.orders.gross_total}</div>
                        <strong>Status: </strong>
                        <div>{this.props.orders.order_status}</div>
                    </div>



                </CardFooter>
            </Card>
        );
    }
}
export default orders;
