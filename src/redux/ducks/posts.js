import { del, fetchRequest, patch, post } from "../../api/api";

const LOAD_STARTED = "posts/load/started";
const LOAD_SUCCEED = "posts/load/succeed";
const CREATE_STARTED = "post/create/started";
const CREATE_SUCCEED = "post/create/succeed";
const DELETE_STARTED = "post/delete/started";
const DELETE_SUCCEED = "post/delete/succeed";
const EDIT_STARTED = "post/edit/started";
const EDIT_SUCCEED = "post/edit/succeed";
const BASCKPOSTS_LOAD_STARTED = "backposts/load/started";
const BASCKPOSTS_LOAD_SUCCEED = "backposts/load/succeed";
const BASCKPOSTS_APPEND = "backposts/append/succeed";

const initialState = {
  loading: false,
  backLoading: false,
  items: [],
  temp: [],
  creating: false,
  deleting: false,
  editing: false,
};

export default function broadcasts(state = initialState, action) {
  switch (action.type) {
    case LOAD_STARTED:
      return {
        ...state,
        items: [],
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

    case BASCKPOSTS_LOAD_STARTED:
      return {
        ...state,
        backLoading: true,
      };

    case BASCKPOSTS_LOAD_SUCCEED:
      return {
        ...state,
        temp: action.payload,
        backLoading: false,
      };

    case BASCKPOSTS_APPEND:
      const lastPostTime = state.items[state.items.length - 1].createdDate;

      return {
        ...state,
        temp: [],
        items: [
          ...state.items.filter((item) => !item.separate),
          {
            content: "Новые посты",
            separate: true,
            _id: "separate1",
            createdDate: Date.parse(lastPostTime) + 500,
          },
          ...state.temp,
        ],
      };

    default:
      return state;
  }
}

export function postsLoaded(id) {
  return (dispatch) => {
    dispatch({
      type: LOAD_STARTED,
      payload: id,
    });

    fetchRequest(`/onlines/${id}`)
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

export function postCreated(id, title, content, important) {
  return (dispatch) => {
    dispatch({ type: CREATE_STARTED });

    post(`/post/${id}`, { title, content, important }).then((json) => {
      dispatch({
        type: CREATE_SUCCEED,
        payload: json,
      });
    });
  };
}

export function postDeleted(postId) {
  return (dispatch) => {
    dispatch({ type: DELETE_STARTED });

    del(`/post/${postId}`).then((json) => {
      dispatch({
        type: DELETE_SUCCEED,
        payload: postId,
      });
    });
  };
}

export function postEdited(postId, title, content, important) {
  return (dispatch) => {
    dispatch({ type: EDIT_STARTED });

    patch(`/post/${postId}`, { title, content, important }).then((json) => {
      dispatch({
        type: EDIT_SUCCEED,
        payload: json,
      });
    });
  };
}

export function backgroundPostsLoaded(id) {
  return (dispatch, getState) => {
    const { items } = getState().posts;

    fetchRequest(`/onlines/${id}`).then((json) => {
      const lastPostTime = items[items.length - 1]?.createdDate;

      const backgroundPosts = json.filter(
        (item) => new Date(item.createdDate) > new Date(lastPostTime)
      );

      dispatch({
        type: BASCKPOSTS_LOAD_SUCCEED,
        payload: backgroundPosts,
      });
    });
  };
}

export function backpostsAppended() {
  return {
    type: BASCKPOSTS_APPEND,
  };
}
