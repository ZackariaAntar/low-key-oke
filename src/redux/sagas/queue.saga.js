import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// worker Saga: will be fired on "FETCH_QUEUE" actions
function* fetchQueue() {
	try {
		const seshQueue = yield axios.get("/api/songs");
        
		yield put({ type: "SET_QUEUE", payload: seshQueue.data });
	} catch (error) {
		console.log("Queue get request failed", error);
	}
}

function* queueSaga() {
	yield takeLatest("FETCH_QUEUE", fetchQueue);
}

export default queueSaga;
