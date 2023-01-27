import axios from "axios";
import { event_details } from "../event/actions";
import { EVENT_DETAILS_FAIL, EVENT_DETAILS_REQUEST } from "../event/actionType";
const fetchEventDetails = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: EVENT_DETAILS_REQUEST });
      const { data } = await axios.get(`/api/event/${id}`);
      dispatch(event_details(data));
    } catch (error) {
      dispatch({
        type: EVENT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
};
export default fetchEventDetails;
