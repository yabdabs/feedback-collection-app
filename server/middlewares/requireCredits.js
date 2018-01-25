module.exports = (req,res,next) =>{
	if(req.user.credits < 1){
		//403 is forbidden, 401 is unauthorized
		return res.status(403).send({err: 'you need to buy more credits broke ass bish'})
	}

	next()
}