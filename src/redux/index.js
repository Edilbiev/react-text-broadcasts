import { applyMiddleware, combineReducers, createStore } from "redux";
import onlines from "./reducers/onlines";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger/src";
import posts from "./reducers/posts";
import auth from "./reducers/auth";

const logger = createLogger({
  diff: true,
  collapsed: true,
});

const reducer = combineReducers({ onlines, posts, auth });

export const store = createStore(reducer, applyMiddleware(thunk, logger));
