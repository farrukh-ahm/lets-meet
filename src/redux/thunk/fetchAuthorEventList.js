import axios from "axios";
import { author_event_list } from "../event/actions";
import {
  AUTHOR_EVENT_LIST_FAIL,
  AUTHOR_EVENT_LIST_REQUEST,
} from "../event/actionType";

const fetchAuthorEventList = async (dispatch, getState) => {
  try {
    dispatch({ type: AUTHOR_EVENT_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/event/author/`, config);
    dispatch(author_event_list(data));
  } catch (error) {
    dispatch({
      type: AUTHOR_EVENT_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export default fetchAuthorEventList;
