import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
// worker Saga: will be fired on "MAKE_NEW_CODE" actions
function* makeHost(action) {
	try {
		yield put({ type: "MAKE_NEW_CODE", payload: action.payload});

	} catch (error) {
		console.log("MAKE_HOST UPDATE request failed", error);
	}
}

function* makeGuest(action) {
	try {
		yield put({ type: "UPDATE_USER", payload: {code: newCode, auth: 2, user: action.payload}});

	} catch (error) {
		console.log("MAKE_GUEST UPDATE request failed", error);
	}
}

function* participationSaga() {
	yield takeLatest("MAKE_HOST", makeHost);
	yield takeLatest("MAKE_GUEST", makeGuest);
}

export default participationSaga;
