import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger/src";
import onlines from "./ducks/onlines";
import posts from "./ducks/posts";
import auth from "./ducks/auth";

const logger = createLogger({
  diff: true,
  collapsed: true,
});

const reducer = combineReducers({ onlines, posts, auth });

export const store = createStore(reducer, applyMiddleware(thunk, logger));
