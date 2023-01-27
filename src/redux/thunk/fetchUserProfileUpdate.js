import axios from "axios";
import { login, userProfileUpdate } from "../user/actions";
import {
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
} from "../user/actionType";

const fetchUpdateUserProfile = (editFirstname, editLastname) => {
  console.log(editFirstname, editLastname);
  return async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
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
        `/api/profile/update-profile/`,
        {
          first_name: editFirstname,
          last_name: editLastname,
        },
        config
      );
      dispatch(userProfileUpdate(data));
      dispatch(login(data));
      localStorage.setItem("leets_meet_userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
};

export default fetchUpdateUserProfile;
