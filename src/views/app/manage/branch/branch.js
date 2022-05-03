import React, { Component, Fragment } from "react";
import { Row, Card, CardBody } from "reactstrap";
import { Colxx } from "../../../../components/common/CustomBootstrap";
import { connect } from "react-redux";
import {
  getRestaurant,
  getBranch,
  addBranch,
  editBranch,
  deleteBranch
} from "../../../../redux/actions";
import BranchTable from "./branch_table";
import _ from "lodash";

class Branch extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  UNSAFE_componentWillMount() {
    if (_.isEmpty(this.props.menuDishes.branches))
      this.props.getBranch(this.props.menuDishes.restaurant[0])
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
                <Colxx xxs="12">
                  <BranchTable
                    data={this.props.menuDishes.branches}
                    addBranch={this.props.addBranch}
                    editBranch={this.props.editBranch}
                    deleteBranch={this.props.deleteBranch}
                    restaurant={this.props.menuDishes.restaurant[0]}
                  />
                </Colxx>
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
  addBranch,
  editBranch,
  deleteBranch
})(Branch);
