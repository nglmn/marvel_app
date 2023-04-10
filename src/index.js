import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/App";
// import MarvelService from "./services/MarvelService";
import "./style/style.scss";

// const marvelService = new MarvelService();

// marvelService.getAllCharacters().then((res) =>
// 	res.data.results.forEach((element) => {
// 		console.log(element.name);
// 	}),
// ); // отрімуємо усіх персонажів
// marvelService
// 	.getCharacterById(1011005)
// 	.then((res) => console.log(res.data.results[0].name)); //отримуємо імя одного персонажа по id

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
