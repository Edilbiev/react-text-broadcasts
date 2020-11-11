import { del, fetchRequest, patch, post } from "../../api/api";
import {setMainEventsBarOpened, setOrderReversed, setPostsCount} from "../../utils/localStorageItemsSetters";

const LOAD_STARTED = "onlines/load/started";
const LOAD_SUCCEED = "onlines/load/succeed";
const CREATE_STARTED = "online/create/started";
const CREATE_SUCCEED = "online/create/succeed";
const DELETE_STARTED = "onlines/delete/started";
const DELETE_SUCCEED = "onlines/delete/succeed";
const EDIT_STARTED = "onlines/edit/started";
const EDIT_SUCCEED = "onlines/edit/succeed";
const POSTS_REVERSED = "posts/order/reversed";
const POSTS_COUNT_SET = "posts/count/set";
const MAIN_EVENTS_HANDLED = "main/events/handled";

const reversed =
  localStorage.getItem("reversed") === null
    ? {}
    : JSON.parse(localStorage.getItem("reversed"));

const postsCount =
  localStorage.getItem("postsCount") === null
    ? {}
    : JSON.parse(localStorage.getItem("postsCount"));

const mainEventsBarOpened =
  localStorage.getItem("mainEventsBarOpened") === null
    ? {}
    : JSON.parse(localStorage.getItem("mainEventsBarOpened"));

const initialState = {
  loading: false,
  items: [],
  creating: false,
  editing: false,
  deleting: false,
  reversed,
  postsCount,
  mainEventsBarOpened,
};

export default function onlines(state = initialState, action) {
  switch (action.type) {
    case POSTS_REVERSED:
      const oldValue =
        state.reversed[action.payload] !== undefined
          ? state.reversed[action.payload]
          : false;

      return {
        ...state,
        reversed: {
          ...state.reversed,
          [action.payload]: !oldValue,
        },
      };

    case POSTS_COUNT_SET:
      return {
        ...state,
        postsCount: {
          ...state.postsCount,
          [action.payload.id]: action.payload.count,
        },
      };

    case MAIN_EVENTS_HANDLED:
      const prevValue =
        state.mainEventsBarOpened[action.payload] !== undefined
          ? state.mainEventsBarOpened[action.payload]
          : false;

      return {
        ...state,
        mainEventsBarOpened: {
          ...state.mainEventsBarOpened,
          [action.payload]: !prevValue,
        },
      };

    case LOAD_STARTED:
      return {
        ...state,
        loading: true,
      };

    case LOAD_SUCCEED:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };

    case CREATE_STARTED:
      return {
        ...state,
        creating: true,
      };

    case CREATE_SUCCEED:
      return {
        ...state,
        items: [action.payload, ...state.items],
        creating: false,
      };

    case DELETE_STARTED:
      return {
        ...state,
        deleting: true,
      };

    case DELETE_SUCCEED:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
        deleting: false,
      };

    case EDIT_STARTED:
      return {
        ...state,
        editing: true,
      };

    case EDIT_SUCCEED:
      return {
        ...state,
        items: state.items.map((item) => {
          if (item._id === action.payload._id) {
            return action.payload;
          }

          return item;
        }),
        editing: false,
      };

    default:
      return state;
  }
}

export function onlinesLoaded() {
  return (dispatch) => {
    dispatch({ type: LOAD_STARTED });

    fetchRequest("/onlines")
      .then((json) => {
        dispatch({
          type: LOAD_SUCCEED,
          payload: json,
        });
      })
      .catch((error) => {
        alert("Возникла ошибка при загрузке данных");
      });
  };
}

export function onlineCreated(title, introtext, photoId) {
  return (dispatch) => {
    dispatch({ type: CREATE_STARTED });

    post("/onlines", { title, introtext, photoId }).then((json) => {
      dispatch({
        type: CREATE_SUCCEED,
        payload: json,
      });
    });
  };
}

export function onlineDeleted(onlineId) {
  return (dispatch) => {
    dispatch({ type: DELETE_STARTED });

    del(`/onlines/${onlineId}`).then((json) => {
      dispatch({
        type: DELETE_SUCCEED,
        payload: onlineId,
      });
    });
  };
}

export function onlineEdited(onlineId, title, introtext) {
  return (dispatch) => {
    dispatch({ type: EDIT_STARTED });

    patch(`/onlines/${onlineId}`, { title, introtext }).then((json) => {
      dispatch({
        type: EDIT_SUCCEED,
        payload: json,
      });
    });
  };
}

export function orderReversed(id) {
  // const ls = JSON.parse(localStorage.getItem("reversed")) || {};
  //
  // if (ls[id] !== undefined) {
  //   ls[id] = !ls[id];
  // } else {
  //   ls[id] = true;
  // }
  //
  // localStorage.setItem("reversed", JSON.stringify(ls));
  setOrderReversed(id);

  return {
    type: POSTS_REVERSED,
    payload: id,
  };
}

export function postsCountSet(id, count) {
  // const postsCount = JSON.parse(localStorage.getItem("postsCount")) || {};
  //
  // postsCount[id] = count;
  //
  // localStorage.setItem("postsCount", JSON.stringify(postsCount));
  setPostsCount(id, count);

  return {
    type: POSTS_COUNT_SET,
    payload: { id, count },
  };
}

export function mainEventsBarHandled(id) {
  // const ls = JSON.parse(localStorage.getItem("mainEventsBarOpened")) || {};
  //
  // if (ls[id] !== undefined) {
  //   ls[id] = !ls[id];
  // } else {
  //   ls[id] = true;
  // }
  //
  // localStorage.setItem("mainEventsBarOpened", JSON.stringify(ls));
  setMainEventsBarOpened(id);

  return {
    type: MAIN_EVENTS_HANDLED,
    payload: id,
  };
}
