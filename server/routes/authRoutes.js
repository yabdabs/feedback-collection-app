const passport = require('passport')

//if we were to use express Router
// const router = express.Router()

module.exports = (app) =>{
	/*1.
	when the user clicks login, they should be directed into the passport authentication flow.
	'google' is the GoogleStrategy */
	app.get('/auth/google',
		passport.authenticate('google', {
		 scope: ['profile', 'email'] 
		})
	);

	/*2.
	you can see on this url there is a code. 'google' is the GoogleStrategy. get directed to this url 'auth/google/callback' when user grants permission to email. send request to google with 'code included'. google sees 'code' in url, replies with details about the user. After this request is made, google strategy callback is called.
	*/
	app.get('/auth/google/callback', 
		passport.authenticate('google'),
		function(req, res){
			//succesful authentication, resdirect home
			res.redirect('/surveys')
		})

	app.get('/api/logout', (req, res)=>{
		//takes the cookie that contains the user id and kills it
		req.logout()

		console.log('logged out bitch req.user', req.user)//null
		res.send(req.user) //null
	})

	app.get('/api/current_user', (req,res) =>{
		//after deserializeUser, user from db is added to req
		res.send(req.user)
		// req.session contains the data that passport is trying to store inside the cookie. So cookie session extracts cookie data cookie, which came from request, and assigns it to req.session, then passes to passport. When the req object is passed to passport and passport is trying to pull user data out of the cookie, it is actually looking inside of req.session to do this. And then from here it passes it on to deserialize user.
		console.log(req.session)
	})
}
