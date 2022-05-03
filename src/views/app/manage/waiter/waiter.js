import React, { Component, Fragment } from "react";
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
import { connect } from "react-redux";
import {
  getRestaurant,
  getBranch,
  getWaiter,
  addWaiter,
  editWaiter,
  deleteWaiter
} from "../../../../redux/actions";
import WaiterTable from "./waiter_table";
import _ from "lodash";

class Waiter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenBranch: false,
      branchSelect: {},
      flagwaiter: false
    };
  }
  toggleRestaurant = () => {
    this.setState(prevState => ({
      isOpenRestaurant: !prevState.isOpenRestaurant
    }));
  };
  toggleBranch = () => {
    this.setState(prevState => ({
      isOpenBranch: !prevState.isOpenBranch
    }));
  };
  UNSAFE_componentWillMount() {
    if (_.isEmpty(this.props.menuDishes.branches))
      this.props.getBranch(this.props.menuDishes.restaurant[0])
  }
  componentDidMount() {
    if (_.isEmpty(this.state.branchSelect))
      setTimeout(
        () => this.onBranchSelect(this.props.menuDishes.branches[0]),
        2200
      );
  }

  onBranchSelect = item => {
    this.setState(
      {
        branchSelect: item
      },
      () => {
        if (!_.isEmpty(this.state.branchSelect)) {
          if (this.props.getWaiter(this.state.branchSelect.id)) {
            this.setState({ flagwaiter: true });
          }
        }
      }
    );
  };
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12" className="mb-4">
            <Card>
              <CardBody>
                <div className="float-right float-none-xs">
                  <ButtonDropdown
                    className="mr-1 mb-4"
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
                  <h1>Branch Servers</h1>
                </CardTitle>
                <br />
                {this.state.flagwaiter === true ? (
                  <Colxx xxs="12">
                    <div className="pointing">
                      <WaiterTable
                        waiters={this.props.manage.waiters}
                        addWaiter={this.props.addWaiter}
                        branch={this.state.branchSelect}
                        editWaiter={this.props.editWaiter}
                        deleteWaiter={this.props.deleteWaiter}
                        restaurant={this.props.menuDishes.restaurant[0]}
                      />
                    </div>
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
  getWaiter,
  addWaiter,
  editWaiter,
  deleteWaiter
})(Waiter);
