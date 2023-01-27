import {
  AUTHOR_EVENT_LIST_FAIL,
  AUTHOR_EVENT_LIST_REQUEST,
  AUTHOR_EVENT_LIST_SUCCESS,
  AUTH_EVENT_LIST_FAIL,
  AUTH_EVENT_LIST_REQUEST,
  AUTH_EVENT_LIST_SUCCESS,
  EVENT_ACTION_FAIL,
  EVENT_ACTION_REQUEST,
  EVENT_ACTION_SUCCESS,
  EVENT_DELETE_FAIL,
  EVENT_DELETE_REQUEST,
  EVENT_DELETE_SUCCESS,
  EVENT_DETAILS_FAIL,
  EVENT_DETAILS_REQUEST,
  EVENT_DETAILS_SUCCESS,
  EVENT_LIST_FAIL,
  EVENT_LIST_REQUEST,
  EVENT_LIST_SUCCESS,
  EVENT_OPINION_CREATE_FAIL,
  EVENT_OPINION_CREATE_REQUEST,
  EVENT_OPINION_CREATE_SUCCESS,
  EVENT_OPINION_DELETE_FAIL,
  EVENT_OPINION_DELETE_REQUEST,
  EVENT_OPINION_DELETE_SUCCESS,
  EVENT_OPINION_EDIT_FAIL,
  EVENT_OPINION_EDIT_REQUEST,
  EVENT_OPINION_EDIT_SUCCESS,
  EVENT_UPDATE_FAIL,
  EVENT_UPDATE_REQUEST,
  EVENT_UPDATE_SUCCESS,
  MYEVENT_LIST_FAIL,
  MYEVENT_LIST_REQUEST,
  MYEVENT_LIST_SUCCESS,
} from "./actionType";

export const eventListReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_LIST_REQUEST:
      return {
        loading: true,
      };
    case EVENT_LIST_SUCCESS:
      return {
        loading: false,
        events: action.payload,
      };

    case EVENT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const authEventListReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_EVENT_LIST_REQUEST:
      return {
        loading: true,
      };
    case AUTH_EVENT_LIST_SUCCESS:
      return {
        loading: false,
        events: action.payload,
      };

    case AUTH_EVENT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const myEventListReducer = (state = {}, action) => {
  switch (action.type) {
    case MYEVENT_LIST_REQUEST:
      return {
        loading: true,
      };
    case MYEVENT_LIST_SUCCESS:
      return {
        loading: false,
        events: action.payload,
      };

    case MYEVENT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const authorEventListReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTHOR_EVENT_LIST_REQUEST:
      return {
        loading: true,
      };
    case AUTHOR_EVENT_LIST_SUCCESS:
      return {
        loading: false,
        events: action.payload,
      };

    case AUTHOR_EVENT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const eventDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case EVENT_DETAILS_SUCCESS:
      return {
        loading: false,
        event: action.payload,
      };

    case EVENT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const eventUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case EVENT_UPDATE_SUCCESS:
      return {
        loading: false,
        event: action.payload,
      };
    case EVENT_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const eventDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_DELETE_REQUEST:
      return {
        loading: true,
      };
    case EVENT_DELETE_SUCCESS:
      return {
        loading: false,
        event: action.payload,
        success: true,
      };
    case EVENT_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const eventActionReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_ACTION_REQUEST:
      return {
        loading: true,
      };
    case EVENT_ACTION_SUCCESS:
      return {
        loading: false,
        event: action.payload,
        success: true,
      };
    case EVENT_ACTION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const eventOpinionCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_OPINION_CREATE_REQUEST:
      return {
        loading: true,
      };
    case EVENT_OPINION_CREATE_SUCCESS:
      return {
        loading: false,
        opinion: action.payload,
        success: true,
      };
    case EVENT_OPINION_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const eventOpinionEditReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_OPINION_EDIT_REQUEST:
      return {
        loading: true,
      };
    case EVENT_OPINION_EDIT_SUCCESS:
      return {
        loading: false,
        opinion: action.payload,
        success: true,
      };
    case EVENT_OPINION_EDIT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const eventOpinionDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_OPINION_DELETE_REQUEST:
      return {
        loading: true,
      };
    case EVENT_OPINION_DELETE_SUCCESS:
      return {
        loading: false,
        opinion: action.payload,
        success: true,
      };
    case EVENT_OPINION_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
