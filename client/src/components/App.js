import React from 'react'
//BrowserRouter interacts with the history library and decides what to do 
//based on a change in the url
//Route purpose is for the configuration of showing a certain component based on the url
import { BrowserRouter, Route} from 'react-router-dom'
import Header from './Header'
import Landing from './Landing'
import Surveys from './Surveys'
import * as actions from '../actions/index'
//wire up fetch_user action creator to this component
//connect is what connects redux store, or application state, to our components.
//....uses connect to map the stores state and dispatch to the props of a component 
import { connect }  from 'react-redux'

class App extends React.Component{

	/*when the component mounts, we call fetch_user action creator. this is to check weather user is logged in or not. Good spot in this component because other components might need to know if user is logged in. */
	componentDidMount(){
		this.props.fetchUser()
	}

	render(){
		return(
			<div className='container'>
				<BrowserRouter>
					<div>
						<Header />
						<Route exact path='/' component={Landing} />	
						<Route exact path='/surveys' component={Surveys} />				
					</div>					
				</BrowserRouter>
			</div>
		)
	}
}

export default connect(null, actions )(App)
