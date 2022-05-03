import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { IntlProvider } from "react-intl";
import AppLocale from "./lang";

import NotificationContainer from "./components/common/react-notifications/NotificationContainer";

import { getDirection } from "./helpers/Utils";
require("dotenv").config();

const ViewMain = React.lazy(() =>
  import(/* webpackChunkName: "views" */ "./views")
);

const ViewApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./views/app")
);
const ViewUser = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ "./views/user")
);
const ViewFP = React.lazy(() =>
  import(
    /* webpackChunkName: "views-forgotpassword" */ "./views/user/forgot-password"
  )
);
const ViewRegister = React.lazy(() =>
  import(/* webpackChunkName: "views-forgotpassword" */ "./views/user/register")
);
const ViewWizard = React.lazy(() =>
  import(/* webpackChunkName: "views-forgotpassword" */ "./views/user/wizard")
);
const ViewError = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ "./views/error")
);
const ViewMenu = React.lazy(() => import(/* webpackChunkName: "views-menu" */ "./views/SimpleMenu"));

const AuthRoute = ({ component: Component, authUser, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("loggedIn") === "true" ? (
        localStorage.getItem("isBasic") === "true" ? (
          <ViewWizard />
        ) : (
            <Component {...props} />
          )
      ) : (
          <Redirect
            to={{
              pathname: "/user/login",
              state: { from: props.location }
            }}
          />
        )
    }
  />
);

class App extends Component {
  constructor(props) {
    super(props);
    const direction = getDirection();
    if (direction.isRtl) {
      document.body.classList.add("rtl");
      document.body.classList.remove("ltr");
    } else {
      document.body.classList.add("ltr");
      document.body.classList.remove("rtl");
    }
  }

  render() {
    const { locale, loginUser } = this.props;
    const currentAppLocale = AppLocale[locale];

    return (
      <div className="h-100">
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <React.Fragment>
             <NotificationContainer />
            {/* {!localStorage.getItem("__theme_radius") ||
              localStorage.getItem("loggedIn") === "false"
              ? isMultiColorActive && <ColorSwitcher />
              : null} */}
            <Suspense fallback={<div className="loading" />}>
              <Router>
                <Switch>
                  <AuthRoute
                    path={`/app`}
                    authUser={loginUser}
                    component={ViewApp}
                  />
                   <Route
                    path={`/`}
                    exact
                    render={props => <ViewMain {...props} />}
                  />

                  <Route
                    path={`/user`}

                    render={props => <ViewUser {...props} />}
                  />
                  <Route
                    path={`/forgot-password`}

                    render={props => <ViewFP {...props} />}
                  />
                  <Route
                    path={`/register`}

                    render={props => <ViewRegister {...props} />}
                  />
                  <Route
                    path={`/static-menu/:id/:restaurant`}
                    exact
                    render={props => <ViewMenu {...props} />}
                  />
                  <Route
                    path={`/error`}
                    exact
                    render={props => <ViewError {...props} />}
                  />
                 
                  <Redirect to={`/error`} />
                </Switch>
              </Router>
            </Suspense>
          </React.Fragment>
        </IntlProvider>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser, settings }) => {
  const { user: loginUser } = authUser;
  const { locale } = settings;
  return { loginUser, locale };
};
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(App);
