import { del, get, patch, post } from "../api/api";

export function onlinesLoaded() {
  return (dispatch) => {
    dispatch({ type: "onlines/load/started" });

    fetch("http://151.248.117.7:5005/api/onlines")
      .then((response) => response.json())
      .then((json) => {
        // if(json.status === "unauthorized") {
        //
        // }
        dispatch({
          type: "onlines/load/succeed",
          payload: json,
        });
      });
  };
}

export function onlineCreated(title, introtext, photoId) {
  return (dispatch) => {
    dispatch({ type: "online/create/started" });

    post("/onlines", { title, introtext, photoId }).then((json) => {
      dispatch({
        type: "online/create/succeed",
        payload: json,
      });
    });
  };
}

export function onlineDeleted(onlineId) {
  return (dispatch) => {
    dispatch({ type: "online/delete/started" });

    del("/onlines", onlineId).then((json) => {
      dispatch({
        type: "online/delete/succeed",
        payload: json,
      });
    });
  };
}

export function onlineEdited(onlineId) {
  return (dispatch) => {
    dispatch({ type: "online/edit/started" });

    patch("/onlines", onlineId).then((json) => {
      dispatch({
        type: "online/edit/succeed",
        payload: json,
      });
    });
  };
}

export function postsLoaded(id) {
  return (dispatch) => {
    dispatch({
      type: "live/load/started",
      payload: id,
    });

    fetch(`http://151.248.117.7:5005/api/onlines/${id}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: "live/load/succeed",
          payload: json,
        });
      });
  };
}

export function postCreated(id, title, content, important) {
  return (dispatch) => {
    dispatch({ type: "post/create/started" });

    post(`/post/${id}`, { title, content, important }).then((json) => {
      dispatch({
        type: "post/create/succeed",
        payload: json,
      });
    });
  };
}

export function postDeleted(id, postId) {
  return (dispatch) => {
    dispatch({ type: "post/delete/started" });

    del(`/post/${id}`, postId).then((json) => {
      dispatch({ type: "post/delete/succeed" });
    });
  };
}

export function postEdited(id, postId) {
  return (dispatch) => {
    dispatch({ type: "post/edit/started" });

    patch(`/post/${id}`, postId).then((json) => {
      dispatch({ type: "post/edit/succeed" });
    });
  };
}

export function userAuthorised(login, password) {
  return (dispatch) => {
    dispatch({ type: "auth/process/started" });

    post("/auth", { login, password }).then((json) => {
      if (json.status === "success") {
        if (json.hasOwnProperty("token")) {
          localStorage.setItem("token", json.token);
        }

        dispatch({
          type: "auth/process/succeed",
          payload: json,
        });
      } else {
        dispatch({
          type: "auth/process/failed",
          payload: json,
        });
      }
    });
  };
}

export function orderReversed(id) {
  const ls = JSON.parse(localStorage.getItem("reversed")) || {};

  if (ls[id] !== undefined) {
    ls[id] = !ls[id];
  } else {
    ls[id] = true;
  }

  localStorage.setItem("reversed", JSON.stringify(ls));

  return {
    type: "posts/order/reversed",
    payload: id,
  };
}

export function postsCountSet(id, count) {
  const postsCount = JSON.parse(localStorage.getItem("postsCount")) || {};

  postsCount[id] = count;

  localStorage.setItem("postsCount", JSON.stringify(postsCount));

  return {
    type: "posts/count/set",
    payload: { id, count },
  };
}

export function mainEventsBarHandled(id) {
  const ls = JSON.parse(localStorage.getItem("mainEventsBarOpened")) || {};

  if (ls[id] !== undefined) {
    ls[id] = !ls[id];
  } else {
    ls[id] = true;
  }

  localStorage.setItem("mainEventsBarOpened", JSON.stringify(ls));

  return {
    type: "main/events/handled",
    payload: id,
  };
}

export default function autologinReceived() {
  return (dispatch) => {
    dispatch({ type: "autologin/receive/started" });

    get("/autologin").then((json) => {
      dispatch({
        type: "autologin/receive/succeed",
        payload: json,
      });
    });
  };
}
