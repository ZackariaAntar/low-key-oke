import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
// worker Saga: will be fired on "MAKE_NEW_CODE" actions
function* makeHost(action) {
		console.log(
			"ARRIVED AT makeHost ON PARTICIPATION SAGA FROM RolePage",
			action.payload
		);
	try {
		// yield axios.put(`/api/user/make/host/${action.payload}`)
		yield put({ type: "MAKE_NEW_CODE", payload: action.payload});

	} catch (error) {
		console.log("MAKE_HOST UPDATE request failed", error);
	}
}

function* makeGuest(action) {
	console.log(
		"ARRIVED AT makeGuest ON PARTICIPATION SAGA FROM RolePage",
		action.payload
	);
	try {
		yield axios.post('/api/sesh/guest', {sesh_code: action.payload.sesh_code, user_id: action.payload.user_id})
		yield put({type: "FETCH_CURRENT_SESSION", payload: action.payload.user_id})

	} catch (error) {
		console.log("MAKE_GUEST UPDATE request failed", error);
	}
}

function* participationSaga() {
	yield takeLatest("MAKE_HOST", makeHost);
	yield takeLatest("MAKE_GUEST", makeGuest);
}

export default participationSaga;
