const loading = (state = {loading:true, blurb:"Confirming your song selection..."}, action) => {
	switch (action.type) {
		case "SONG_FOUND":
			return action.payload;
		case "SONG_NOT_FOUND":
			return action.payload;
		default:
			return state;
	}
};

// loading will be on the redux state at:
// state.loading
export default loading;
