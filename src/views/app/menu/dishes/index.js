import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, Button, CardTitle } from "reactstrap";
import { Colxx } from "../../../../components/common/CustomBootstrap";
import ReactTableWithScrollableCard from "./menu_table";
import NoAccess from "../../../../components/Extra/noAccessDialog";
import { connect } from "react-redux";

import {
  
  getServices,
  getRestaurant,
  getBranch,
  getDishes,
  getCategories,
  addDish,
  editDish,
  deleteDish,
  addCategory,
  editBranch,
  getInventory,
} from "../../../../redux/actions";
import AddNewModal from "./addmodal";
import StaticMenuModal from "./staticmenumodal";

import _ from "lodash";
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenBranch: false,
      access:false,
      accessmodalOpen:false,
      noAccess:false,
      branchSelect: {},
      services:{},
      addmodalOpen: false,
      editmodalOpen: false,
      taxmodalOpen: false,
      staticmodalOpen: false,
      allInventory: [{
        id: 1,
        inventory_id: 2,
        item_name: "fish",
        quantity: 123,
        unit: "Weight(kg)"
      }, {
        id: 1,
        inventory_id: 2,
        item_name: "potato",
        quantity: 12,
        unit: "Pieces"
      }]
    };
  }
  toggleBranch = () => {
    this.setState(prevState => ({
      isOpenBranch: !prevState.isOpenBranch
    }));
  };
  addtoggleModal = () => {

    this.setState({
      addmodalOpen: !this.state.addmodalOpen
    });
  };
 

  toggleStaticModal = () => {
    this.setState({
      staticmodalOpen: !this.state.staticmodalOpen
    });
  };
  edittoggleModal = () => {
    this.setState({
      editmodalOpen: !this.state.editmodalOpen
    });
  };
  componentDidMount() {
    
    //if (_.isEmpty(this.props.restaurant[0])) this.props.getRestaurant();
    
    if (_.isEmpty(this.props.menuDishes.categories))
      setTimeout(() => {

        this.props.getCategories(this.props.menuDishes.restaurant[0].id);

      }, 2200);
    if (_.isEmpty(this.props.menuDishes.dishes))
      setTimeout(() => {
        this.props.getDishes(this.props.menuDishes.restaurant[0].id);
      }, 2200);
    setTimeout(() => {
      this.props.getInventory({ restaurant_id: this.props.menuDishes.restaurant[0].id })
    }, 2200);
  }
  componentDidUpdate(props)
  {
    if(this.props.services.service && props.services.service!==this.state.services)
    {
      console.log(this.props.menuDishes);
      this.setState({services:this.props.services.service})
      if(this.props.services.service["digital_menu_management"]===false)
      {
        
        this.NoAccess();
      }
    }
  }
  NoAccess=()=>{
    this.setState({noAccess:!this.state.noAccess});
  }
  render() {
    return (
      <Fragment>
        
        <AddNewModal
          modalOpen={this.state.addmodalOpen}
          toggleModal={this.addtoggleModal}
          addDish={this.props.addDish}
          categories={this.props.menuDishes.categories}
          branches={this.props.menuDishes.branches}
          restaurant={this.props.menuDishes.restaurant[0]}
          allInventory={this.props.inventory.inventoryItems}
        />
        <StaticMenuModal modalOpen={this.state.staticmodalOpen} toggleModal={this.toggleStaticModal} restaurant={this.props.menuDishes.restaurant[0]} />
        {this.state.services["digital_menu_management"]===true?
        <Row>
          <Colxx xxs="12" className="mb-4">
            <Card>
              <CardBody>
                <CardTitle>
                  <h1>Setup Menu</h1>
                </CardTitle>
                {this.props.loading === true ? (
                  <div className="loading"></div>
                ) : null}
                <Row>
                  <Colxx xxs="12">
                    <Button
                      color="primary"
                      size="lg"
                      outline
                      disabled={
                        _.isEmpty(this.props.menuDishes.restaurant[0]) ? true : false
                      }
                      onClick={this.toggleStaticModal}
                    >
                      Static Menu
                    </Button>
                    <Button
                      color="primary"
                      size="lg"
                      className="float-right"
                      disabled={
                        _.isEmpty(this.props.menuDishes.restaurant[0]) ? true : false
                      }
                      onClick={this.addtoggleModal}
                    >
                      Add Dish
                    </Button>
                  
                    <div className="pointing">
                      <ReactTableWithScrollableCard
                        modalOpen={this.state.editmodalOpen}
                        toggleModal={this.edittoggleModal}
                        data={this.props.menuDishes.dishes}
                        categories={this.props.menuDishes.categories}
                        branch={this.state.branchSelect}
                        editDish={this.props.editDish}
                        deleteDish={this.props.deleteDish}
                        branches={this.props.menuDishes.branches}
                        restaurant={this.props.menuDishes.restaurant[0]}
                        allInventory={this.props.inventory.inventoryItems}
                        
                      />
                    </div>
                  </Colxx>
                </Row>
              </CardBody>
            </Card>
          </Colxx>
        </Row>: <div><NoAccess ModuleName={"Menu management"}
                modalOpen = {this.state.noAccess}
                toggleModal = { this.NoAccess }/></div>}
      </Fragment>
    );
  }
}
const mapStateToProps = ({ menuDishes, inventory,services }) => {
  return { menuDishes, inventory ,services};
};
export default connect(mapStateToProps, {
  getRestaurant,
  getBranch,
  getDishes,
  addCategory,
  getCategories,
  addDish,
  editDish,
  deleteDish,
  editBranch,
  getInventory,
  getServices,
})(Menu);
