import React from "react";
import { useHistory, Link } from "react-router-dom";
import "./Search.css";
import logo from "../../assets/logo.png";
import searchIcon from "../../assets/search.png";

const Search = (props) => {
  let history = useHistory();
  const [search, setSearch] = React.useState("");
  //funcion que actualiza el estado cuando el input cambia
  const inputHandler = (value) => {
    if (value) setSearch(value);
  };

  //funcion que actializa la url con parámetro nuevo de busqueda
  const updateSearch = () => {
    //si existe parametro en el estado del componente se actualiza la url para busqueda
    if (search) history.push(`/items?search=${search}`);
  };

  return (
    <div className="container">
      <form
        className="search"
        onSubmit={(e) => {
          e.preventDefault();
          updateSearch();
        }}
      >
        <Link to="/">
          <img className="logo" src={logo} alt="" />
        </Link>

        <input
          onChange={(e) => {
            inputHandler(e.target.value);
          }}
          type="text"
          placeholder="Nunca dejes de buscar"
        />
        <button type="submit">
          <img className="searchIcon" src={searchIcon} alt="Submit" />
        </button>
      </form>
    </div>
  );
};

export default Search;
