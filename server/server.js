import express from "express";
import fs from "fs";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import cors from "cors";
import {
  searchApi,
  searchIdApi,
  searchDescriptionApi,
  searchCategoriesApi,
} from "./services/searchService";

import App from "../src/App";
//puerto a utilizar para el servidor en nod
const PORT = 8000;
//configuracion de express
const app = express();

//permite recibir peticiones del cliente a utilizar para no bloquear
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//ruta para buscar y devolver objeto personalizado
app.get("/api/items", async (req, res) => {
  //busqueda en el api de mercadolibre con la query de url
  const results = await searchApi(req.query.q);
  //array para las categorías de breadcrumb
  let categories = [];
  //array para los items encontrados
  let items = [];
  //si existen elementos en la ruta de categorías
  if (results?.filters[0]?.values[0]?.path_from_root?.length) {
    //recorrer la ruta con los elementos y adicionar cada nombre en el arreglo
    results.filters[0].values[0].path_from_root.forEach((element) => {
      categories.push(element.name);
    });
  }
  //si se encontraron resultados para esa busqueda
  if (results.results.length) {
    //recorrer cada item encontrado para generar solo 4 con la información personalizada
    results.results.map((result, index) => {
      if (index < 4) {
        const item = {
          id: result?.id,
          title: result?.title,
          price: {
            currency: result?.prices?.prices[0]?.currency_id,
            amount: new Intl.NumberFormat("de-DE").format(
              result?.prices?.prices[0]?.amount
            ),
          },
          picture: result?.thumbnail,
          condition: result?.condition,
          free_shipping: result?.shipping?.free_shipping,
          city_name: result?.address.city_name,
        };
        //adicionar item personalizado al array de items
        items.push(item);
      }
    });
  }
  //ojeto personalizado para respuesta de busqueda
  const products = {
    author: {
      name: "Diego",
      lastname: "Gallardo",
    },
    categories: categories,
    items: items,
  };
  res.send(products);
});
//ruta para obtener la información de un item en particular con id
app.get("/api/items/:id", async (req, res) => {
  // obtener resultados con el api de mercado libre
  const result = await searchIdApi(req.params.id);
  //obtener descripción de ese item
  const description = await searchDescriptionApi(req.params.id);
  //obtener la categoría del item encontrado
  const idCategory = result.category_id;
  // obtener el listado de categorías relacionadas
  // con ese id de categoría para el breadcrumb
  const resultsCategories = await searchCategoriesApi(idCategory);
  //objeto personalizado para enviar al cliente
  const product = {
    author: {
      name: "Diego",
      lastname: "Gallardo",
    },
    item: {
      id: result.id,
      title: result?.title,
      price: {
        currency: result?.currency_id,
        amount: new Intl.NumberFormat("de-DE").format(result?.price), // formato para separador de miles aleman
        decimal: "00",
      },
      picture: result?.pictures[0]?.url,
      condition: result?.condition,
      free_shipping: result?.shipping?.free_shipping,
      sold_quantity: result?.initial_quantity - result?.available_quantity,
      description: description?.plain_text,
    },
    categories: resultsCategories?.path_from_root,
  };
  //enviar objeto personalizado
  res.send(product);
});

//configuración para correr el servidor con el puerto configurado
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
