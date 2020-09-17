export function fetchRequest(path, method, params) {
  const ip = "http://151.248.117.7:5005/api";
  return fetch(ip + path, {
    method,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify(params),
  }).then((res) => res.json());
}

export function post(path, params) {
  return fetchRequest(path, "post", params);
}
