import axios from "axios";
import { login, register } from "../user/actions";
import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST } from "../user/actionType";

const fetchUserRegister = (fname, lname, email, password, phoneNumber) => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const username = email.split("@")[0];
      const { data } = await axios.post(
        "/api/auth/create/",
        {
          first_name: fname,
          last_name: lname,
          email: email,
          username: username,
          phone_number: phoneNumber,
          password: password,
        },
        config
      );
      dispatch(register(data));
      dispatch(login(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
};

export default fetchUserRegister;
