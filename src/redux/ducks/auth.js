import { get, post } from "../../api/api";

const AUTH_STARTED = "auth/process/started";
const AUTH_SUCCEED = "auth/process/succeed";
const AUTH_FAILED = "auth/process/failed";
const AUTOLOGIN_RECEIVE_STARTED = "autologin/receive/started";
const AUTOLOGIN_RECEIVE_SUCCEED = "autologin/receive/succeed";

const initialState = {
  loading: false,
  success: false,
  error: false,
  isAdmin: false,
  fetching: false,
  authorized: false,
  jwt: localStorage.getItem("token"),
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case AUTH_STARTED:
      return {
        ...state,
        loading: true,
      };

    case AUTH_SUCCEED:
      return {
        ...state,
        jwt: action.payload,
        loading: false,
        authorized: true,
      };

    case AUTH_FAILED:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };

    case AUTOLOGIN_RECEIVE_STARTED:
      return {
        ...state,
        fetching: true,
      };

    case AUTOLOGIN_RECEIVE_SUCCEED:
      return {
        ...state,
        fetching: false,
        isAdmin: action.payload.status === "success",
      };

    default:
      return state;
  }
}

export function userAuthorised(login, password) {
  return (dispatch) => {
    dispatch({ type: AUTH_STARTED });

    post("/auth", { login, password }).then((json) => {
      if (json.status === "success") {
        if (json.hasOwnProperty("token")) {
          localStorage.setItem("token", json.token);
        }

        dispatch({
          type: AUTH_SUCCEED,
          payload: json,
        });
      } else {
        dispatch({
          type: AUTH_FAILED,
          payload: json,
        });
      }
    });
  };
}

// export function autologinReceived() {
//   return (dispatch) => {
//     dispatch({ type: AUTOLOGIN_RECEIVE_STARTED });
//
//     get("/autologin").then((json) => {
//       dispatch({
//         type: AUTOLOGIN_RECEIVE_SUCCEED,
//         payload: json,
//       });
//     });
//   };
// }
