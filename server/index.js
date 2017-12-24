const express = require("express");
const app = express();
const cookieSession = require('cookie-session')
const passport = require('passport')
const dbConnection = require('./database')
const keys = require('../config/keys')

require('./services/passport')


/*tell passport to make use of cookies to manage authentication inside of our application. The purpose of cookies is to help us keep track of the user who is logged in, since http is stateless. So whenever browser makes any request to the server, it will send that cookie(with identifying info) in the request. cookieSession extracts cookie data and then passport pulls user id out of cookie data, then deserializeUser*/
app.use(cookieSession({
	maxAge: 30 * 24 * 60 * 60 * 1000,
	keys: [keys.cookieKey]
	//keys is used to encrypt the cookie
}))

//tell passport to make use of cookies to handle authentication
app.use(passport.initialize())
app.use(passport.session())

//Express app Routing 
app.use('/auth', require('./routes/authRoutes'))

app.get('/api/something', (req,res) =>{
	//after deserializeUser, user from db is added to req
	res.send(req.user)
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
	console.log(`listening on port ${PORT}`);
});
