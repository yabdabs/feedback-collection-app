const keys = require('../../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey)


module.exports = (app)=>{
	app.post('/api/stripe', async (req,res)=>{
		// console.log(req.body)
		// console.log('\n')

		 const charge = await stripe.charges.create({
			amount: 500,
			currency: 'usd',
			source: req.body.id,
			description: 'purchasing 5 moffucking credits fo 5 dollas using async/await'
		})

		 console.log('CHARGE \n')
		 console.log(charge)
	})
}

// //USING PROMISES
// app.post('/api/stripe', (req,res) => {
// 	stripe.charges.create({
// 		amount: 500,
// 		currency: 'usd',
// 		source: req.body.id,
// 		description: 'purchasing5 dollas using promises'
// 	})
// 	.then( (charges) => {
// 		console.log(charges)
// 	})
// })