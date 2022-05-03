import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, Button, CardTitle } from "reactstrap";
import { Colxx } from "../../../../components/common/CustomBootstrap";
import { connect } from "react-redux";
import {
  getServices,
  getRestaurant,
  getBranch,
  getCategories,
  addCategory,
  editCategory,
  deleteCategory,
  editBranch
} from "../../../../redux/actions";
import _ from "lodash";
import ReactTableWithScrollableCard from "./category_table";
import AddNewModal from "./addmodal";
import NoAccess from "../../../../components/Extra/noAccessDialog";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenBranch: false,
      access:false,
      accessmodalOpen:false,
      noAccess:false,
      services:{},
      branchSelect: {},
      addmodalOpen: false,
      editmodalOpen: false,
      taxmodalOpen: false,
      flag: false
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
  edittoggleModal = () => {
    this.setState({
      editmodalOpen: !this.state.editmodalOpen
    });
  };
  taxtoggleModal = () => {
    this.setState({
      taxmodalOpen: !this.state.taxmodalOpen
    });
  };
  onBranchSelect = item => {
    this.setState(
      {
        branchSelect: item
      }
    );
  };
  componentDidUpdate(props)
  {
    if(this.props.services.service && props.services.service!==this.state.services)
    {
      //
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
  componentDidMount() {

    if (_.isEmpty(this.props.categories))
      setTimeout(
        () => this.props.getCategories(this.props.menuDishes.restaurant[0].id),
        2200
      );
  }

  render() {
    return (
      <Fragment>
         
        <AddNewModal
          modalOpen={this.state.addmodalOpen}
          toggleModal={this.addtoggleModal}
          restaurant={this.props.menuDishes.restaurant[0]}
          addCategory={this.props.addCategory}
      />
       {this.state.services["digital_menu_management"]===true?
        <Row>
          <Colxx xxs="12" className="mb-4">
            <Card>
              <CardBody>
                <CardTitle>
                  <h1>Setup Categories</h1>
                </CardTitle>
                {this.props.loading === true ? (
                  <div className="loading"></div>
                ) : null}
                <Row>
                  <Colxx xxs="12">
                    <Button
                      color="primary"
                      size="lg"
                      className="float-right"
                      disabled={
                        _.isEmpty(this.props.menuDishes.restaurant[0]) ? true : false
                      }
                      onClick={this.addtoggleModal}
                    >
                      Add Category
                    </Button>
                    <div className="pointing">
                      <ReactTableWithScrollableCard
                        modalOpen={this.state.editmodalOpen}
                        toggleModal={this.edittoggleModal}
                        data={this.props.menuDishes.categories}
                        editCategory={this.props.editCategory}
                        deleteCategory={this.props.deleteCategory}
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
const mapStateToProps = ({ menuDishes,services }) => {
  return ({menuDishes,services});
};
export default connect(mapStateToProps, {
  getRestaurant,
  getBranch,
  addCategory,
  editCategory,
  deleteCategory,
  getCategories,
  editBranch,
   getServices,
})(Menu);
