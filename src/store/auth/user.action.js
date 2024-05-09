import * as API from "../../api";
import {SIGNIN_SUCCESS, SIGNIN_FAILURE, LOGOUT} from "../../constants/actionTypes";
import getUserData from "../../api/user";

export const userSignIn = (formData, navigate) => async (dispatch) => {
    try {
        const response = await API.SIGN_IN({
            ...formData,
        });

        const user = await getUserData({username: formData.username, token: response.data.token})
        if (response.status === 200) {
            dispatch({
                type: SIGNIN_SUCCESS,
                payload: {data: user, token: response.data.token}
            });

            navigate("/analysis");
        } else {
            dispatch({type: SIGNIN_FAILURE});
        }
    } catch (error) {
        dispatch({type: SIGNIN_FAILURE});
    }
};

export const logout = () => (dispatch, navigate) => {
    dispatch({type: LOGOUT});
    navigate("/");
};
