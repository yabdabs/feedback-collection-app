 //commit this so that heroku can read it?
 module.exports = {
 	GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
 	GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
 	mongoURI: process.env.MONGO_URI,
 	cookieKey: process.env.COOKIE_KEY,
 	stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
 	secret_key: process.env.STRIPE_SECRET_KEY
}