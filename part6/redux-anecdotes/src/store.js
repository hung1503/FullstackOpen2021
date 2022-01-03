import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import anecdoteReducer from "./reducers/anecdoteReducer";
import notificatonReducer from "./reducers/notificationReducer";

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificatonReducer
})

const store = createStore(reducer, composeWithDevTools());

export default store;