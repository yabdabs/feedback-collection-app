const passport = require('passport')
//we only care about the Strategy property
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_ID } = require("../../config/keys.js");
const mongoose = require('mongoose')
var User = require('../database/models/user')



/* purpose is to take model instance(user document) and turn it into id
purpose is to generate identifying piece of info from the user in DB that can be stored in cookie.
Attaches user to cookie
*/
passport.serializeUser( (user,done) =>{
	/*Lecture 39
	user represents the user we just pulled out of the db in the GS callback(after saving).
	we want to take this user model and generate identifying piece of information that can 
	be set as the cookie in the browser 

	user.id is the mongoDB generated id. We use this id because we can't assume the user used google auth. they could have used twitter or fb auth, and therefore they wouldn't have a googleId
	*/
	done(null, user._id)
})

/* purpose is to take id and turn it back into model instance.
when an http request is made, it will send the cookie with identifying info inside. This identifying piece of info is passed into deserializeUser to turn it into a user ... i.e use cookie info to check for user in DB.
After this, the user model instance should be added to req object as req.users */
passport.deserializeUser( (id,done)=>{
	User.findById(id)
		.then( (user)=>{
			done(null, user)
		})
})


//tell passport to use GoogleStrategy. Create new instance of GS and pass in
//configurations for authenticating users. Known as a strategy called 'google'
passport.use(new GoogleStrategy(
		{
			clientID: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			//after the user grants permission, send them to this route (redirect URI)
			//you can see on console.developers.google that we set 'Authorize Redirect URI' to http://localhost:5000/auth/google/callback'. The path will be appended with the authorization code for access
			callbackURL: '/auth/google/callback',
			//proxy true means that if we go through a proxy, like the heroku proxy, keep connection secured	
			proxy: true
		},
		/*this callback function is executed when the user gets sent back to our server after they grant permission 	and google sends back with details about user.
			so we can now use the info to create the user in our database.
			Access Token is what gives us access to the user.
			Refresh token allows us to refresh the access token since it expires in time.
			Profile has user information.	
			-We are using async/await syntax here
			*/
		async (accessToken, refreshToken, profile, done) => {
			console.log('access Token:', accessToken);
			console.log('refreshToken:', refreshToken)
			console.log('profile:', profile)
			console.log('done:', done	)

			//check to see if user with this googleId already exists
			const match = await User.findOne({googleId: profile.id})

			if(match){
				//done basically nudges on ot the next passport flow/proccess/w.e (serialize user? passing on match, which is the user frmo the db)
				return done(null, match)
			}

			//if user has not been created, create and save to db
			const newUser = new User({
				googleId: profile.id,
				email: profile.emails[0].value,
				name: profile.displayName
			})

			const savedUser =	await newUser.save()
			//the done callback says to resume the auth process
			// the next step is serialize, I think. savedUser gets passed to serialize
			return done(null, savedUser)

		}//end arrow function
	)//end GoogleStrategy
);

module.exports = passport






// //using promises
// //check to see if user with this googleId already exists
// User.findOne({googleId:profile.id})
// 	.then( (match) => {
// 		if(match){
// 			//user is already in db, skip
// 			//first arg in done is err obj, so it's null here since we have match
// 			return done(null, match)
// 		}
// 		else{
// 			//if user has not been created, create and save to db
// 			const newUser = new User({
// 				googleId: profile.id,
// 				email: profile.emails[0].value,
// 				name: profile.displayName
// 			})
// 			newUser.save()
// 				.then( (savedUser) =>{
// 					//the done callback says to resume the auth process
// 					// the next step is serialize, I think. savedUser gets passed to serialize
// 					return done(null, savedUser)
// 				})
// 				.catch((err)=>{
// 					console.log(err)
// 				})
// 		}//end else
// 	})
// 	.catch((err)=>{
// 		console.log(err)
// 	})