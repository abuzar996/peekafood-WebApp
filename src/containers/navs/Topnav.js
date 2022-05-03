import React, { Component } from "react";
import { injectIntl } from "react-intl";

import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Button
} from "reactstrap";

import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  setContainerClassnames,
  clickOnMobileMenu,
  logoutUser,
  getUser,
  changeLocale,
  getRestaurant,
  getBranch,
  editRestaurant,
  getNotifications,
  getServices,
  stopNotificationsChannel
} from "../../redux/actions";
import {
  menuHiddenBreakpoint
  //searchPath,
  //localeOptions
} from "../../constants/defaultValues";
import _ from "lodash";
import { MobileMenuIcon, MenuIcon } from "../../components/svg";
import TopnavNotifications from "./Topnav.Notifications";
import RestaurantModal from "./RestaurantModal";

import { getDirection, setDirection } from "../../helpers/Utils";
class TopNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInFullScreen: false,
      searchKeyword: "",
      name: "",
      image: "",
      modalOpen: false
    };
  }

  handleChangeLocale = (locale, direction) => {
    this.props.changeLocale(locale);

    const currentDirection = getDirection().direction;
    if (direction !== currentDirection) {
      setDirection(direction);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };
  isInFullScreen = () => {
    return (
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)
    );
  };
  handleSearchIconClick = e => {
    if (window.innerWidth < menuHiddenBreakpoint) {
      let elem = e.target;
      if (!e.target.classList.contains("search")) {
        if (e.target.parentElement.classList.contains("search")) {
          elem = e.target.parentElement;
        } else if (
          e.target.parentElement.parentElement.classList.contains("search")
        ) {
          elem = e.target.parentElement.parentElement;
        }
      }

      if (elem.classList.contains("mobile-view")) {
        this.search();
        elem.classList.remove("mobile-view");
        this.removeEventsSearch();
      } else {
        elem.classList.add("mobile-view");
        this.addEventsSearch();
      }
    } else {
      this.search();
    }
  };
  addEventsSearch = () => {
    document.addEventListener("click", this.handleDocumentClickSearch, true);
  };
  removeEventsSearch = () => {
    document.removeEventListener("click", this.handleDocumentClickSearch, true);
  };

  handleDocumentClickSearch = e => {
    let isSearchClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains("navbar") ||
        e.target.classList.contains("simple-icon-magnifier"))
    ) {
      isSearchClick = true;
      if (e.target.classList.contains("simple-icon-magnifier")) {
        this.search();
      }
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      e.target.parentElement.classList.contains("search")
    ) {
      isSearchClick = true;
    }

    if (!isSearchClick) {
      const input = document.querySelector(".mobile-view");
      if (input && input.classList) input.classList.remove("mobile-view");
      this.removeEventsSearch();
      this.setState({
        searchKeyword: ""
      });
    }
  };
  handleSearchInputChange = e => {
    this.setState({
      searchKeyword: e.target.value
    });
  };
  handleSearchInputKeyPress = e => {
    if (e.key === "Enter") {
      this.search();
    }
  };

  search = () => {
    //   this.props.history.push(searchPath + "/" + this.state.searchKeyword);
    //   this.setState({
    //     searchKeyword: ""
    //   });
    // };
    alert("Search option in progress");
  };

  toggleFullScreen = () => {
    const isInFullScreen = this.isInFullScreen();

    var docElm = document.documentElement;
    if (!isInFullScreen) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    this.setState({
      isInFullScreen: !isInFullScreen
    });
  };

  handleLogout = () => {
    this.props.logoutUser(this.props.history);
  };

  menuButtonClick = (e, menuClickCount, containerClassnames) => {
    e.preventDefault();

    setTimeout(() => {
      var event = document.createEvent("HTMLEvents");
      event.initEvent("resize", false, false);
      window.dispatchEvent(event);
    }, 250);
    this.props.setContainerClassnames(
      ++menuClickCount,
      containerClassnames,
      this.props.selectedMenuHasSubItems
    );
  };
  mobileMenuButtonClick = (e, containerClassnames) => {
    e.preventDefault();
    this.props.clickOnMobileMenu(containerClassnames);
  };
  toggleRestaurantModal = () => {
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen
    }));
  };

  componentDidUpdate() {
    if (
      this.props.authUser.user &&
      this.state.image !== this.props.authUser.user.profile_image &&
      this.state.name !== this.props.authUser.user.name
    ) {
      this.setState({ image: this.props.authUser.user.profile_image });
      this.setState({ name: this.props.authUser.user.name });
    }
    if(this.props.authUser.notifications.length > 0)
    document.title = `(${this.props.authUser.notifications.length}) Peekafood`
    
  }
  componentDidMount() {
    if (this.props.authUser) {
      this.props.getUser();
      this.props.getNotifications();
      
    }
    
      this.props.getRestaurant();
      setTimeout(
        () => {
          
          this.props.getBranch(this.props.menuDishes.restaurant[0])
          if (
            _.isEmpty(this.props.menuDishes.restaurant) &&
            localStorage.getItem("isBasic") === "true"
          ) {
            localStorage.setItem("noRestaurant", "true");
          }
        
        },
        3000
      );
      this.props.getServices();
  }
  componentWillUnmount(){
    this.props.stopNotificationsChannel()
  }

  render() {
    //const {locale} = this.props;
    const { containerClassnames, menuClickCount } = this.props;
    return (
      <nav className="navbar fixed-top">
        <RestaurantModal
          modalOpen={this.state.modalOpen}
          toggleModal={this.toggleRestaurantModal}
          restaurant={this.props.menuDishes.restaurant[0]}
          editRestaurant={this.props.editRestaurant}
        />
        {this.props.loading === true ? <div classname="loading" /> : null}
        <div className="d-flex align-items-center navbar-left">
          {localStorage.getItem("isBasic") === "false" ? (
            <div>
              <NavLink
                to="#"
                className="menu-button d-none d-md-block"
                onClick={e =>
                  this.menuButtonClick(e, menuClickCount, containerClassnames)}
              >
                <MenuIcon />
              </NavLink>
              <NavLink
                to="#"
                className="menu-button-mobile d-xs-block d-sm-block d-md-none"
                onClick={e =>
                  this.mobileMenuButtonClick(e, containerClassnames)
                }
              >
                <MobileMenuIcon />
              </NavLink>
            </div>
          ) : (
              <div></div>
            )}

          {/* <div className="search" data-search-path="/app/pages/search">
            <Input
              name="searchKeyword"
              id="searchKeyword"
              placeholder={messages["menu.search"]}
              value={this.state.searchKeyword}
              onChange={e => this.handleSearchInputChange(e)}
              onKeyPress={e => this.handleSearchInputKeyPress(e)}
            />
            <span
              className="search-icon"
              onClick={e => this.handleSearchIconClick(e)}
            >
              <i className="simple-icon-magnifier" />
            </span>
          </div> */}

          {/* <div className="d-inline-block">
            <UncontrolledDropdown className="ml-2">
              <DropdownToggle
                caret
                color="light"
                size="sm"
                className="language-button"
              >
                <span className="name">{locale.toUpperCase()}</span>
              </DropdownToggle>
              <DropdownMenu className="mt-3" right>
                {localeOptions.map(l => {
                  return (
                    <DropdownItem
                      onClick={() => this.handleChangeLocale(l.id, l.direction)}
                      key={l.id}
                    >
                      {l.name}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </UncontrolledDropdown>
          </div> */}
          <div className="d-inline-block">
            {localStorage.getItem("isBasic") === "false" &&
              !_.isEmpty(this.props.menuDishes.restaurant) ? (
                <Button
                  className="ml-4 restaurant-button"
                  color="primary"
                  outline
                  size="lg"
                  onClick={this.toggleRestaurantModal}
                >
                  {this.props.menuDishes.restaurant[0].name || "No Restaurant"}
                </Button>
              ) : null}
          </div>
        </div>

        <div className="navbar-logo">
          <NavLink to="/app">
            <span className="logo d-none d-xs-block" />
            <span className="logo-mobile d-block d-xs-none" />
          </NavLink>
        </div>

        <div className="navbar-right">
          {/* {isDarkSwitchActive && <TopnavDarkSwitch />} */}
          <div className="header-icons d-inline-block align-middle">
            <TopnavNotifications notifications={this.props.authUser.notifications}/>
            <button
              className="header-icon btn btn-empty d-none d-sm-inline-block"
              type="button"
              id="fullScreenButton"
              onClick={this.toggleFullScreen}
            >
              {this.state.isInFullScreen ? (
                <i className="simple-icon-size-actual d-block" />
              ) : (
                  <i className="simple-icon-size-fullscreen d-block" />
                )}
            </button>
          </div>
          <div className="user d-inline-block">
            <UncontrolledDropdown className="dropdown-menu-right">
              <DropdownToggle className="p-0" color="empty">
                <span className="name mr-1 intro">{this.state.name}</span>
                <span>
                  {this.state.image !== "" ? (
                    <img alt="Profile" src={this.state.image} />
                  ) : (
                      <img alt="Profile" src="/assets/img/profile-pic-l.jpg" />
                    )}
                </span>
              </DropdownToggle>
              <DropdownMenu className="mt-3" right>
                <DropdownItem>Account Settings</DropdownItem>

                <DropdownItem onClick={() => this.handleLogout()}>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ menu, settings, authUser, menuDishes ,services}) => {
  const { containerClassnames, menuClickCount, selectedMenuHasSubItems } = menu;
  const { locale } = settings;
  return {
    authUser,
    containerClassnames,
    menuClickCount,
    selectedMenuHasSubItems,
    locale,
    menuDishes,
    services
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    setContainerClassnames,
    clickOnMobileMenu,
    logoutUser,
    getUser,
    changeLocale,
    getRestaurant,
    getBranch,
    getServices,
    editRestaurant,
    getNotifications,
    stopNotificationsChannel
  })(TopNav)
);
