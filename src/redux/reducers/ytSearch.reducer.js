const loading = (state = {loading:true, blurb:"Finding songs related to your search..."}, action) => {
	switch (action.type) {
		case "PICK_SONG_FROM_LIST":
			return action.payload;
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
