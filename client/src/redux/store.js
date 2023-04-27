import { combineReducers, configureStore } from "@reduxjs/toolkit";

/** call reducers */
import userReducer from "./user_reducer";
import questionReducer from "./question_reducer";
import resultReducer from "./result_reducer";

const rootReducer = combineReducers({
  user: userReducer,
  questions: questionReducer,
  result: resultReducer,
});

/** create store with reducer */
export default configureStore({ reducer: rootReducer });
