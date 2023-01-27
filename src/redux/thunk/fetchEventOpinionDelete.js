import axios from "axios";
import { event_opinion_delete } from "../event/actions";
import {
  EVENT_OPINION_DELETE_FAIL,
  EVENT_OPINION_DELETE_REQUEST,
} from "../event/actionType";
const fetchEventOpinionDelete = (event_id, opinion_id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: EVENT_OPINION_DELETE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.delete(
        `/api/event/${event_id}/opinion-delete/${opinion_id}`,
        config
      );
      dispatch(event_opinion_delete(data));
    } catch (error) {
      dispatch({
        type: EVENT_OPINION_DELETE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
};
export default fetchEventOpinionDelete;
