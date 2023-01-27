import axios from "axios";
import { my_event_list } from "../event/actions";
import { MYEVENT_LIST_FAIL, MYEVENT_LIST_REQUEST } from "../event/actionType";

const fetchMyEventList = async (dispatch, getState) => {
  try {
    dispatch({ type: MYEVENT_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/event/mine/`, config);
    dispatch(my_event_list(data));
  } catch (error) {
    dispatch({
      type: MYEVENT_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export default fetchMyEventList;
