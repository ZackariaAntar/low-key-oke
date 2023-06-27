const myCurrentQueue = (state = [], action) => {
	switch (action.type) {
		case "SET_MY_CURRENT_SESSION_SONGS":
			return action.payload;
		default:
			return state;
	}
};

// queue will be on the redux state at:
// state.queue
export default myCurrentQueue;
