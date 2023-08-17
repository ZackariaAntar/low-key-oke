const verified = (
	state = false,
	action
) => {
	switch (action.type) {
		case "WELCOME_HOMIES":
			return true;
		default:
			return state;
	}
};

export default verified;
