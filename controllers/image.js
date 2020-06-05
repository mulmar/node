const Clarifai = require('clarifai');

const app = new Clarifai.App({apiKey: '5a3cc156bb2047a3966fbd3bf93e6616'});

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