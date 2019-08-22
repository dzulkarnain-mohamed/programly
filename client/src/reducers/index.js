import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import lecturerReducer from "./lecturerReducer";
import studentReducer from "./studentReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  lecturer: lecturerReducer,
  student: studentReducer
});
