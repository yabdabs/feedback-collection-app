const express = require("express");
const cookieSession = require('cookie-session')
const passport = require('passport')
const dbConnection = require('./database')
const keys = require('../config/keys')
const bodyParser = require('body-parser')
require('./services/passport')
const app = express();

app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))


/*tell passport to make use of cookies to manage authentication inside of our application. The purpose of cookies is to help us keep track of the user who is logged in, since http is stateless. So whenever browser makes any request to the server, it will send that cookie(with identifying info) in the request. cookieSession extracts cookie data (and stores it in req.session)and then passport pulls user id out of cookie data, then deserializeUser.

req.session contains the data that passport is trying to store inside the cookie
*/
app.use(cookieSession({
	maxAge: 30 * 24 * 60 * 60 * 1000,
	keys: [keys.cookieKey]
	//keys is used to encrypt the cookie
}))

//tell passport to make use of cookies to handle authentication
app.use(passport.initialize())
app.use(passport.session())

//Express app Routing 
require('./routes/authRoutes.js')(app)
require('./routes/billingRoutes.js')(app)
//we would use the below if we were using express Router
// app.use('/auth', require('./routes/authRoutes'))

if(process.env.NODE_ENV === 'production'){

// (If we do not have express route handler for the request), This first checks to see if there is a file the request is looking for. Express will serve up production assets like our main.js file or main.css file.
  app.use(express.static(path.join(__dirname, '/../client/build'));



	// //if we don't know what the route is, serve up the index.html file
	// app.get('*', (req,res) => {
	// 	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	// })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
	console.log(`listening on port ${PORT}`);
});
