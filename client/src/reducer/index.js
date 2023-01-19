const initialState = {
  games: [],
  allGames: [],
  genres: [],
  allGenres: [],
  platforms: [],
  detail: []
}

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_GAMES':
      return {
        ...state,
        games: action.payload,
        allGames: action.payload
      }
    case 'GET_GENRES':
        return {
          ...state,
          genres: action.payload,
          allGenres: action.payload
      }
    case 'GET_PLATFORMS':
        return {
          ...state,
          platforms: action.payload,
      }
    case 'ORDER_GAMES_BY_RATING':
      let orderRating = action.payload === 'rat-asc' ?
        state.games.sort(function (a, b) {
          if (a.rating > b.rating) {
            return 1;
          } else if (a.rating < b.rating) {
              return -1;
          }
          return 0 
        }) : 
        state.games.sort(function (a, b) {
          if (a.rating > b.rating) {
            return -1;
          } else if (a.rating < b.rating) {
              return 1;
          }
          return 0 
        })
        return {
          ...state,
          games: orderRating
      }
    case 'ORDER_GAMES_BY_NAME':
      let orderName = action.payload === 'nam-asc' ?
        state.games.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          } else if (a.name < b.name) {
              return -1;
          }
          return 0 
        }) : 
        state.games.sort(function (a, b) {
          if (a.name > b.name) {
            return -1;
          } else if (a.name < b.name) {
              return 1;
          }
          return 0 
        })
        return {
          ...state,
          games: orderName
      }
    case 'FILTER_GAME_BY_CREATED':
      const filterGameCreated = action.payload === 'vid-cre' ? state.allGames.filter(el => el.createdInDB) : state.allGames.filter(el => !el.createdInDB)
      const resultFilterGameCreated = () => {
        if (action.payload === 'all-games') { 
          return state.allGames
        } else if (!filterGameCreated.length) {
            alert('No games in the DB yet :(')
            return state.allGames
          } else {
              return filterGameCreated;
            }
      }
      return {
        ...state,
        games: resultFilterGameCreated()
        // games: action.payload === 'all-games' ? state.allGames : filterGameCreated, 
      }
    case 'FILTER_GAME_BY_GENRE':
      const allGamesByGenre = state.allGames
      const genreFilterDb = allGamesByGenre.filter(game => {
        if(game.createdInDB) {
          let infoGenre = game.genres
          return infoGenre.map(el => el.name).includes(action.payload)
        }
      })
      const genreFilterApi = allGamesByGenre.filter(game => {
        if(game.genres) {
          const infoGenre = game.genres
          return infoGenre.includes(action.payload)
        }
      })
      const allGenresApiDb = genreFilterApi.concat(genreFilterDb);
      const resultFilterGenre = () => {  
        if (action.payload === 'all-genres') { 
          return allGamesByGenre 
        } else if (!allGenresApiDb.length) {
            alert(`No games of genre ${action.payload} :( Try with another`)
            return allGamesByGenre
          } else {
              return allGenresApiDb;
            }
      }
      return {
        ...state,
        games: resultFilterGenre()
    }
    case 'SEARCH_GAME_NAME':
      return {
        ...state,
        games: action.payload  
      }
    case 'POST_GAME':
      return {
        ...state,
      }
    case 'GET_GAME_DETAIL':
      return{
        ...state,
        detail: action.payload
      }
    case 'DELETE_GAME':
      return {
        ...state,
      }
    case 'UPDATE_GAME':
      return {
        ...state,
      }
    default:  
      return state
  }
};

export default rootReducer;