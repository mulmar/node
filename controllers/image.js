const Clarifai = require('clarifai');
require('dotenv').config()

const app = new Clarifai.App({apiKey: process.env.API_KEY});

const handleImageApi = (req,res) => {
	let apiModel
	if (req.body.model === 'GENERAL_MODEL') {apiModel = Clarifai.GENERAL_MODEL}
	if (req.body.model === 'FACE_DETECT_MODEL') {apiModel = Clarifai.FACE_DETECT_MODEL}
	app.models.predict(apiModel,req.body.input)
	.then(data => {
		res.json(data)
	})
	.catch(err => res.status(123).json('error in API call to clarifai'))
}

const handleImageCount = (req,res, db)=>{
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
	handleImageCount: handleImageCount,
	handleImageApi: handleImageApi
};