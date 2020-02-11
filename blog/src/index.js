// ESTO SE PONE EN TODAS LAS APPS REACT!!!!!

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import App from "./components/App/App";
import reducers from "./reducers";
// IMPORTAR redux-thunk
import thunk from "redux-thunk";

// wire up to a redux store throught the use of applyMiddleware (metodo de redux)
// con esto, cada vez que se envia un action, la action va a ser enviada antes a redux-thunk como middleware
// y después de redux-thunk el action va a ser enviado a todos los reducers

// cuando hemos añadido redux-thunk, han cambiado las reglas de los action creators
// en los action creators, ya no se devuelve un objeto action, sino que se pueden devolver funciones también
// este método va a ser automaticamente llamado con dispatch y getState arguments, lo que va a dar control sobre modificar/ devolver info fuera del redux store!!
// Cada vez que queramos hacer una llamada API a un action creator, siempre debemos usar redux-thunk, o cualquiera!!
// un metodo asincrono del action creator es una funcion que devuelve una funcion
const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
