//a reducer is just a function that returns state?/h	s our app state

//this reducer is for weather or not the user is currently logged in. I also added on logging out action creator to the FETCH_USER case. when the user logs out, null is returned from server, which is false. so action.payload is false/null. So Auth state gets updated to false, and then the sign in componenent in header is rendered.

import { FETCH_USER } from '../actions/types'

export default function(state= null, action){
	switch(action.type){
		case FETCH_USER:
			console.log('inside of FETCH_USER reducer case', action)
		
			return action.payload || false

		default:
			return state
	}
}