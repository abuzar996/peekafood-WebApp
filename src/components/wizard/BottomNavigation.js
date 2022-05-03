import React, { Component } from "react";
import { WithWizard } from "react-albus";
import { Button } from "reactstrap";

export class BottomNavigation extends Component {
  render() {
    return (
      <WithWizard
        render={({ next, previous, step, steps }) => (
          <div className={"wizard-buttons " + this.props.className}>
            <Button color="primary"
                        // className={"mr-1 disabled" + (steps.indexOf(step) <= 0 ? "disabled" : "")}
                        onClick={() => { if (localStorage.getItem("noRestaurant") === "true") this.props.onClickPrev(previous, steps, step) }}>
                        {this.props.prevLabel}
                    </Button>

            <Button
              color="primary"
              className={
                steps.indexOf(step) >= steps.length - 1 ? "disabled" : ""
              }
              onClick={() => {
                if (localStorage.getItem("noRestaurant") === "true")
                  this.props.onClickNext(next, steps, step);
                else
                {
                  
                }
              }}
            >
              {this.props.nextLabel}
            </Button>
          </div>
        )}
      />
    );
  }
}
