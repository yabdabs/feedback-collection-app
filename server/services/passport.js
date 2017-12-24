const passport = require('passport')
//we only care about the Strategy property
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_ID } = require("../../config/keys.js");
const mongoose = require('mongoose')
var User = require('../database/models/user')



/* purpose is to take model instance and turn it into id
purpose is to generate identifying piece of info from the user in DB that can be stored in cookie */
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
After this, the user model instance should be added to req object as req.user */
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
			//you can see on console.developers.google that we set 'Authorize Redirect URI' to http://localhost:3000/auth/google/callback'. The path will be appended with the authorization code for access
			callbackURL: '/auth/google/callback'
		},
		/*this callback function is executed when the user gets sent back to our server.
			so we can now use the info to create the user in our database.
			Access Token is what gives us access to the user.
			Refresh token allows us to refresh the access token since it expires in time.
			Profile has user information.	
			*/
		(accessToken, refreshToken, profile, done) => {
			console.log('access Token:', accessToken);
			console.log('refreshToken:', refreshToken)
			console.log('profile:', profile)
			console.log('done:', done	)


			//using promises
			//check to see if user with this googleId already exists
			User.findOne({googleId:profile.id})
				.then( (match) => {
					if(match){
						//user is already in db, skip
						//first arg in done is err obj, so it's null here since we have match
						return done(null, match)
					}
					else{
						//if user has not been created, create and save to db
						const newUser = new User({
							googleId: profile.id,
							email: profile.emails[0].value,
							name: profile.displayName
						})
						newUser.save()
							.then( (savedUser) =>{
								//the done callback says to resume the auth process
								// the next step is serialize, I think. savedUser gets passed to serialize
								return done(null, savedUser)
							})
							.catch((err)=>{
								console.log(err)
							})
					}//end else
				})
				.catch((err)=>{
					console.log(err)
				})
		}//end arrow function
	)//end GoogleStrategy
);

module.exports = passport






// USING CALLBACK FUNCTION INSTEAD OF ES6 PROMISES
// //check to see if user with this googleId already exists
// User.findOne({googleId: profile.id}, function(err, match){
// 	if(err) throw err

// 	//user is already in db, skip
// 	if(match){
// 		return done(null, match)
// 	}
// 	else{
// 		//if user has not been created, create and save to db
// 		const newUser = new User({
// 			googleId: profile.id, 
// 			email: profile.emails[0].value, 
// 			name: profile.displayName
// 		})

// 		newUser.save(function(err){
// 			if (err) throw err;
// 		})

// 	}//end else
// })//end findOne()