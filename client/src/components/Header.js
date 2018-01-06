import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../actions/index'

class Header extends Component{

	logoutUser = () => {
		console.log('inside of logout user function in header', this.props)
		this.props.logoutUser()
	}

	renderContent = () => {
		switch(this.props.auth){
			case null:
				return

			case false:
				return <li><a href="/auth/google">Google Sign In</a></li>

			default:
				return <div><li><a>{this.props.auth.name}</a></li><li><Link to='/' onClick={this.logoutUser}>Logout</Link></li></div>
		}
	}

	render(){
		return(
			<div>
				<nav>
				  <div className="nav-wrapper">
				    <Link to= {this.props.auth ? '/surveys' : '/'} className="left brand-logo">Emaily</Link>
				    <ul id="nav-mobile" className="right hide-on-med-and-down">
				    	{/*{this.props.auth ? <li><a href="#">{this.props.auth.name}</a></li> : <li><a href="#">Google Sign In</a></li>} */}
				    	{this.renderContent()}
				    </ul>
				  </div>
				</nav>
			</div>
		)
	}
}


// mapStateToProps and mapDispatchToProps are both pure functions that are provided the stores “state” and “dispatch” respectively
// Both mapStateToProps and mapDispatchToProps have to return an object, 
// whose keys will then be passed on as the props of the component they are connected to.


// The intent of a mapDispatch function is to return an object, and each key/value in the object will become a prop for the component. It's to hook action creators to a components props.
// In mapStateToProps you assign what information in your store you want to be available inside the component 
// Since reducers hold our application level state, and we are in a component, that means if we want to use app level state inside of our component, we must use mapStateToProps. app level state and store are the same thing
//mapStateToProps is saying map the app level state to the components props
function mapStateToProps(state){
	console.log('inside of mapStateToProps in Header', state)
	return{
		auth: state.auth
	}
}

export default connect(mapStateToProps, { logoutUser })(Header)