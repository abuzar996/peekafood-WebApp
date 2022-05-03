import { combineReducers } from "redux";
import menu from "./menu/reducer";
import authUser from "./auth/reducer";
import menuDishes from "./dishesMenu/reducer";
import dashboard from "./dashboard/reducer";
import manage from "./manage/reducer";
import wizard from "./wizard/reducer";
import settings from "./settings/reducer";
import orders from "./orders/reducers";
import inventory from "./inventory/reducer";
import services from "./services/reducer";

const reducers = combineReducers({
  settings,
  menu,
  authUser,
  menuDishes,
  orders,
  dashboard,
  services,
  manage,
  wizard,
  inventory,
});

export default reducers;
