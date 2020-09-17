export const isAdmin =
  localStorage.getItem("token") === null
    ? false
    : localStorage.getItem("token") !== "";
