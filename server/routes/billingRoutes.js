const keys = require('../../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey)
const User = require('../database/models/user')

//USING ASYNC/AWAIT
module.exports = (app)=>{
	app.post('/api/stripe', async (req,res)=>{

		console.log(req.body)

		const charge = await stripe.charges.create({
			amount: 500,
			currency: 'usd',
			source: req.body.id,
			description: 'purchasing 5 moffucking credits fo 5 dollas using async/await'
		})

		//we don't need to do this bc req.user is user from db already
		// const user = await User.findById(req.user._id))
		 		
 		req.user.credits = req.user.credits + charge.amount/100

 		const newUser = await req.user.save()
	 	 
	 	res.send(newUser)
	})
}




/* -------------------------------------PRACTICE--------------------------------------------------------

USING PROMISE.ALL, ASSUMING WE DON'T HAVE REQ.USER AND DIDN'T KNOW ABOUT THE AMOUNT
module.exports = (app) =>{
	app.post('/api/stripe', (req,res) => {
		const charge = stripe.charges.create({
			amount: 500,
			currency: 'usd',
			source: req.body.id,
			description: 'purchasing5 dollas using promises'
		})
		// console.log("CHARGE PROMISE \n")
		// console.log(charge)

		const user = charge.then( (charges) => {
			return User.findById(req.user._id)
		})

		Promise.all([charge, user]).then( (values) =>{
			// console.log('PROMISE.ALL VALUES \n')
			// console.log(values)
			const user1 = values[1]
			const charge1 = values[0]
			user1.credits += charge1.amount/100

			return user1.save()
		})
		.then( (updatedUser) => {
			console.log(updatedUser)
		})
		.catch( (err) => {
			console.log(err)
		})
	})
}
*/


/*-------------------------------------PRACTICE-------------------------------------------------------

USING PROMISES, USING REQ.USER SINCE WE HAVE IT, AND USING FIXED AMOUNT SINCE WE KNOW IT
module.exports = (app) =>{
	app.post('/api/stripe', (req,res) => {
		stripe.charges.create({
			amount: 500,
			currency: 'usd',
			source: req.body.id,
			description: 'purchasing5 dollas using promises'
		})
		.then( (charge) =>{
			req.user.credits += 5
			return req.user.save()
		})
		.then( (updatedUser) => {
			console.log(updatedUser)
		})
	})
}
*/