import jsonPlaceholder from "../apis/jsonPlaceholder";
import _ from "lodash";
// usando redux thunk!!!

// usando fetchPostsAndUsers, es el unico que se llama, ya no se llama fetchPosts y fetchUser por separado!!
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  // here, not only we are going to call fetchPosts/ fetchUser: fetchPosts(), we have to dispatch them too manually!!  dispatch(fetchPosts())
  await dispatch(fetchPosts());
  console.log(getState().posts);
  // usamos lodash map y uniq functions para sacar los user ids diferentes

  //   // aqui no hace falta poner await, porque después de esto no se hace nada más, no tiene que esperar a terminar esto, antes de hacer otra cosa!!
  //   // await no se puede usar en forEach!!
  //   const userIds = _.uniq(_.map(getState().posts, "userId"));
  //   userIds.forEach(id => dispatch(fetchUser(id)));

  //  LO DE ARRIBA ES EQUIVALENTE A (USANDO LODASH chain() method = encadena varios metodos que manipulan una serie de datos):
  _.chain(getState().posts)
    .map("userId")
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value();
  // esto significa: primero traigo el listado de posts de estado
  // después, cuando uso map con chain, el primer argumento de map es lo que devuelve la función de antes (el listado de posts), y el segundo userId
  // el resultado de map se lo pasa a otro método, uniq, como primer argumento
  // el resultado de uniq se le pasa a forEach, y dentro de forEach se llama un metodo para cada id, que es el dispatch(fetchUser(id)
  // HAY QUE AÑADIR .value() PARA QUE SE EJECUTE, DE OTRA MANERA NO HACE NADA !!
};

// BAD APPROACH!!!:
// export const fetchPosts = async () => {
//   // action creator makes a request
//   // Sin async/ await, response es una promesa, porque nos va a dar acceso a los datos cuando los tenga, en el futuro!!
//   let promise = await jsonPlaceholder.get("/posts");
//   // and returns an action object with our data on the payload property
//   // COMO ESTO ES ASINCRONO, HAY QUE USAR MIDDLEWARE (REDUX-THUNK)
//   return {
//     type: "FETCH_POSTS",
//     payload: promise
//   };
// };

// export const fetchPosts = () => {
//   // redux thunk devuelve una function que recibe como params el dispatch function de React
//   // pasamos actions dentro de dispatch function; estas actions se mandarán a todos los middlewares y finalmente se mandarán a los reducers
//   // dispatch function tiene poder ilimitado de iniciar cambios en los datos en la parte React de nuestra app.
//   // con dispatch podemos cambiar todos los datos que queramos, y con getState podemos leer o acceder a cualquier datos que queramos
//   return async (dispatch, getState) => {
//     let response = await jsonPlaceholder.get("/posts");
//     // en lugar de devolver un objeto action, devuelve una function dispatch, con el param action
//     dispatch({ type: "FETCH_POSTS", payload: response });
//     // return {
//     //   type: "FETCH_POSTS",
//     //   payload: response
//     // };
//   };
// };

// Esto es igual a: (refactorizado)!!

export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get("/posts");
  dispatch({ type: "FETCH_POSTS", payload: response.data });
};

export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);
  dispatch({ type: "FETCH_USER", payload: response.data });
};

// Solución usando memoize de lodash (solo se hace una unica llamada a la api por userId!!! ES MÁS DIFICIL DE ENTENDER
// Lo bueno, que no se hacen requests 10 veces para cada user, sino solo 1
// lo malo, si los datos del user han cambiado, no se reflejarán esos cambios, ya que solo se llama la primera vez
// Otra solución mejor, ENCIMA DE ESTO!!!)

// // Para no llamar fetchUser memoized cada vez que llamemos el action creator, hay que crear una función
// //fuera del action creator, memoize it, y usarlos en el action creator!!!

// // Function that returns a function that calls _fetchUser with the id and dispatch
// export const fetchUser = id => dispatch => _fetchUser(id, dispatch);

// // _ se usa para decir que es un metodo privado, y otros desarrolladores no deben modificarlo
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);
//   dispatch({ type: "FETCH_USER", payload: response.data });
// });

// export const fetchUser = function(id) {
//   return _.memoize(async function(dispatch) {
//     let response = await jsonPlaceholder.get(`/users/${id}`);
//     dispatch({ type: "FETCH_USER", payload: response.data });
//   });
// };

// SE pueden devolver acciones de tipo
// return {
//     type: "FETCH_POSTS",
//     payload: response
//   };
