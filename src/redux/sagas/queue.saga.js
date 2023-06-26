import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// worker Saga: will be fired on "FETCH_QUEUE" actions
function* fetchQueue() {
	try {
		const seshQueue = yield axios.get("/api/songs");

		yield put({ type: "SET_QUEUE", payload: seshQueue.data });
	} catch (error) {
		console.log("Queue GET request failed", error);
	}
}

function* postToQueue(action){
    console.log(action.payload);
    try {
		yield axios.post("/api/songs", action.payload);
		yield put({ type: "FETCH_QUEUE"});
	} catch (error) {
		console.log("Queue POST request failed", error);
	}
}

function* queueSaga() {
	yield takeLatest("FETCH_QUEUE", fetchQueue);
    yield takeLatest("POST_TO_QUEUE", postToQueue)
}

export default queueSaga;
