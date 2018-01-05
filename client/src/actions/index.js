import axios from 'axios'
import { FETCH_USER } from './types'
//after we create action creator you have to make sure you wire it up to app	



// using async/await. Look at vid 79 for more of a refactor
export const fetchUser = () =>{
	/*we use redux thunk middleware because we want action to be dispatched only once the request has been succesfully completed. So instead of returning an action, we are returning a function when the action creator is called. The purpose of redux thunk middleware is to inspect whatever value we return from this action creator. If redux think sees that a function is returned instead of an action, it will automatically pass in the dispatch function as an argument. Remember that the dispatch function sends the action to all of the reducers in the store, causing them to instantly recalculate app state. So once the promise is resolved, only then will the action be dispatched */
	return async function(dispatch){
		const res = await axios.get('/api/current_user')
		console.log('inside of fetchUser action creator async', res)

		dispatch({
			type: FETCH_USER,
			payload: res.data
		})
	}
}

export const logoutUser = () =>{
	return async (dispatch)=>{
		const res = await axios.get('/api/logout')
		console.log('inside logoutUser action creator', res) //null
		
		dispatch({ type: FETCH_USER, payload: res.data })
	}
}
















/*-----------------------------------------------------------------------------------------------------------------------
FURTHER SIMPLIFICATION/REFACTOR FOR fetchUser. In arrow functions, if there is single expression within curly braces, automatic return is implied. So we don't need return keywowrd here, or curly braces.

export const fetchUser = () => 
	async dispatch => {
	const res = axios.get('/api/current_user')
	dispatch({ type: FETCH_USER, payload: res })
}	
----------------------------------------------------------------------------------------------------------------------*/



/*-----------------------------------------------------------------------------------------------------------------------
USING PROMISES
export const fetchUser = () =>{

	we use redux thunk middleware because we want action to be dispatched only once the request has been succesfully completed. So instead of returning an action, we are returning a function when the action creator is called. The purpose of redux thunk middleware is to inspect whatever value we return from this action creator. If redux think sees that a function is returned instead of an action, it will automatically pass in the dispatch function as an argument. Remember that the dispatch function sends the action to all of the reducers in the store, causing them to instantly recalculate app state. So once the promise is resolved, only then will the action be dispatched 

	return function(dispatch){
		axios.get('/api/current_user')
			.then( (res)=>{
				dispatch({
					type: FETCH_USER,
					payload: res
				})
			})
	}
}
----------------------------------------------------------------------------------------------------------------------*/
