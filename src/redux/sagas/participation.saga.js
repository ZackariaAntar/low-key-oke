import { put, takeLatest } from "redux-saga/effects";
// worker Saga: will be fired on "MAKE_HOST" actions
function* makeHost(action) {
	console.log("REACHED MAKE HOST SAGA user id:", action.payload);
	try {
		yield put({ type: "MAKE_NEW_CODE", payload: action.payload});

	} catch (error) {
		console.log("MAKE_HOST UPDATE request failed", error);
	}
}
// worker Saga: will be fired on "MAKE_GUEST" actions
function* makeGuest(action) {
	console.log('REACHED MAKE GUEST SAGA payload:', action.payload);
	try {
		yield put({ type: "UPDATE_USER_GUEST", payload: {code: action.payload.newCode, auth: 2, user: action.payload.user}});

	} catch (error) {
		console.log("MAKE_GUEST UPDATE request failed", error);
	}
}

function* participationSaga() {
	yield takeLatest("MAKE_HOST", makeHost);
	yield takeLatest("MAKE_GUEST", makeGuest);
}

export default participationSaga;
