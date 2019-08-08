import authReducer from "./authReducer";
import { combineReducers } from "redux";
import vacationReducer from "./vacationReducer";
import adminReducer from "./adminReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  vacation: vacationReducer,
  admin: adminReducer
});

export default rootReducer;
