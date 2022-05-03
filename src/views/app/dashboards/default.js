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
import { Colxx } from "../../../components/common/CustomBootstrap";
// import IconCardsCarousel from "../../../containers/dashboards/IconCardsCarousel";
// import RecentOrders from "../../../containers/dashboards/RecentOrders";
// import Logs from "../../../containers/dashboards/Logs";
// import Tickets from "../../../containers/dashboards/Tickets";
// import Calendar from "../../../containers/dashboards/Calendar";
// import BestSellers from "../../../containers/dashboards/BestSellers";
// import ProfileStatuses from "../../../containers/dashboards/ProfileStatuses";
// import GradientCardContainer from "../../../containers/dashboards/GradientCardContainer";
// import Cakes from "../../../containers/dashboards/Cakes";
// import GradientWithRadialProgressCard from "../../../components/cards/GradientWithRadialProgressCard";
// import SortableStaticticsRow from "../../../containers/dashboards/SortableStaticticsRow";
// import AdvancedSearch from "../../../containers/dashboards/AdvancedSearch";
// import SmallLineCharts from "../../../containers/dashboards/SmallLineCharts";
// import SalesChartCard from "../../../containers/dashboards/SalesChartCard";
// import ProductCategoriesPolarArea from "../../../containers/dashboards/ProductCategoriesPolarArea";
// import WebsiteVisitsChartCard from "../../../containers/dashboards/WebsiteVisitsChartCard";
// import ConversionRatesChartCard from "../../../containers/dashboards/ConversionRatesChartCard";
import TopRatedItems, {
  LeastRatedItem
} from "../../../containers/dashboards/TopRatedItems";
import FeedbackTable from "../../../containers/dashboards/feedback_table";
import {
  getRestaurant,
  getBranch,
  getTopSoldItems,
  getLeastSoldItems,
  getFeedbackSentiments
} from "../../../redux/actions";
import { connect } from "react-redux";
import _ from "lodash";

class DefaultDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenBranch: false,
      branchSelect: {},
      flag: false
    };
  }
  componentDidMount(){
    var obj1={a:7,b:8};
    obj1.c=7
    console.log(obj1)
  }
  toggleBranch = () => {
    this.setState(prevState => ({
      isOpenBranch: !prevState.isOpenBranch
    }));
  };
  onBranchSelect = item => {
    this.setState(
      {
        branchSelect: item
      },
      () => {
        if (!_.isEmpty(this.props.menuDishes.branches) && this.state.flag === false) {

          this.getTopSoldItems(3);
          this.getLeastSoldItems(3);
          this.props.getFeedbackSentiments(this.state.branchSelect.id);
          this.setState({ flag: true });
        }
      }
    );
  };
  getTopSoldItems = number => {
    let obj = {
      branch_id: this.state.branchSelect.id,
      count: number
    };
    this.props.getTopSoldItems(obj);
  };
  getLeastSoldItems = number => {
    let obj = {
      branch_id: this.state.branchSelect.id,
      count: number
    };
    this.props.getLeastSoldItems(obj);
  };
  UNSAFE_componentWillMount() {
    
    if (_.isEmpty(this.props.menuDishes.branches))
      this.props.getBranch(this.props.menuDishes.restaurant[0])
  }
  componentDidUpdate() {
    if (_.isEmpty(this.state.branchSelect))
      setTimeout(
        () => this.onBranchSelect(this.props.menuDishes.branches[0]),
        2200
      );
  }

  render() {
    return (
      <Fragment>
        {this.props.dashboard.loading === true ? (
          <div className="loading" />
        ) : null}
        <Row>
          <Colxx xxs="12" className="mb-4">
            <Card>
              <CardBody>
                <div>
                  <div className="btn-group float-right float-none-xs">
                    {/* {this.props.menuDishes.branches[0]
                      ? this.onBranchSelect(this.props.menuDishes.branches[0])
                      : null} */}
                    <ButtonDropdown
                      className="mr-1 mb-1"
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
                    <h1>Analytics Dashboard</h1>
                  </CardTitle>
                </div>

                {this.state.flag === true ? (
                  <div>
                    <Row>
                      <Colxx lg="12" xl="6" className="mb-4">
                        <TopRatedItems
                          topDishes={this.props.dashboard.topDishes}
                          getTopDishes={this.getTopSoldItems}
                        />
                      </Colxx>

                      <Colxx lg="12" xl="6" className="mb-4">
                        <LeastRatedItem
                          leastDishes={this.props.dashboard.leastDishes}
                          getLeastDishes={this.getLeastSoldItems}
                        />
                      </Colxx>
                    </Row>
                    <Row>
                      <Colxx xxs="12" className="mb-4">
                        <FeedbackTable
                          feedbacks={this.props.dashboard.feedbackSentiments}
                        />
                      </Colxx>
                    </Row>
                  </div>
                ) : null}
              </CardBody>
            </Card>
          </Colxx>
        </Row>

        {/* <Row>
          <Colxx lg="12" xl="6">
            <IconCardsCarousel />
            <Row>
              <Colxx md="12" className="mb-4">
                <SalesChartCard />
              </Colxx>
            </Row>
          </Colxx>
          <Colxx lg="12" xl="6" className="mb-4">
            <RecentOrders />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="4" md="12" className="mb-4">
            <ProductCategoriesPolarArea chartClass="dashboard-donut-chart" />
          </Colxx>
          <Colxx lg="4" md="6" className="mb-4">
            <Logs />
          </Colxx>
          <Colxx lg="4" md="6" className="mb-4">
            <Tickets />
          </Colxx>
        </Row>
        <Row>
          <Colxx xl="6" lg="12" className="mb-4">
            <Calendar />
          </Colxx>
          <Colxx xl="6" lg="12" className="mb-4">
            <BestSellers />
          </Colxx>
        </Row>
        <Row>
          <Colxx sm="12" lg="4" className="mb-4">
            <ProfileStatuses />
          </Colxx>
          <Colxx md="6" lg="4" className="mb-4">
            <GradientCardContainer />
          </Colxx>
          <Colxx md="6" lg="4" className="mb-4">
            <Cakes />
          </Colxx>
        </Row>
        <SortableStaticticsRow messages={messages} />
        <Row>
          <Colxx sm="12" md="6" className="mb-4">
            <WebsiteVisitsChartCard />
          </Colxx>
          <Colxx sm="12" md="6" className="mb-4">
            <ConversionRatesChartCard />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" md="6" xl="4">
            <Row>
              <Colxx lg="4" xl="12" className="mb-4">
                <GradientWithRadialProgressCard
                  icon="iconsminds-clock"
                  title={`5 ${messages['dashboards.files']}`}
                  detail={messages['dashboards.pending-for-print']}
                  percent={(5 * 100) / 12}
                  progressText="5/12"
                />
              </Colxx>
              <Colxx lg="4" xl="12" className="mb-4">
                <GradientWithRadialProgressCard
                  icon="iconsminds-male"
                  title={`4 ${messages['dashboards.orders']}`}
                  detail={messages['dashboards.on-approval-process']}
                  percent={(4 * 100) / 6}
                  progressText="4/6"
                />
              </Colxx>
              <Colxx lg="4" xl="12" className="mb-4">
                <GradientWithRadialProgressCard
                  icon="iconsminds-bell"
                  title={`8 ${messages['dashboards.alerts']}`}
                  detail={messages['dashboards.waiting-for-notice']}
                  percent={(8 * 100) / 10}
                  progressText="8/10"
                />
              </Colxx>
            </Row>
          </Colxx>
          <Colxx lg="6" md="6" xl="4" sm="12" className="mb-4">
            <AdvancedSearch messages={messages} />
          </Colxx>
          <Colxx lg="6" xl="4" className="mb-4">
            <SmallLineCharts />
            <TopRatedItems />
          </Colxx>
        </Row> */}
      </Fragment>
    );
  }
}
const mapStateToProps = ({ menuDishes, dashboard }) => {
  return { menuDishes, dashboard };
};
export default connect(mapStateToProps, {
  getRestaurant,
  getBranch,
  getTopSoldItems,
  getLeastSoldItems,
  getFeedbackSentiments
})(DefaultDashboard);
