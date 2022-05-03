import React, { Component } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Card,
  CardTitle,
  Form,
  Label,
  Input,
  Button,
  Spinner
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import { loginUser } from "../../redux/actions";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { NotificationManager } from "../../components/common/react-notifications";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      accountString: "",
      activeTab: "1"
    };
  }
  validateEmail = email => {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  };
  onUserLogin() {
    if (this.state.activeTab === "1") {
      if (this.state.email !== "" && this.state.password !== "") {
        if (this.validateEmail(this.state.email)) {
          let user = {
            email: this.state.email,
            password: this.state.password
          };
          this.props.loginUser(user, this.props.history);
        } else {
          NotificationManager.error(
            "xyz@mail.com",
            "Enter Valid Email Address",
            4000,
            null,
            null
          );
        }
      } else
        NotificationManager.error(
          "Email/Username or Password field left blank",
          "Try again",
          4000,
          null,
          null
        );
    } else if (this.state.activeTab === "2") {
      if (
        this.state.email !== "" &&
        this.state.password !== "" &&
        this.state.accountString !== ""
      ) {
        let user = {
          username: this.state.email,
          password: this.state.password,
          account_string: this.state.accountString
        };
        this.props.loginUser(user, this.props.history);
      } else
        NotificationManager.error(
          "All Fields are must",
          "Try again",
          4000,
          null,
          null
        );
    }
  }
  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  render() {
    return (
      <Row className="h-100">
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card">
            <div className="position-relative image-side ">
              {/* <p className="text-white h2 tagline">
                &#9734;Feedback&#9734; &#9734;Redefined&#9734;
              </p> */}
            </div>
            <div className="form-side mb-2">
              {/* <Link to={`/`} className="white">
                <span className="logo-single" />
              </Link> */}
              <CardTitle className="mb-2">Select Role to Login</CardTitle>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "1"
                    })}
                    onClick={() => this.toggle("1")}
                    style={{ cursor: "pointer" }}
                  >
                    Restaurant Owner
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "2"
                    })}
                    onClick={() => this.toggle("2")}
                    style={{ cursor: "pointer" }}
                  >
                    Manager
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <Form className="mt-3">
                    <Label className="form-group has-float-label mb-4">
                      <Input
                        type="email"
                        autoComplete="true"
                        onChange={e => {
                          this.setState({ email: e.target.value });
                        }}
                      />
                      <IntlMessages id="user.email" />
                    </Label>
                    <Label className="form-group has-float-label mb-4">
                      <Input
                        type="password"
                        autoComplete="true"
                        onChange={e => {
                          this.setState({ password: e.target.value });
                        }}
                        required
                      />
                      <IntlMessages id="user.password" />
                    </Label>
                  </Form>
                </TabPane>
                <TabPane tabId="2">
                  <Form className="mt-3">
                    <Label className="form-group has-float-label mb-4">
                      <Input
                        type="text"
                        autoComplete="true"
                        onChange={e => {
                          this.setState({ accountString: e.target.value });
                        }}
                        required
                      />
                      <IntlMessages id="user.account-string"></IntlMessages>
                    </Label>
                    <Label className="form-group has-float-label mb-4">
                      <Input
                        type="email"
                        autoComplete="true"
                        onChange={e => {
                          this.setState({ email: e.target.value });
                        }}
                      />
                      <IntlMessages id="user.username" />
                    </Label>
                    <Label className="form-group has-float-label mb-4">
                      <Input
                        type="password"
                        autoComplete="true"
                        onChange={e => {
                          this.setState({ password: e.target.value });
                        }}
                        required
                      />
                      <IntlMessages id="user.password" />
                    </Label>
                  </Form>
                </TabPane>
              </TabContent>

              <div className="mt-3 d-flex justify-content-between align-items-center">
                <Link to={`/forgot-password`}>
                  <IntlMessages id="user.forgot-password-question" />
                </Link>
                <Button
                  color="primary"
                  className="btn-shadow"
                  size="lg"
                  onClick={() => this.onUserLogin()}
                >
                  {this.props.loading === true ? (
                    <div>
                      <Spinner />
                    </div>
                  ) : (
                      <div>
                        <IntlMessages id="user.login-button" />
                      </div>
                    )}
                </Button>
              </div>
              <p className="mt-0">
                Not a member?{" "}
                <Link
                  to={`/register`}
                  className="shadow"
                  style={{ textDecoration: "underline" }}
                >
                  Register
                </Link>{" "}
                yourself!
              </p>
              <br />
              <br />
            </div>
          </Card>
        </Colxx>
      </Row>
    );
  }
}
const mapStateToProps = ({ authUser }) => {
  const { user, loading } = authUser;
  return { user, loading };
};

export default connect(mapStateToProps, {
  loginUser
})(Login);
