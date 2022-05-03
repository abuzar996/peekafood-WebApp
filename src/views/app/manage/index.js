import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const ManageBranch = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./branch/branch")
);
const ManageWaiter = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./waiter/waiter")
);
const ManageFeedback = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./feedback")
);
const ManagerManager = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./manager/manager")
);
// const ManageBranch = React.lazy(() =>
//   import(/* webpackChunkName: "dashboard-content" */ "./content")
// );
// const RestaurantDefault = React.lazy(() =>
//   import(/* webpackChunkName: "dashboard-analytics" */ "./analytics")
// );
// const EcommerceDefault = React.lazy(() =>
//   import(/* webpackChunkName: "dashboard-ecommerce" */ "./ecommerce")
// );

const Manage = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect
        exact
        from={`${match.url}/`}
        to={`${match.url}/manage-waiter`}
      />
      <Redirect
        exact
        from={`${match.url}/survey`}
        to={`${match.url}/survey/manage-feedback`}
      />
      <Route
        path={`${match.url}/manage-branch`}
        render={props => <ManageBranch {...props} />}
      />
      <Route
        path={`${match.url}/manage-manager`}
        render={props => <ManagerManager {...props} />}
      />
      <Route
        path={`${match.url}/manage-waiter`}
        render={props => <ManageWaiter {...props} />}
      />
      <Route
        path={`${match.url}/survey/manage-feedback`}
        render={props => <ManageFeedback {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Manage;
