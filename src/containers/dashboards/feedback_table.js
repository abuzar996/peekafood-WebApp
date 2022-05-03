import React, { Component } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import ReactTable from "react-table";
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";
const dataTableColumns = [
  {
    Header: "Feedback Comments",
    accessor: "review",
    Cell: props => <div className="text-muted">{props.value}</div>
  },
  {
    Header: "Sentiments",
    accessor: "polarity",
    Cell: props => (
      <div className="list-item-heading">
        {props.value >= 0.0 && props.value !== null ? (
          props.value < 0.5 ? (
            <p
              className="neutral h4"
              title="Neutral"
              data-toggle="popover"
              data-placement="top"
              data-content="Content"
            ></p>
          ) : (
              <p
                className="happy h4"
                title="Happy"
                data-toggle="popover"
                data-placement="top"
                data-content="Content"
              />
            )
        ) : props.value === null ? (
          <p>No sentiment at the moment</p>
        ) : (
              <p
                className="sad h4"
                title="Sad"
                data-toggle="popover"
                data-placement="top"
                data-content="Content"
              />
            )}
      </div>
    )
  }
];

class FeedbackTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  CustomTbodyComponent = props => (
    <div {...props} className={classnames("rt-tbody", props.className || [])}>
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        {props.children}
      </PerfectScrollbar>
    </div>
  );

  render() {
    return (
      <Card className="mb-4">
        <CardBody>
          <CardTitle>Feedback Table</CardTitle>
          <ReactTable
            data={this.props.feedbacks}
            TbodyComponent={this.CustomTbodyComponent}
            columns={dataTableColumns}
            defaultPageSize={5}
            showPageJump={false}
            showPageSizeOptions={false}
            showPagination={true}
            className={"react-table-fixed-height"}
          />
        </CardBody>
      </Card>
    );
  }
}
export default FeedbackTable;
