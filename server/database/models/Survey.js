const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*We create a survey collection vs making a survey a subcollection of a User collection bc a collection has a 4mb max size. Lets say that a user email is 20 bytes. That means 200,000 emails in recipients would be the max size for a collection, in regards to storing emails alone(4mb/20bytes). If a user were to have mutliple survey subcollections, within its user collection, that means a user would have to split 200,000 usernames between all its surveys. 

However, since Survey is its own collection, that means it can have 200,000 emails in recipients for each survey collection. And then we can just link these different survey collections to it's respective user collection. 

We create recipients as a sub document of surveys collection because we would like to store the email and a boolean if the user answered the survey. Would be weird to to this in an array.
*/

const surveySchema = new Schema({
	'title': String,
	'body': String,
	'subject': String,
	//an array containing a list of strings
	'recipients': [String],
	'yes': {
		type: Number,
		default: 0
	},
	'no': {
		type: Number,
		default: 0
	}
})

var Survey = mongoose.model('Survey', surveySchema)

module.exports = Survey