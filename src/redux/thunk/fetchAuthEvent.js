import axios from "axios";
import { auth_event_list } from "../event/actions";
import {
  AUTHOR_EVENT_LIST_FAIL,
  AUTH_EVENT_LIST_REQUEST,
} from "../event/actionType";
const fetchAuthEventList = async (dispatch, getState) => {
  try {
    dispatch({ type: AUTH_EVENT_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/event/auth_all/`, config);
    dispatch(auth_event_list(data));
  } catch (error) {
    dispatch({
      type: AUTHOR_EVENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export default fetchAuthEventList;
