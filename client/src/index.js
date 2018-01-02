import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import App from './components/App'
//looks at index/js
import reducers from './reducers'

//create a new instance of our redux store
//first arg is reducers we have in application
//second is initial state of application
//third is applyMiddleware
const store = createStore(reducers, {}, applyMiddleware())

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