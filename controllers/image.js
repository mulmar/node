const handleImage = (req,res, db)=>{
	const { id } = req.body;
	db('users').where('id','=',req.body.id)
	.increment('entries',1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0])
	})
	.catch(err => res.status(400).json('cannot update entries'))
}

module.exports = {
    handleImage: handleImage
};