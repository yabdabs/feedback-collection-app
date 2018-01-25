var mongoose = require('mongoose')

//es6 const { Schema }  = mongoose
var Schema = mongoose.Schema

/*The major difference is that subdocuments are not saved individually, they are saved whenever their top-level parent document is saved. */

const recipientSchema = new Schema({
	email: String,
	clicked: {
		type: Boolean,
		default: no
	}
})

module.exports = recipientSchema