import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import * as actions from '../actions/index'
//stripeCheckout component gives us the button to go to the form?
import StripeCheckout from 'react-stripe-checkout'


class Payments extends Component{

	onToken = (token) =>{
		console.log('inside onToken function', token)
		this.props.handleToken(token)
	}

	render(){
		return(
			<StripeCheckout 
				stripeKey = {process.env.REACT_APP_STRIPE_PUB_KEY}
				amount = {500} //cents
				//token-The callback to invoke when the Checkout process is complete. Stripe sends back a token(actually on object representing the entir charge) after it does it's authorization based on form data. id property represents the token
				token = {this.onToken} 
				name = 'Emaily'
				description= 'Buy more credits - 5 credits for $5'
			>
				<button className='btn'>Add Credits</button>
			</StripeCheckout>
		)
	}
}

export default connect(null, actions)(Payments)
