import {
  AUTHOR_EVENT_LIST_SUCCESS,
  AUTH_EVENT_LIST_SUCCESS,
  EVENT_ACTION_SUCCESS,
  EVENT_DELETE_SUCCESS,
  EVENT_DETAILS_SUCCESS,
  EVENT_LIST_SUCCESS,
  EVENT_OPINION_CREATE_SUCCESS,
  EVENT_OPINION_DELETE_SUCCESS,
  EVENT_OPINION_EDIT_SUCCESS,
  EVENT_UPDATE_SUCCESS,
  MYEVENT_LIST_SUCCESS,
} from "./actionType";

export const event_list = (data) => {
  return {
    type: EVENT_LIST_SUCCESS,
    payload: data,
  };
};

export const auth_event_list = (data) => {
  return {
    type: AUTH_EVENT_LIST_SUCCESS,
    payload: data,
  };
};

export const my_event_list = (data) => {
  return {
    type: MYEVENT_LIST_SUCCESS,
    payload: data,
  };
};

export const author_event_list = (data) => {
  return {
    type: AUTHOR_EVENT_LIST_SUCCESS,
    payload: data,
  };
};

export const event_details = (data) => {
  return {
    type: EVENT_DETAILS_SUCCESS,
    payload: data,
  };
};

export const event_update = (data) => {
  return {
    type: EVENT_UPDATE_SUCCESS,
    payload: data,
  };
};

export const event_delete = (data) => {
  return {
    type: EVENT_DELETE_SUCCESS,
    payload: data,
  };
};

export const event_action = (data) => {
  return {
    type: EVENT_ACTION_SUCCESS,
    payload: data,
  };
};

export const event_opinion_create = (data) => {
  return {
    type: EVENT_OPINION_CREATE_SUCCESS,
    payload: data,
  };
};

export const event_opinion_edit = (data) => {
  return {
    type: EVENT_OPINION_EDIT_SUCCESS,
    payload: data,
  };
};

export const event_opinion_delete = (data) => {
  return {
    type: EVENT_OPINION_DELETE_SUCCESS,
    payload: data,
  };
};
