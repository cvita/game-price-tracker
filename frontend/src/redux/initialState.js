const initialState = {
  allGames: [],
  popularGames: [],
  autoSuggestions: [],
  searchResults: [],
  activeGame: null,
  priceAlertCreated: false,
  userInfo: {
    email: null,
    onBlacklist: null,
    gameId: null,
    title: null,
    price: null,
    created: null,
    expires: null
  },
  errors: []
};


export default initialState;
