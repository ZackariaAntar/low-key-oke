import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
// worker Saga: will be fired on "MAKE_NEW_CODE" actions
function* updateCurrentSession(action) {
	console.log(
		"ARRIVED AT updateCurrentSession ON currentSession SAGA",
	);
	try {
		const currentSession = yield axios.get(`/api/sesh/current/${action.payload}`)
        yield put({ type: "SET_CURRENT_SESSION", payload: currentSession.data });
	} catch (error) {
		console.log("MAKE_HOST UPDATE request failed", error);
	}
}


function* currentSessionSaga() {
	yield takeLatest("FETCH_CURRENT_SESSION", updateCurrentSession);

}

export default currentSessionSaga;


