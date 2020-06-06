const saltRounds = 10;

const handleRegister = (req, res, bcrypt, db)=> {
	if (!req.body.name || !req.body.email || !req.body.password) {
		return res.status(400).json('form contains empty field')
	}
	bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
		db.transaction(trx =>{ // you need to create a transaction if you need to do more than two things in the database
			trx.insert({
				hash : hash,
				email: req.body.email
			})
			.into('login')
			.returning('email')
			.then(loginEmail => {
				return trx('users')
				.returning('*')
				.insert({
					name: req.body.name,
					email: loginEmail[0],
					entries: 0,
					joined: new Date()
				})
				.then(user => {
					res.json(user[0]);
				})	
			})
			.then(trx.commit)
			.catch(trx.rollback)
		})
		.catch(err => res.status(400).json('registration failed'));
	});		
}

module.exports = {
    handleRegister: handleRegister
};