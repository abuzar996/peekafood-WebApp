import React, { Component } from "react";
import axios from "axios";
import _ from 'lodash';
import { BASE_URL } from "../../../src/API";
import { Colxx } from "../../components/common/CustomBootstrap";
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

import Dishes from "./dish"
class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            isOpenCategory: false,
            dishes: [],
            selectedDishes: [],
            categorySelect: {}
        };
    }
    componentDidMount() {

        axios.get(`${BASE_URL}/api/restaurants/dishes/`, {
            params: {
                restaurant_id: this.props.match.params.id
            }
        })
            .then(res => {
                const dishes = res.data;
                this.setState({ dishes });
                this.setState({ selectedDishes: dishes })
            })
        axios.get(`${BASE_URL}/api/restaurants/category/`, {
            params: {
                restaurant_id: this.props.match.params.id
            }
        })
            .then(res => {
                const categories = res.data;
                this.setState({ categories });
            })

    }
    toggleCategory = () => {
        this.setState(prevState => ({
            isOpenCategory: !prevState.isOpenCategory
        }));
    }
    onCategorySelect = (item) => {
        this.setState({
            categorySelect: item
        }, () => {
            const selectedDishes = this.state.dishes.filter((dish) => dish.category_id === item.name);
            this.setState({ selectedDishes })

        })

    }
    render() {
        return (<div>
            {_.isEmpty(this.state.dishes) || _.isEmpty(this.state.categories) ? <div className='loading'></div> :
                <Row>
                    <Colxx xxs="12" className="mb-4">
                        <Card>

                            <CardBody>
                                <CardTitle >
                                    <img className='d-flex justify-content-center align-items-center' alt='..' src="/assets/img/logo-black.svg" style={{ width: '90px' }}></img>
                                    <h1 className='d-flex justify-content-center align-items-center' style={{ marginTop: '25px' }}>{this.props.match.params.restaurant} Menu</h1>
                                    <div className="d-flex justify-content-center align-items-center">

                                        <ButtonDropdown
                                            className="mr-1 mb-1"
                                            isOpen={this.state.isOpenCategory}
                                            toggle={this.toggleCategory}
                                        >
                                            <DropdownToggle caret outline color="primary">
                                                {!_.isEmpty(this.state.categorySelect)
                                                    ? this.state.categorySelect.name
                                                    : "Select Category"}
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                {this.state.categories.map(data => (
                                                    <DropdownItem
                                                        key={data.id}
                                                        onClick={() => this.onCategorySelect(data)}
                                                    >
                                                        {data.name}
                                                    </DropdownItem>
                                                ))}
                                            </DropdownMenu>
                                        </ButtonDropdown>
                                    </div>
                                </CardTitle>

                                <Row>
                                    <Colxx xxs="12" className="mb-4">
                                        <hr className="my-2" />
                                        {!_.isEmpty(this.state.selectedDishes) ? <div>
                                            {this.state.selectedDishes.map((dish, i) => (
                                                <div key={dish.id} className='mt-4'>

                                                    <Dishes
                                                        dish={dish}

                                                    />

                                                    <br />
                                                </div>
                                            ))}
                                        </div> : null}
                                    </Colxx></Row>
                            </CardBody>
                        </Card>


                    </Colxx>
                </Row>}
        </div>)
    }


}
export default (Menu);