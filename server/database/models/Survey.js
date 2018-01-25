const mongoose = require('mongoose')
const Schema = mongoose.Schema
const RecipientSchema = require('./Recipient')
const User = require('./user')

/*We create a survey collection vs making a survey a sub docuemnt collection of a User collection bc a single record has a 4mb max size. That means You can only store 4mb worth on data in a single document(model instance)
(records/rows = document/object). Lets say that a user email is 20 bytes. That means 200,000 emails in recipients would be the max size for a document, in regards to storing emails alone(4mb/20bytes). If a user were to have mutliple survey sub document collections, within its user collection, that means a user would have to split 200,000 emails between all its surveys. 

However, since Survey is its own collection, that means it can have 200,000 emails in recipients for each survey document. And then we can just link these different survey documents to it's respective user document. 

We create recipients as a sub document collection of surveys collection because we would like to store the email and a boolean if the user answered the survey. Would be weird to to this in an array.
*/

const surveySchema = new Schema({
	title: String,
	body: String,
	subject: String,
	//an array containing a list of strings
	recipients: [RecipientSchema],
	yes: {
		type: Number,
		default: 0
	},
	no: {
		type: Number,
		default: 0
	},
	_user: {
		type: { Schema.Types.ObjectId, ref: 'User' }
		//ref means reference belongs to User collection
	},
	dateSent: Date,
	lastResponded: Date
})

var Survey = mongoose.model('Survey', surveySchema)

module.exports = Survey