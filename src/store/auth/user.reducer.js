import {SIGNIN_SUCCESS, SIGNIN_FAILURE, LOGOUT} from '../../constants/actionTypes';

const initialState = {
    signInSuccess: false,
    signInError: false,
    isAuthenticated: false,
    userData: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNIN_SUCCESS:
            localStorage.setItem("user", JSON.stringify({ ...action.payload }));
            return {
                ...state,
                signInSuccess: true,
                signInError: false
            };
        case SIGNIN_FAILURE:
            return {
                ...state,
                signInSuccess: false,
                signInError: true
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

export default userReducer;
