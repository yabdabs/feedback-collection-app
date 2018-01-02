import { combineReducers } from 'redux'
import authReducer from './authReducer'

//store states in respective keys
export default combineReducers({
	auth: authReducer
})