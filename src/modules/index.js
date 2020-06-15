import { combineReducers } from "redux";
import auth from './auth';
import user from './user';

/* 리듀서를 합치는 rootReducer */
const rootReducer = combineReducers({
  auth,
  user,
})

export default rootReducer;