import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { useSelector } from "react-redux";
// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
	try {
		const config = {
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
		};

		// the config includes credentials which
		// allow the server session to recognize the user
		// If a user is logged in, this will return their information
		// from the server session (req.user)
		const response = yield axios.get("/api/user", config);

		// now that the session has given us a user object
		// with an id and username set the client-side user object to let
		// the client-side code know the user is logged in
		yield put({ type: "SET_USER", payload: response.data });
	} catch (error) {
		console.log("User get request failed", error);
	}
}

function* updateUserHost(action) {
	console.log("IN UPDATE USER HOST!", action.payload);
	try {
		yield axios.put(`/api/user/host`, action.payload);
		yield put({ type: "FETCH_USER" });
	} catch (error) {
		console.log("UPDATE HOST ERROR", error);
	}
}

function* updateUserGuest(action) {
  console.log("IN UPDATE USER GUEST!", action.payload);
	try {
		yield axios.put(`/api/user/guest`, action.payload);
		yield put({ type: "FETCH_USER" });
	} catch (error) {
		console.log("UPDATE GUEST ERROR", error);
	}
}

function* userSaga() {
	yield takeLatest("FETCH_USER", fetchUser);
	yield takeLatest("UPDATE_USER_HOST", updateUserHost);
	yield takeLatest("UPDATE_USER_GUEST", updateUserGuest);
}

export default userSaga;
