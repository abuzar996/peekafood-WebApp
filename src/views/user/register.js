import React, { Component } from "react";
import ReactDOM from 'react-dom'
import {
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
import { registerUser } from "../../redux/actions";
import UserLayout from "../../layout/UserLayout";

import IntlMessages from "../../helpers/IntlMessages";
import { Colxx } from "../../components/common/CustomBootstrap";
import { NotificationManager } from "../../components/common/react-notifications";
import RCG from "react-captcha-generator";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
      captcha: "",
      captchaCheck: "",
      bColor: "",
      captchaCounter: 0
    };
  }
  onUserRegister() {

    if (this.state.captcha === this.state.captchaCheck)
      if (this.state.password === this.state.confirmPassword) {
        this.state.email !== "" &&
          this.state.password !== "" &&
          this.state.name !== ""
          ? this.props.registerUser(this.state, this.props.history)
          : NotificationManager.error(
            "Some field left blank",
            "Try again",
            4000,
            null,
            null
          );
      } else
        NotificationManager.error(
          "Password Mismatch",
          "Re-confirm password",
          4000,
          null,
          null
        );
    else
      NotificationManager.error(
        "Invalid Captcha",
        "Re Enter Captcha",
        4000,
        null,
        null
      );
  }
  result = text => {
    this.setState({
      captcha: text
    });

  };
  captchRefresh = () => {


    switch (this.state.captchaCounter) {
      case 0:
        const element1 = (<div style={{ marginBottom: "25px" }} id="rcg1">
          <RCG
            background="#ffffff3b"
            height="70px"
            width="120px"
            result={this.result}

          />{" "}
        </div>)

        ReactDOM.render(element1, document.getElementById('rcg'));
        break;
      case 1:
        const element2 = (<div style={{ marginBottom: "25px" }} id="rcg2">
          <RCG
            background="#ffffff3b"
            height="70px"
            width="120px"
            result={this.result}

          />{" "}
        </div>)

        ReactDOM.render(element2, document.getElementById('rcg1'));
        break;
      case 2:
        const element3 = (<div style={{ marginBottom: "25px" }} id="rcg3">
          <RCG
            background="#ffffff3b"
            height="70px"
            width="120px"
            result={this.result}

          />{" "}
        </div>)

        ReactDOM.render(element3, document.getElementById('rcg2'));
        break;
      default:
        const element4 = (<div style={{ marginBottom: "25px" }} id="rcg">
          <RCG
            background="#ffffff3b"
            height="10px"
            width="120px"
            result={this.result}

          />{" "}
        </div>)
        ReactDOM.render(element4, document.getElementById('rcg3'));


    }
    this.setState({ captchaCounter: this.state.captchaCounter + 1 })



  }

  render() {
    return (
      <UserLayout>
        <Row className="h-100">
          <Colxx xxs="12" md="10" className="mx-auto my-auto">
            <Card className="auth-card">
              <div className="position-relative image-side "></div>
              <div className="form-side">
                <CardTitle className="mb-2">
                  <IntlMessages id="user.register" />
                  {" Yourself!"}
                </CardTitle>
                <Form>
                  <Label className="form-group has-float-label">
                    <Input
                      type="name"
                      onChange={e => {
                        this.setState({ name: e.target.value });
                      }}
                    />
                    <IntlMessages id="user.fullname" />
                  </Label>
                  <Label className="form-group has-float-label">
                    <Input
                      type="email"
                      onChange={e => {
                        this.setState({ email: e.target.value });
                      }}
                    />
                    <IntlMessages id="user.email" />
                  </Label>
                  <Label className="form-group has-float-label">
                    <Input
                      type="password"
                      onChange={e => {
                        this.setState({ password: e.target.value });
                      }}
                    />

                    <IntlMessages id="user.password" />
                  </Label>

                  <Label className="form-group has-float-label">
                    <Input
                      style={{ borderColor: this.state.bColor }}
                      type="password"
                      onChange={e => {
                        this.setState({ confirmPassword: e.target.value }, () =>
                          this.state.confirmPassword === this.state.password
                            ? this.setState({ bColor: "green" })
                            : this.setState({ bColor: "red" })
                        );
                      }}
                    />
                    <IntlMessages id="user.confirmPassword" />
                  </Label>
                  <div className="d-flex justify-content-around align-items-center">
                    <div id="rcg" style={{ marginBottom: "25px" }}>
                      <RCG
                        background="#ffffff3b"
                        height="70px"
                        width="120px"
                        result={this.result}

                      />{" "}
                    </div>
                    {
                      this.state.captchaCounter < 3 ? <h2 aria-hidden="true" style={{ marginTop: "10px" }} className="pointing iconsminds-arrow-refresh" onClick={this.captchRefresh} /> : null
                    }
                    <Input
                      type="text"
                      placeholder="Enter Captcha.."
                      onChange={e => {
                        this.setState({ captchaCheck: e.target.value });
                      }}
                    />

                  </div>


                  <div className="mt-1 d-flex justify-content-between align-items-center">
                    <Link to={`/user/login`}>Already have an Account? Sign In</Link>
                    <Button
                      color="primary"
                      className="btn-shadow"
                      size="lg"
                      onClick={() => this.onUserRegister()}
                    >
                      {this.props.loading === true ? (
                        <Spinner color="secondary" />
                      ) : (
                          <IntlMessages id="user.register-button" />
                        )}
                    </Button>
                  </div>
                </Form>
              </div>
            </Card>
          </Colxx>
        </Row>
      </UserLayout>
    );
  }
}
const mapStateToProps = ({ authUser }) => {
  const { user, loading } = authUser;
  return { user, loading };
};

export default connect(mapStateToProps, {
  registerUser
})(Register);
