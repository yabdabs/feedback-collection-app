const requireCredits = require('../middlewares/requireCredits')
const requireLogin = require('../middlewares/requireLogin')


module.exports = (app) => {
	app.get('/api/surveys', requireLogin, requireCredits, (req,res) => {
		console.log(req.user)
	})

	app.post('/api/surveys', (req,res) => {
		console.log(req.user)
	})

	app.post('/api/surveys/webhooks', (req,res) =>{
		console.log(req.user)

	})
}