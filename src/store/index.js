import { combineReducers } from "redux";

import user from "./auth/user.reducer";

const rootReducer = combineReducers({ user });

export default rootReducer;
