import axios from "axios";
import { event_update } from "../event/actions";
import { EVENT_UPDATE_FAIL, EVENT_UPDATE_REQUEST } from "../event/actionType";
const fetchEventUpdate = (
  id,
  editTitle,
  editDescription,
  editDetails,
  editDeadline,
  editTags
) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: EVENT_UPDATE_REQUEST });
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
        `/api/event/${id}/update/`,
        {
          title: editTitle,
          description: editDescription,
          details: editDetails,
          deadline: editDeadline,
          tags: editTags,
        },
        config
      );
      dispatch(event_update(data));
    } catch (error) {
      dispatch({
        type: EVENT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
};
export default fetchEventUpdate;
