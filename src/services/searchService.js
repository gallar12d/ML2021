import { URL_API } from "../config/const";

export const searchApi = async (query) => {
  const path = `/api/items?q=${query}`;
  let res = await fetch(URL_API + path, {
    method: "GET",
  });
  return res.json();
};
export const searchIdApi = async (id) => {
  const path = `/api/items/${id}`;
  let res = await fetch(URL_API + path, {
    method: "GET",
  });
  return res.json();
};
