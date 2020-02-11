// REDUCERS receive two arguments: state (lo que devolvío este reducer la ultima vez que se llamó) and action!!
// First time that reducer is called, is going to receive two arguments: undefined (state), y action object 1
// the reducer is taking this two arguments and return some initial state value (state1) !!
// para controlar si el valor es undefined, se pone el valor por defecto:
// const selectedSongReducer = (seletedSong = null, action) => {...}
// este valor puede ser: null (object), [], '', 0, dependiendo del tipo esperado

// la segunda vez que el reducer está llamado, el primer parámetro (state) ya no será undefined, sino lo que haya devuelto el reducer la vez anterior (state1)

// conclusión: al reducer se le pasan dos params: state (con un valor por defecto, en caso de undefined), y action, y devuelve un nuevo state modificado!!!
export default (state = [], action) => {
  // ALWAYS IT HAS TO RETURN SOMETHING THAT IS NOT UNDEFINED (null, array, string, ...)!!

  //   if (action.type === "FETCH_POSTS") {
  //     return action.payload;
  //   }
  //   return state;

  // normalmente se usa switch, para comprobar action.type:
  switch (action.type) {
    case "FETCH_POSTS":
      return action.payload;
    case "FETCH_POSTS1":
      return action.payload;
    default:
      return state;
  }
};
// si se cambia algo en el estado, es lo mejor crear otro array/ objeto con map, para que react lo reconozca como nuevo, ya que se comprueba si es la misma direccion de memoria, no un valor diferente!!!
// si se devuelve el mismo state, no re vuelve a renderizar el componente!!
