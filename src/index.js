import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/App";
import MarvelService from "./services/MarvelService";
import "./style/style.scss";

const marvelService = new MarvelService();

marvelService.getAllCharacters().then((res) =>
  res.data.results.forEach((element) => {
    console.log(element.name);
  })
); // отрімуємо усіх персонажів
// marvelService.getCharacterId(1011334).then((res) => console.log(res)); //отримуємо одного персонажа по id

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
