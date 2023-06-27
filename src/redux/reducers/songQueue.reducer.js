const queue = (state = [], action) => {
	switch (action.type) {
		case "SET_QUEUE":
			return action.payload;
		default:
			return state;
	}
};

// queue will be on the redux state at:
// state.queue
export default queue;
