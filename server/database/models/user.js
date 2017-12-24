// Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
	googleId:{
		type: String,
		unique: true
	},
	email: String,
	name: String,

})
//To use our schema definition, we need to convert our userSchema into a Model we can work with. To do so, we pass it into mongoose.model(modelName, schema):
//A Model class represents a collection in MongoDB
//An model instance represents a document in MongoDB
var User = mongoose.model('User', userSchema)

module.exports = User