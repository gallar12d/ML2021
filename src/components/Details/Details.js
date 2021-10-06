import { React, useEffect, useState } from "react";
import { useParams } from "react-router";
import { searchIdApi } from "../../services/searchService";
import "./Details.css";
import BreadCrumb from "../Breadcrumbs/BreadCrumb";

const Details = () => {
  //id es el parametro de la url para el item, o sea el id del producto
  const { id } = useParams();
  //estado product donde se guarda la información que viene de servidor
  const [product, setProduct] = useState({});
  //estad categories donde se guarda la información para breadcrumb desde servidor
  const [categories, setCategories] = useState({});

  //se ejecuta en cuando el componente se monta
  useEffect(() => {
    getData();
  }, []);

  //hace el llamado a la api del servidor para traer datos con un id de producto
  const getData = async () => {
    //valida si existe el id del producto para hacer el llamado a la api
    if (id) {
      const product = await searchIdApi(id);
      //actualiza el estado del componente con la información de un producto encontrado
      setProduct(product);
      //actualiza las categorías encontradas para ese producto
      getCategories(product.categories);
    }
  };
  // funcion que extre solo el nombre de las categorías, el servidor envia nombre y id_category
  const getCategories = (categories) => {
    const newCategorires = categories.map((cat) => {
      return cat.name;
    });
    setCategories(newCategorires);
  };

  return (
    <>
      {product.item ? (
        <div className="generalContainer">
          <div className="breadcrumb">
            <BreadCrumb categories={categories} />
          </div>
          <div className="detailContainer">
            <div className="inLine">
              <div className="image">
                <img src={product.item.picture} alt={product.item.id} />
              </div>
              <div className="details">
                <span>
                  {product.item.condition == "new" ? "Nuevo" : "Usado"} -{" "}
                  {product.item.sold_quantity} vendidos
                </span>
                <h3>
                  <strong>{product.item.title}</strong>
                </h3>
                <h1>$ {product.item.price.amount}</h1>
                <button>Comprar</button>
              </div>
            </div>
            <div className="description">
              <h2>Descripción del producto</h2>
              <small>{product.item.description}</small>
            </div>
          </div>
        </div>
      ) : (
        <h2>Cargando..</h2>
      )}
    </>
  );
};

export default Details;
