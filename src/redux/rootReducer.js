import { combineReducers } from "redux";
import {
  authEventListReducer,
  authorEventListReducer,
  eventActionReducer,
  eventDeleteReducer,
  eventDetailsReducer,
  eventListReducer,
  eventOpinionCreateReducer,
  eventOpinionDeleteReducer,
  eventOpinionEditReducer,
  eventUpdateReducer,
  myEventListReducer,
} from "./event/actionReducer";
import {
  userLoginReducer,
  userProfileDetailsReducer,
  userProfileUpdateReducer,
  userRegisterReducer,
} from "./user/userReducer";

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfileDetails: userProfileDetailsReducer,
  userProfileUpdate: userProfileUpdateReducer,

  eventList: eventListReducer,
  authEventList: authEventListReducer,
  myEventList: myEventListReducer,
  authorEventList: authorEventListReducer,
  eventDetails: eventDetailsReducer,
  eventUpdate: eventUpdateReducer,
  eventDelate: eventDeleteReducer,
  eventAction: eventActionReducer,

  eventOpinionCreate: eventOpinionCreateReducer,
  eventOpinionDelete: eventOpinionDeleteReducer,
  eventOpinionEdit: eventOpinionEditReducer,
});

export default rootReducer;
