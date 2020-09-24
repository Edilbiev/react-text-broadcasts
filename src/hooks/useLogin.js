import {useEffect, useMemo, useState} from "react";
import { get } from "../api/api";

export default function useLogin() {
  const [admin, setAdmin] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    get("/autologin").then((json) => {
      if (json.status === "success") {
        setAdmin(true);
      }

      setFetching(false);
    });
  }, [setAdmin, setFetching])

  return useMemo(() => [admin, fetching], [admin, fetching]);
}
