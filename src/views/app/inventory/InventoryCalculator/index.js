import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, Button, CardTitle, Jumbotron } from "reactstrap";
import { Colxx } from "../../../../components/common/CustomBootstrap";
import { connect } from "react-redux";
import Select from "react-select";
import NoAccess from "../../../../components/Extra/noAccessDialog";

import {
    getRestaurant,
    getDishes,
    getServices,
    calculateInventory
} from "../../../../redux/actions";


import _ from "lodash";
class Calculator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            calculationItems: [],
            access:false,
            accessmodalOpen:false,
            noAccess:false,
            services:{},
            flag: false
        };
    }
    addItem = () => {
        let obj = {
            dish_id: "",
            dish_usage: 0,

        }
        let calculationItems = this.state.calculationItems;
        calculationItems.push(obj);
        this.setState({
            ...calculationItems,
            flag: false
        });

    }
    componentDidUpdate(props)
    {
        if(this.props.services.service && props.services.service!==this.state.services)
        {
          this.setState({services:this.props.services.service})
          if(this.props.services.service["inventory_management"]===false)
          {
            
            this.NoAccess();
          }
        }
    }
  
    NoAccess=()=>{
      this.setState({noAccess:!this.state.noAccess});
    }
    componentDidMount() {
       
        if (_.isEmpty(this.props.menuDishes.dishes)) {
            setTimeout(
                () => this.props.getDishes(this.props.menuDishes.restaurant[0].id),
                2200
            );
        }

    }
    _onItemSelect = (id, value) => {
        const setItem = this.state.calculationItems.map((n, sidx) => {
            if (id !== sidx) return n;
            return { ...n, dish_id: value.id };
        });
        this.setState({ calculationItems: setItem });
    }
    handleRemoveItem = (id) => {
        this.setState({
            calculationItems: this.state.calculationItems.filter((s, sidx) => id !== sidx)
        });
    }
    _onDishUsageChange = (id) => e => {
        let calculationItems = this.state.calculationItems;
        
        let newCalculationItems = this.state.calculationItems[id];
        newCalculationItems.dish_usage = parseInt(e.target.value);
        calculationItems[id] = newCalculationItems;
        
        this.setState({ ...calculationItems });
    }
    render() {
        return (
            <Fragment>
                {this.props.menuDishes.loading === true ? (
                    <div className="loading"></div>
                ) : null}
                     {this.state.services["inventory_management"]===true?
                <Row>
                    <Colxx xxs="12" className="mb-4">
                        <Card>
                            <CardBody>
                                <CardTitle>
                                    <h1>Estimation Calculator</h1>
                                </CardTitle>
                                <Row>
                                    <Colxx lg="12" xl="6" className="mb-4">
                                        <Card>
                                            <CardBody>
                                                <Button
                                                    className="float-right mb-4"
                                                    color="primary"
                                                    outline
                                                    disabled={_.isEmpty(this.props.menuDishes.dishes)}
                                                    
                                                    onClick={this.addItem}

                                                >
                                                    Add Item
                                                </Button>
                                                <br />
                                                <br />
                                                <br />
                                                <div className="mt-4">
                                                    {this.state.calculationItems.map((item, i) => <div key={i} className="d-flex justify-content-center align-self-stretch flex-wrap mt-2">
                                                        <div className="flex-fill">
                                                            <Select
                                                                id={i}
                                                                className="react-select"
                                                                classNamePrefix="react-select"
                                                                name="form-field-name"
                                                                placeholder={"Select..."}
                                                                options={this.props.menuDishes.dishes}
                                                                getOptionLabel={option => `${option.dish_name}`}
                                                                getOptionValue={option => `${option.id}`}
                                                                onChange={value => this._onItemSelect(i, value)}
                                                            />
                                                        </div>
                                                        <input style={{ width: "85px" }} id={i} type="number" value={item.dish_usage} onChange={this._onDishUsageChange(i)} />

                                                        <Button id={i} color="link" onClick={() => this.handleRemoveItem(i)}>
                                                            X
                                                        </Button>

                                                    </div>)}
                                                </div>
                                                {!_.isEmpty(this.state.calculationItems) ?
                                                    <Button
                                                        className="float-right mt-4"
                                                        color="secondary"
                                                        onClick={() => { this.setState({ flag: true }); this.props.calculateInventory({ "items": this.state.calculationItems }) }}
                                                    >
                                                        Calculate
                                                </Button> : null}
                                            </CardBody>
                                        </Card>

                                    </Colxx>
                                    {this.state.flag === true && !_.isEmpty(this.state.calculationItems) ?
                                        <Colxx lg="12" xl="6" className="mb-4">
                                            <Card>
                                                <CardBody>
                                                    <Jumbotron fluid >
                                                        <p className="lead">Grocery needed for the production of respected dishes</p>
                                                        {this.props.inventory.inventoryCalculation.map((val, i) =>
                                                            (<div key={i}>
                                                                <div id={i} className="d-flex justify-content-around align-items-center">
                                                                    <p>{val.item_name}</p>
                                                                    <p>{val.estimate}</p>
                                                                    <p>{val.unit}</p>
                                                                </div>
                                                                <hr className="my-2" />

                                                            </div>))

                                                        }
                                                    </Jumbotron>
                                                </CardBody></Card></Colxx> : null}

                                </Row>
                            </CardBody>
                        </Card>
                    </Colxx>
                </Row>: <div><NoAccess ModuleName={"Inventory management"}
                modalOpen = {this.state.noAccess}
                toggleModal = { this.NoAccess }/></div>}
            </Fragment>
        );
    }
}
const mapStateToProps = ({ menuDishes, inventory,services}) => {
    return { menuDishes, inventory,services };
};
export default connect(mapStateToProps, {
    getRestaurant,
    getDishes,
    getServices,
    calculateInventory
})(Calculator);
