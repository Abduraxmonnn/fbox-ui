import * as API from "../api";
import { SIGNIN_SUCCESS, SIGNIN_FAILURE, LOGOUT  } from "../constants/actionTypes";

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const response = await API.SIGN_IN({
            ...formData,
        });
        const { data } = response;
        console.log(data);
        if (response.status === 200) {
            dispatch({ type: SIGNIN_SUCCESS });
            navigate("/analysis");
        } else {
            dispatch({ type: SIGNIN_FAILURE });
        }
    } catch (error) {
        console.error(error);
        dispatch({ type: SIGNIN_FAILURE });
    }
};

export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT });
};