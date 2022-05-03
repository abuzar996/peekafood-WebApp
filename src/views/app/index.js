import React, { Component, Suspense } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import AppLayout from "../../layout/AppLayout";

const Orders = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ "./orders")
);

const Dashboards = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ "./dashboards")
);
const Manage = React.lazy(() =>
  import(/* webpackChunkName: "ui" */ "./manage")
);
const MenuDishes = React.lazy(() =>
  import(/* webpackChunkName: "menu" */ "./menu/dishes")
);
const MenuCategories = React.lazy(() =>
  import(/* webpackChunkName: "menu" */ "./menu/categories")
);
const InventoryManage = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ "./inventory")
);
const BlankPage = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ "./blank-page")
);

class App extends Component {
  render() {
    const { match } = this.props;

    return (
      <AppLayout>
        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              <Redirect
                exact
                from={`${match.url}/`}
                to={`${match.url}/dashboards`}
              />
              <Route
                path={`${match.url}/orders`}
                render={props => <Orders {...props} />}
              />
              <Route
                path={`${match.url}/dashboards`}
                render={props => <Dashboards {...props} />}
              />
              <Route
                path={`${match.url}/menu/dishes`}
                render={props => <MenuDishes {...props} />}
              />
              <Route
                path={`${match.url}/menu/categories`}
                render={props => <MenuCategories {...props} />}
              />
              <Route
                path={`${match.url}/manage`}
                render={props => <Manage {...props} />}
              />
              <Route
                path={`${match.url}/manage-inventory`}
                render={props => <InventoryManage {...props} />}
              />
              <Route
                path={`${match.url}/billing-licensing`}
                render={props => <BlankPage {...props} />}
              />

              <Route
                path={`${match.url}/about`}
                render={props => <BlankPage {...props} />}
              />
              <Redirect to="/error" />
            </Switch>
          </Suspense>
        </div>
      </AppLayout>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
