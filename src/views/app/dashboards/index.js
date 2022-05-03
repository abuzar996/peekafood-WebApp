import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const DashboardDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./default")
);

const Transactions = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./transactions/transactions")
);
const ContentDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-content" */ "./content")
);
const RestaurantDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-analytics" */ "./analytics")
);
const EcommerceDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-ecommerce" */ "./ecommerce")
);
const SalesSummary = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-ecommerce" */ "./reports/sales_summary")
);
const SalesTrends = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-ecommerce" */ "./reports/sales_trends")
);
const ItemSales = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-ecommerce" */ "./reports/Itemsales_summary")
);
const CategorySales = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-ecommerce" */ "./reports/category_sales")
);
const PaymentMethods = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-ecommerce" */ "./reports/Payment_methods")
);
const Discounts = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-ecommerce" */ "./reports/discounts")
);
const Dashboards = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/restaurant`} />
      <Route
        path={`${match.url}/branch`}
        render={props => <DashboardDefault {...props} />}
      />
      <Route
        path={`${match.url}/transactions`}
        render={props => <Transactions {...props} />}
      />
      <Route
        path={`${match.url}/content`}
        render={props => <ContentDefault {...props} />}
      />
      <Route
        path={`${match.url}/ecommerce`}
        render={props => <EcommerceDefault {...props} />}
      />
      <Route
        path={`${match.url}/restaurant`}
        render={props => <RestaurantDefault {...props} />}
      />
       <Route
        path={`${match.url}/reports/sales-summary`}
        render={props => <SalesSummary {...props} />}
      />
      <Route
        path={`${match.url}/reports/sales-trends`}
        render={props => <SalesTrends {...props} />}
      />
      <Route
        path={`${match.url}/reports/payment-methods`}
        render={props => <PaymentMethods {...props} />}
     />
      <Route
        path={`${match.url}/reports/item-sales`}
        render={props => <ItemSales {...props} />}
     />
     <Route
        path={`${match.url}/reports/category-sales`}
        render={props => <CategorySales {...props} />}
     />
      <Route
        path={`${match.url}/reports/discounts`}
        render={props => <Discounts {...props} />}
     />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Dashboards;
