const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const keys = require('../../config/keys')

// open a connection to the feedback-app database on our locally running instance of MongoDB.
mongoose.connect(keys.mongoURI)

// We have a pending connection to the test database running on localhost. We now need to get notified if we connect successfully or if a connection error occurs
var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', function(){
	console.log(`we're connected!`)
})

module.exports = db