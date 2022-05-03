import React, { Component, Fragment } from "react";
import { Row, CustomInput, Button } from "reactstrap";
import { Colxx } from "../../../components/common/CustomBootstrap";
import { Card, CardBody, CardTitle } from "reactstrap";
import { connect } from "react-redux";
import {
  getRestaurant,
  getFields,
  addFields,
  getRestaurantSuccess
} from "../../../redux/actions";

class feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taste: true,
      quality: true,
      quantity: "",
      valueToMoney: "",
      presentation: "",
      restaurantId: "",
      feedbackId: ""
    };
  }
  _onSubmit = () => {
    let obj = {
      taste: this.state.taste,
      quality: this.state.quality,
      quantity: this.state.quantity,
      value_to_money: this.state.valueToMoney,
      presentation: this.state.presentation,
      feedback_id: this.props.manage.feedbackFields.id,
      restaurant: this.props.menuDishes.restaurant[0].id
    };
    this.props.addFields(obj);
  };
  componentDidMount() {
    setTimeout(
      () => this.props.getFields(this.props.menuDishes.restaurant[0].id),
      1500
    );
  }
  componentDidUpdate(prevProps) {

    if (prevProps.manage.feedbackFields.quantity !== this.props.manage.feedbackFields.quantity) {

      this.setState({
        quantity: this.props.manage.feedbackFields.quantity,
      });
    }
    if (prevProps.manage.feedbackFields.value_to_money !== this.props.manage.feedbackFields.value_to_money) {
      this.setState({
        valueToMoney: this.props.manage.feedbackFields.value_to_money
      })
    }
    if (prevProps.manage.feedbackFields.presentation !== this.props.manage.feedbackFields.presentation) {
      this.setState({
        presentation: this.props.manage.feedbackFields.presentation
      })
    }
  }
  render() {
    return (
      <Fragment>
        {this.props.manage.loading === true ? (
          <div className="loading"></div>
        ) : null}
        <Row>
          <Colxx lg="12" xl="6" className="mb-4">
            <Card>
              <CardBody>
                <CardTitle className="mb-2">
                  Choose fields to add in feedback
                </CardTitle>
                <div className="mb-2">
                  <CustomInput
                    type="checkbox"
                    id="exCustomRadio"
                    name="customRadio"
                    label="Taste"
                    value={this.state.taste}
                    defaultChecked={this.state.taste}
                    disabled
                    onClick={e =>
                      this.setState(prevState => ({
                        taste: !prevState.taste
                      }))
                    }
                  />
                  <CustomInput
                    type="checkbox"
                    id="exCustomRadio"
                    name="customRadio"
                    label="Quality"
                    value={this.state.quality}
                    defaultChecked={this.state.quality}
                    disabled
                    onClick={e =>
                      this.setState(prevState => ({
                        quality: !prevState.quality
                      }))
                    }
                  />
                  <CustomInput
                    type="checkbox"
                    id="exCustomRadio"
                    name="customRadio"
                    label="Quantity"
                    value={this.state.quantity}
                    checked={this.state.quantity}
                    onClick={e =>
                      this.setState(prevState => ({
                        quantity: !prevState.quantity
                      }))
                    }
                  />

                  <CustomInput
                    type="checkbox"
                    id="exCustomRadio"
                    name="customRadio"
                    label="Value to Money"
                    value={this.state.valueToMoney}
                    checked={this.state.valueToMoney}
                    onClick={e =>
                      this.setState(prevState => ({
                        valueToMoney: !prevState.valueToMoney
                      }))
                    }
                  />

                  <CustomInput
                    type="checkbox"
                    id="exCustomRadio"
                    name="customRadio"
                    label="Presentation"
                    value={this.state.presentation}
                    checked={this.state.presentation}
                    onClick={e =>
                      this.setState(prevState => ({
                        presentation: !prevState.presentation
                      }))
                    }
                  />
                </div>

                <Button
                  className="btn-xs"
                  color="primary"
                  onClick={this._onSubmit}
                >
                  Add Fields
                </Button>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
const mapStateToProps = ({ menuDishes, manage }) => {
  return { menuDishes, manage };
};
export default connect(mapStateToProps, {
  getRestaurant,
  getFields,
  addFields,
  getRestaurantSuccess
})(feedback);
