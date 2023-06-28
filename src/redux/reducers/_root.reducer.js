import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import queue from './songQueue.reducer';
import seshInfo from './currentSession.reducer'
import mySongs from './myCurrentQueue.reducer'

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
	errors, // contains registrationMessage and loginMessage
	user, // will have an id and username if someone is logged in
	queue, // will have all of the queue data for all users from the queue table for users associated with a session and its host
	seshInfo, // will have the user's current session code
	mySongs, // will have the user's current session songs in the queue.
});

export default rootReducer;
