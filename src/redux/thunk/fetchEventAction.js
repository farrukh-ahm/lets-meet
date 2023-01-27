import axios from "axios";
import { event_delete } from "../event/actions";
import { EVENT_ACTION_FAIL, EVENT_ACTION_REQUEST } from "../event/actionType";
const fetchEventAction = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: EVENT_ACTION_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/event/${id}/action/`, config);
      dispatch(event_delete(data));
    } catch (error) {
      dispatch({
        type: EVENT_ACTION_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
};
export default fetchEventAction;
