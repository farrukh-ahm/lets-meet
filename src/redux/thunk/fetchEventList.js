import axios from "axios";
import { event_list } from "../event/actions";
import { EVENT_LIST_FAIL, EVENT_LIST_REQUEST } from "../event/actionType";
const fetchEventList = async (dispatch) => {
  try {
    dispatch({ type: EVENT_LIST_REQUEST });
    const { data } = await axios.get(`/api/event/all/`);
    dispatch(event_list(data));
  } catch (error) {
    dispatch({
      type: EVENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export default fetchEventList;
