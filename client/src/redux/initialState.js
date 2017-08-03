const initialState = {
  allGames: [],
  newGames: [],
  autoSuggestions: [],
  searchResults: [],
  activeGame: null,
  priceAlertCreated: false,
  userInfo: {
    userEmail: null,
    onBlacklist: null,
    game_id: null,
    price: null,
    dateAdded: null,
    expiration: null
  },
  errors: []
};


export default initialState;
