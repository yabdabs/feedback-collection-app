import { combineReducers } from 'redux'
import authReducer from './authReducer'


/*Just a quick note. Each reducer is contained in their own file. Question, if we print out the state object inside of a reducer, does it print the entire application state? */


//store states in respective keys
export default combineReducers({
	auth: authReducer
})