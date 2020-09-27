export function fetchRequest(path, method, params) {
  const ip = "http://151.248.117.7:5005/api";
  return fetch(ip + path, {
    method,
    headers: {
      "x-auth-token": localStorage.getItem("token"),
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    withCredentials: true,

    body: JSON.stringify(params),
  }).then((res) => res.json());
}

export function post(path, params) {
  return fetchRequest(path, "post", params);
}

export function del(path, params) {
  return fetchRequest(path, "delete", params);
}

export function get(path, params) {
  return fetchRequest(path, "get", params);
}

export function patch(path, params) {
  return fetchRequest(path, "patch", params);
}