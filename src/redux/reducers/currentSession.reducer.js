const currentSession = (state = [], action) => {
	switch (action.type) {
		case "SET_CURRENT_SESSION":
			return [...action.payload];
		default:
			return state;
	}
};

// currentSession will be on the redux state at:
// state.seshInfo
export default currentSession;


