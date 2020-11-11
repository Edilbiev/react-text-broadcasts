export const setOrderReversed = (id) => {
  const ls = JSON.parse(localStorage.getItem("reversed")) || {};

  if (ls[id] !== undefined) {
    ls[id] = !ls[id];
  } else {
    ls[id] = true;
  }

  localStorage.setItem("reversed", JSON.stringify(ls));
}

export const setPostsCount = (id, count) => {
  const postsCount = JSON.parse(localStorage.getItem("postsCount")) || {};

  postsCount[id] = count;

  localStorage.setItem("postsCount", JSON.stringify(postsCount));
}

export const setMainEventsBarOpened = (id) => {
  const ls = JSON.parse(localStorage.getItem("mainEventsBarOpened")) || {};

  if (ls[id] !== undefined) {
    ls[id] = !ls[id];
  } else {
    ls[id] = true;
  }

  localStorage.setItem("mainEventsBarOpened", JSON.stringify(ls));
}