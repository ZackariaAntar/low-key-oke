const myFavorites = (state = [], action) => {
	switch (action.type) {
		case "SET_MY_FAVORITES":
			return action.payload;
		default:
			return state;
	}
};

// myFavorites will be on the redux state at:
// state.faves
export default myFavorites;
