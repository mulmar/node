const handleSignin = (req, res, bcrypt, db)=> {
	if (!req.body.email || !req.body.password) {
		return res.status(400).json('form contains empty field(s)')
	}
	db.select('email','hash').from('login')
	.where('email','=', req.body.email)
	.then(data => {
		bcrypt.compare(req.body.password, data[0].hash, function(err, result) {
			if (result) {
				db.select('*').from('users')
				.where('email', '=', req.body.email)
				.then(user => {
					res.json(user[0])
				})
				.catch(err => res.status(400).json('unable to get user'))
				} else { res.status(400).json('wrong credentials')}
		})

	})
	.catch(err => res.status(404).json('cannot login'))
}

export default  {
    handleSignin: handleSignin
};