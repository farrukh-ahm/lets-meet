import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

const userInfoFromStroge = localStorage.getItem("leets_meet_userInfo")
  ? JSON.parse(localStorage.getItem("leets_meet_userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStroge },
};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
