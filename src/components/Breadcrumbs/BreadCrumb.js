import React, { useState, useEffect } from "react";
import "./BreadCrumb.css";

const BreadCrumb = (props) => {
  //estado de componente donde se guardan las categorías desde servidor
  const [categories, setCategories] = useState([]);
  // se ejecuta si hay un cambio en el listado de categorías recibido
  useEffect(() => {
    setCategories(props.categories);
  }, [props.categories]);

  //funcion que arma el breadcrumb en html
  const renderCategories = () => {
    return categories.map((cat, index) => {
      if (categories[index + 1]) {
        return (
          <li className="itemBreadcrumb" key={index}>
            {" "}
            <a className="breadLink" href="javascript:void(0)">
              {" "}
              <small>{`${cat} > `} </small>
            </a>{" "}
          </li>
        );
      }
      return (
        <li key={index}>
          <a className="breadLink" href="javascript:void(0)">
            {" "}
            <small>{`${cat} `}</small>{" "}
          </a>{" "}
        </li>
      );
    });
  };

  return (
    <>
      {categories.length ? (
        <ul className="ulBreadcrumb">{renderCategories()}</ul>
      ) : (
        ""
      )}
    </>
  );
};

export default BreadCrumb;
