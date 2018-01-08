import 'materialize-css/dist/css/materialize.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import App from './components/App'

//looks at index.js file, meaning importing combineReducers?
import reducers from './reducers'
import reduxThunk from 'redux-thunk'

//we need this because of ascync nature of axios call. It returns a promise and this middleware handles that promise for us
import promise from 'redux-promise'

//create a new instance of our redux store
//first arg is reducers we have in application
//second is initial state of application
//third is applyMiddleware
const store = createStore(reducers, {}, applyMiddleware(reduxThunk, promise))

ReactDOM.render(
	// Provider is a React component given to us by the “react-redux” library. 
  // It serves just one purpose : to “provide” the store to its child components.
  //Since our entire application is a child of Provider, then that means that Provider provides the store to our entire application
  //it knows when store is updated
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)

console.log('STRIPE KEY IS', process.env.REACT_APP_STRIPE_PUB_KEY)

console.log('STRIPE KEY IS', process.env.NODE_ENV)