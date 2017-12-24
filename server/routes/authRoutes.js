const express = require('express')
const passport = require('passport')
const router = express.Router()

/*1.
when the user clicks login, they should be directed into the passport authentication flow.
'google' is the GoogleStrategy */
router.get('/google',
	passport.authenticate('google', {
	 scope: ['profile', 'email'] 
	})
);

/*2.
you can see on this url there is a code.
'google' is the GoogleStrategy.
get directed to this url 'auth/google/callback' when user grants permission to email.
send request to google with 'code included'.
google sees 'code' in url, replies with details about the user.
After this request is made, google strategy callback is called.
*/
router.get('/google/callback', 
	passport.authenticate('google'))
	// 	, {
	// 	failureRedirect: '/login'
	// }), 
	// function(req, res){
	// 	//succesful authentication, resdirect home
	// 	res.redirect('/')
	// })

router.get('/logout', (req, res)=>{
	//takes the cookie that contains the user id and kills it
	req.logout()
	console.log('hello')
	res.send(req.user)
})

module.exports = router