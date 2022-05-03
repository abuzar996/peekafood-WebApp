import { all } from "redux-saga/effects";
import authSagas from "./auth/saga";
import wizardSagas from "./wizard/saga";
import menuSagas from "./dishesMenu/saga";
import dashboard from "./dashboard/saga";
import manage from "./manage/saga";
import order from "./orders/saga";
import inventory from "./inventory/saga";
import services from "./services/saga";
export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    wizardSagas(),
    menuSagas(),
    services(),
    dashboard(),
    manage(),
    order(),
    inventory(),
  ]);
}
