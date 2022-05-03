import React from "react";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import {Link} from 'react-router-dom';
import Image from "../../assets/css/sass/img/incomingOrder.png"
const NotificationItem = (obj) => {
var orderPage = ""
if(obj.order_type === "CUSTOMERAPP-DINE-IN" || obj.order_type === "BUSINESSAPP-DINE-IN" || obj.order_type === "DINE-IN" ){
  orderPage = "dine-in"
}
else if (obj.order_type === "DELIVERY" ){
  orderPage = "delivery"
}
else if(obj.order_type === "TAKEAWAY" ){
  orderPage = "takeaway"
}
  return (
    <div className="d-flex flex-row mb-3 pb-3 border-bottom">
      <Link to={`/app/orders/`+orderPage}>
        <img
        
          src={Image}
          alt={'notify'}
          className="img-thumbnail list-thumbnail xsmall border-0 rounded-circle"
        />
      </Link>
      <div className="pl-3 pr-2">
        <Link to={`/app/orders/`+orderPage}>
          <p className="font-weight-medium mb-1">{obj.order_status + ' order at '+ obj.order_type + ' portal in ' + obj.branch_name}</p>
          <p className="text-muted mb-0 text-small">{Math.floor(
                  (Date.now() -
                    Date.parse(obj.creation_time)) /
                  1000 /
                  60
                )+' minutes ago'}</p>
                <p className="text-muted mb-0 text-small">{'Order Id: '+ obj.id}</p>
        </Link>
      </div>
    </div>
  );
};

const TopnavNotifications = (props) => {
  return (
    <div className="position-relative d-inline-block">
      <UncontrolledDropdown className="dropdown-menu-right">
        <DropdownToggle
          className="header-icon notificationButton"
          color="empty"
        >
          <i className="simple-icon-bell" />
          <span className="count">{props.notifications.length}</span>
        </DropdownToggle>
        <DropdownMenu
          className="position-absolute mt-3 scroll"
          right
          id="notificationDropdown"
        >
          <PerfectScrollbar
            options={{ suppressScrollX: true, wheelPropagation: false }}
          >
            {props.notifications.map((notification, index) => {
              return <NotificationItem key={index} {...notification} />;
            })}
          </PerfectScrollbar>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};

export default TopnavNotifications;
