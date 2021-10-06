import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { searchApi } from "../../services/searchService";
import { Link } from "react-router-dom";
import "./Results.css";
import shipping from "../../assets/shipping.png";
import BreadCrumb from "../Breadcrumbs/BreadCrumb";
// diseño por cada uno de los productos encontrados tipo tarjeta
const CardProduct = (props) => {
  return (
    <Link className="decoration" to={`/items/${props.id}`}>
      <div className="cardProduct">
        <div className="picture">
          <img src={props.img} alt={props.img} />
        </div>
        <div className="detailsSearch">
          <div className="freeShipping">
            <h2>$ {props.price}</h2>
            {props.free_shipping ? (
              <img src={shipping} alt="free_shipping" />
            ) : (
              ""
            )}
          </div>
          <strong>{props.title}</strong>
        </div>
        <div className="city">
          <small>{props.city_name}</small>
        </div>
      </div>
    </Link>
  );
};

const Results = (props) => {
  let params = new URLSearchParams(useLocation().search);
  const [query, setQuery] = useState();
  const [results, setResults] = useState([]);
  const [categories, setCategories] = useState([]);
  // cuando hay un cambio en el estado de query se ejecuta el gargue de datos de servidor
  useEffect(() => {
    getData();
  }, [query]);
  //cuando hay un cambio en los parametros se actualiza el estado de query
  useEffect(() => {
    getQuery();
  }, [props.match.params]);

  //obtener el parametro search de la url
  const getQuery = () => {
    setQuery(params.get("search"));
  };
  //hacer llamado a los servicios para traer datos desde
  // el servidor con el parametro de busqueda
  const getData = async () => {
    //si existe el parametro como estado se ejecuta el servicio de busqueda
    if (query) {
      const results = await searchApi(query);
      setResults(results);
      setCategories(results.categories);
    }
  };

  //funcion que itera sobre cada uno de
  // los resultados para armar un componente de card por item encontrado
  const renderProducts = () => {
    return results.items.map((item) => (
      <div key={item.id} className="detailContainer">
        <CardProduct
          img={item.picture}
          price={item.price.amount}
          title={item.title}
          currency={item.price.currency}
          id={item.id}
          city_name={item.city_name}
          free_shipping={item.free_shipping}
        />
        <hr className="space" />
      </div>
    ));
  };

  return (
    <>    
      {results.items && results.items.length ? (
        <div className="resultsContainer">
          <div className="breadcrumb">
            <BreadCrumb categories={categories} />
          </div>
          {renderProducts()}
        </div>
      ) : (
        <h1>Cargando...</h1>
      )}
    </>
  );
};

export default Results;
