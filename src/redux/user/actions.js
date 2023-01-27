import {
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_PROFILE_DETAILS_RESET,
  USER_PROFILE_DETAILS_SUCCESS,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
} from "./actionType";

export const login = (data) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: data,
  };
};

export const logout = (dispatch) => {
  dispatch({
    type: USER_LOGOUT,
  });
  localStorage.removeItem("leets_meet_userInfo");
  dispatch({ type: USER_PROFILE_DETAILS_RESET });
  dispatch({ type: USER_UPDATE_PROFILE_RESET });
};

export const register = (data) => {
  return {
    type: USER_REGISTER_SUCCESS,
    payload: data,
  };
};

export const userProfile = (data) => {
  return {
    type: USER_PROFILE_DETAILS_SUCCESS,
    payload: data,
  };
};

export const userProfileUpdate = (data) => {
  return {
    type: USER_UPDATE_PROFILE_SUCCESS,
    payload: data,
  };
};
