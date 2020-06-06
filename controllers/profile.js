const handleProfileGet = (req, res, db)=> {
	const { id } = req.params; // with this destructuring you can replace every req.params.id with id
	db.select('*').from('users').where({id : req.params.id})
	.then(user => {
		if (user.length) {
			res.status(200).json(user[0])
		} else { 
			throw new Error('could not find user')
		}
	})
	.catch(err => res.status(404).json(err.message))
}

export default {
    handleProfileGet: handleProfileGet
};