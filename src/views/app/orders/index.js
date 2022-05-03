import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const ManageDineInOrder = React.lazy(() =>
  import(/* webpackChunkName: "order-default" */ "./dine-in/orders")
);
const ManageDeliveryOrder = React.lazy(() =>
  import(/* webpackChunkName: "order-default" */ "./delivery/orders")
);
const ManageTakeawayOrder = React.lazy(() =>
  import(/* webpackChunkName: "order-default" */ "./takeaway/orders")
);
const HistoryOrders = React.lazy(() =>
  import(/* webpackChunkName: "order-default" */ "./order-history/orders")
);

const Dashboards = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/dine-in`} />
      <Route
        path={`${match.url}/dine-in`}
        render={props => <ManageDineInOrder {...props} />}
      />
      <Route
        path={`${match.url}/delivery`}
        render={props => <ManageDeliveryOrder {...props} />}
      />
      <Route
        path={`${match.url}/takeaway`}
        render={props => <ManageTakeawayOrder {...props} />}
      />
      <Route
        path={`${match.url}/order-history`}
        render={props => <HistoryOrders {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Dashboards;
