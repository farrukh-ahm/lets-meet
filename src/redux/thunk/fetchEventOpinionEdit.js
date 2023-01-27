import axios from "axios";
import { event_opinion_edit } from "../event/actions";
import {
  EVENT_OPINION_EDIT_FAIL,
  EVENT_OPINION_EDIT_REQUEST,
} from "../event/actionType";
const fetchEventOpinionEdit = (event_id, opinion_id, opinionText) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: EVENT_OPINION_EDIT_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/event/${event_id}/opinion-update/${opinion_id}`,
        { opinion: opinionText },
        config
      );
      dispatch(event_opinion_edit(data));
    } catch (error) {
      dispatch({
        type: EVENT_OPINION_EDIT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
};
export default fetchEventOpinionEdit;
