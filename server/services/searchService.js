const axios = require("axios");
export const searchApi = async (query) => {
  const url = `https://api.mercadolibre.com/sites/MLA/search?q=${query}`;
  const res = await axios.get(url);
  return res.data;
};
export const searchIdApi = async (id) => {
  try {
    const url = `https://api.mercadolibre.com/items/${id}`;
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    return [];
  }
};
export const searchDescriptionApi = async (id) => {
  try {
    const url = `https://api.mercadolibre.com/items/${id}/description`;
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    return [];
  }
};

export const searchCategoriesApi = async (id) => {
  try {
    const url = `https://api.mercadolibre.com/categories/${id}/`;
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    return [];
  }
};
