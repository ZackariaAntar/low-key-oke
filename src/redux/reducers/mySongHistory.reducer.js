const mySongHistory = (state = [], action) => {
	switch (action.type) {
		case "SET_MY_SONG_HISTORY":
			return action.payload;
		default:
			return state;
	}
};

// queue will be on the redux state at:
// state.queue
export default mySongHistory;
