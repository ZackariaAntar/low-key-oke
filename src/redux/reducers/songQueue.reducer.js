const queue = (
	state = [
		{
			url: "DykZEOV5wD4",
			user_id: "blank",
			title: "title",
			artist: "artist",
		},
		{
			url: "DykZEOV5wD4",
			user_id: "blank",
			title: "title",
			artist: "artist",
		},
	],
	action
) => {
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
