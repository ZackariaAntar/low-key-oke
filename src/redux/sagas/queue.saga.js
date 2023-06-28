import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// worker Saga: will be fired on "FETCH_QUEUE" actions
function* fetchQueue(action) {
	try {
		const seshQueue = yield axios.get(`/api/songs/host/view/${action.payload}`);

		yield put({ type: "SET_QUEUE", payload: seshQueue.data });
	} catch (error) {
		console.log("Queue GET request failed", error);
	}
}
function* fetchMyCurrentSongs(action) {
	try {
		const seshQueue = yield axios.get(`/guest/current/${action.payload}`)

		yield put({ type: "SET_MY_CURRENT_SESSION_SONGS", payload: seshQueue.data });
	} catch (error) {
		console.log("myCurrentSongs GET request failed", error);
	}
}
function* fetchMySongHistory(action) {
	try {
		const seshQueue = yield axios.get(`/guest/all/history/${action.payload}`)


		yield put({ type: "SET_MY_SONG_HISTORY", payload: seshQueue.data });
	} catch (error) {
		console.log("mySongHistory GET request failed", error);
	}
}


function* postToQueue(action){
    console.log(action.payload);
    try {
		yield axios.post("/api/songs",action.payload);
		yield put({ type: "FETCH_QUEUE"});
	} catch (error) {
		console.log("Queue POST request failed", error);
	}
}
function* removeFromQueue(action){
    console.log("IN REMOVE FROM QUEUE SAGA", action.payload);
    try {
		yield axios.put(`/api/songs/remove/${action.payload.id}`);
		yield put({ type: "FETCH_QUEUE", payload: action.payload.host_id});
	} catch (error) {
		console.log("REMOVE FROM QUEUE REQUEST FAILED", error);
	}
}

function* queueSaga() {
	yield takeLatest("FETCH_QUEUE", fetchQueue);
    yield takeLatest("POST_TO_QUEUE", postToQueue)
    yield takeLatest("FETCH_MY_CURRENT_SESSION_SONGS", fetchMyCurrentSongs)
    yield takeLatest("FETCH_MY_SONG_HISTORY", fetchMySongHistory)
    yield takeLatest("REMOVE_FROM_QUEUE", removeFromQueue)
}

export default queueSaga;
