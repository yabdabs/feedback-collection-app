
//keys.js -- figure out which set of credentials to return based on environment
if(process.env.NODE_ENV === 'production'){
	//we are in production, return the prod set of keys
		module.exports = require('./prod.js')
}
else{
	//we are in development, return the dev set of keys
	module.exports = require('./dev.js')
}