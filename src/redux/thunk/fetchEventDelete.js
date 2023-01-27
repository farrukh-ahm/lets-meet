import axios from "axios";
import { event_delete } from "../event/actions";
import { EVENT_DELETE_FAIL, EVENT_DELETE_REQUEST } from "../event/actionType";
const fetchEventDelete = (_id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: EVENT_DELETE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.delete(`/api/event/${_id}/delete/`, config);
      dispatch(event_delete(data));
    } catch (error) {
      dispatch({
        type: EVENT_DELETE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
};
export default fetchEventDelete;
