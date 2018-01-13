module.exports = (req,res,next) =>{
	if(!req.user){
		//403 is forbidden, 401 is unauthorized
		return res.status(403).send({err: 'you need to login mufcka bish'})
	}

	next()
}