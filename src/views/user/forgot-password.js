import React, { Component } from "react";
import { Row, Card, CardTitle, Form, Label, Input, Button, FormText, Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import UserLayout from "../../layout/UserLayout";
import OtpInput from 'react-otp-input';
import { connect } from "react-redux";
import { NotificationManager } from "../../components/common/react-notifications";
import { forgotPassword, otpVerify, resetPassword } from "../../redux/actions";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      otp: "",
      confirmPassword: "",
      newPassword: "",
      bColor: ""
    };
  }
  validateEmail = email => {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  };
  render() {
    return (
      <UserLayout>
        <Row className="h-100">
          <Colxx xxs="12" md="10" className="mx-auto my-auto">
            <Card className="auth-card">
              <div className="position-relative image-side "></div>
              <div className="form-side">
                <br />
                <br />
                <br />
                <br />
                <CardTitle className="mb-4">
                  <IntlMessages id="user.forgot-password" />
                  {"?"}
                </CardTitle>
                <Form>
                  {this.props.authUser.otpShow === false && this.props.authUser.resetPassword === false ? <div>
                    <Label className="form-group has-float-label mb-4">
                      <Input type="email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                      <IntlMessages id="user.email" />
                    </Label>

                    <div className="mt-3 d-flex justify-content-between align-items-center">
                      <Link to={`/user/login`} className="shadow">
                        Home
                    </Link>
                      <Button

                        color="primary"
                        className="btn-shadow"
                        size="lg"
                        onClick={() => {
                          if (this.state.email !== "" && this.validateEmail(this.state.email)) { this.props.forgotPassword(this.state.email) } else {
                            NotificationManager.error(
                              "Enter Valid Email",
                              "Try again",
                              4000,
                              null,
                              null
                            );
                          }
                        }}
                      >
                        {this.props.authUser.loading === true ? (
                          <div>
                            <Spinner />
                          </div>
                        ) : (
                            <div>
                              <IntlMessages id="user.reset-password-button" />
                            </div>
                          )}

                      </Button>
                    </div>
                  </div> : null}
                  {this.props.authUser.otpShow === true && this.props.authUser.resetPassword === false ? <div>
                    <OtpInput value={this.state.otp} onChange={otp => { this.setState({ otp: otp }, () => { if (parseInt(this.state.otp.length) > 5) this.props.otpVerify(this.state.email, this.state.otp) }); }}
                      numInputs={6}
                      inputStyle={{ width: "3em", height: "4em" }}
                      isDisabled={this.props.authUser.loading === true}
                      separator={<span>-</span>} />
                    <div className="d-flex align-items-center">
                      <FormText color="muted">
                        Didn't receive a mail yet?
                          </FormText><Button color="link" size="sm" onClick={() => { this.props.forgotPassword(this.state.email); this.setState({ otp: "" }) }}>Resend code</Button>
                    </div>

                    <div className="mt-3 d-flex justify-content-between align-items-center">
                      <Link to={`/user/login`} className="shadow">
                        Home
                    </Link>
                    </div>
                  </div> : null}
                  {this.props.authUser.otpShow === true && this.props.authUser.resetPassword === true ? <div>
                    <Label className="form-group has-float-label mb-4">
                      New Password
                      <Input
                        type="password"
                        autoComplete="true"
                        onChange={e => {
                          this.setState({ newPassword: e.target.value });
                        }}
                        required
                      />

                    </Label>
                    <Label className="form-group has-float-label mb-4">
                      Confirm Password
                      <Input
                        style={{ borderColor: this.state.bColor }}
                        type="password"
                        autoComplete="true"
                        onChange={e => {
                          this.setState({ confirmPassword: e.target.value }, () =>
                            this.state.confirmPassword === this.state.newPassword
                              ? this.setState({ bColor: "green" })
                              : this.setState({ bColor: "red" })
                          );
                        }}
                        required
                      />

                    </Label>
                    <div className="mt-3 d-flex justify-content-between align-items-center">
                      <Link to={`/user/login`} className="shadow">
                        Home
                    </Link>
                      <Button

                        color="primary"
                        className="btn-shadow"
                        size="lg"
                        onClick={() => { if (this.state.newPassword === this.state.confirmPassword) { let obj = { email: this.state.email, otp: this.state.otp, newPassword: this.state.newPassword }; this.props.resetPassword(obj, this.props.history) } }}
                      >{this.props.authUser.loading === true ? (
                        <div>
                          <Spinner />
                        </div>
                      ) : (
                          <div>
                            <IntlMessages id="user.reset-password-button" />
                          </div>
                        )}

                      </Button>
                    </div>
                  </div> : null}

                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
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
  return { authUser };
};
export default connect(mapStateToProps, { forgotPassword, otpVerify, resetPassword })(ForgotPassword)
