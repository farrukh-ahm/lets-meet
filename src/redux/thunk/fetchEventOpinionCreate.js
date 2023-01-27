import axios from "axios";
import { event_opinion_create } from "../event/actions";
import {
  EVENT_OPINION_CREATE_FAIL,
  EVENT_OPINION_CREATE_REQUEST,
} from "../event/actionType";
const fetchEventOpinionCreate = (id, opinionText) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: EVENT_OPINION_CREATE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/event/${id}/opinion/`,
        {
          opinion: opinionText,
        },
        config
      );
      dispatch(event_opinion_create(data));
    } catch (error) {
      dispatch({
        type: EVENT_OPINION_CREATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
};
export default fetchEventOpinionCreate;
