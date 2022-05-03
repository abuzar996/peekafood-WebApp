import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const InventoryItem = React.lazy(() =>
    import(/* webpackChunkName: "dashboard-default" */ "./inventoryItems/index")
);
const InventoryCalculator = React.lazy(() =>
    import(/* webpackChunkName: "dashboard-default" */ "./InventoryCalculator/index")
);

const InventorySummary = React.lazy(() =>
    import(/* webpackChunkName: "dashboard-default" */ "./inventorySummary/index")
);

const Inventory = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect
                exact
                from={`${match.url}/`}
                to={`${match.url}/inventory-items`}
            />
            <Route
                path={`${match.url}/inventory-items`}
                render={props => <InventoryItem {...props} />}
            />
            <Route
                path={`${match.url}/inventory-calculator`}
                render={props => <InventoryCalculator {...props} />}
            />
            <Route
                path={`${match.url}/inventory-audit`}
                render={props => <InventorySummary {...props} />}
            />
                    

            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default Inventory;
