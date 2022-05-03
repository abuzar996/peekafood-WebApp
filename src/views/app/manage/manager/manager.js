import React, { Component, Fragment } from "react";
import { Row, Card, CardBody } from "reactstrap";
import { Colxx } from "../../../../components/common/CustomBootstrap";
import { connect } from "react-redux";
import {
  getRestaurant,
  getBranch,
  getManager,
  addManager,
  editManager,
  deleteManager
} from "../../../../redux/actions";
import _ from "lodash";
import ManagerTable from "./manager_table";

class Manager extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  UNSAFE_componentWillMount() {
    if (_.isEmpty(this.props.menuDishes.branches))
      this.props.getBranch(this.props.menuDishes.restaurant[0])
  }
  componentDidMount() {
    // this.props.getRestaurant();
    //if (_.isEmpty(this.props.menuDishes.branches)) {
    setTimeout(() => this.props.getManager(), 2200);
    //}
  }
  render() {
    return (
      <Fragment>
        {this.props.menuDishes.loading === true ? (
          <div className="loading"></div>
        ) : null}
        <Row>
          <Colxx xxs="12" className="mb-4">
            <Card>
              <CardBody className="pointing">
                {!_.isEmpty(this.props.menuDishes.restaurant[0]) ? (
                    <Colxx xxs="12">
                      <ManagerTable
                        data={this.props.manage.managers}
                        restaurant={this.props.menuDishes.restaurant[0]}
                        addManager={this.props.addManager}
                        editManager={this.props.editManager}
                        deleteManager={this.props.deleteManager}
                        branches={this.props.menuDishes.branches}
                      />
                    </Colxx>
                  ) : null}
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
const mapStateToProps = ({ menuDishes, manage }) => {
  return { menuDishes, manage };
};
export default connect(mapStateToProps, {
  getRestaurant,
  getBranch,
  getManager,
  addManager,
  editManager,
  deleteManager
})(Manager);
