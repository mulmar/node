const Clarifai = require('clarifai');
require('dotenv').config()

const app = new Clarifai.App({apiKey: process.env.API_KEY});

const handleApi = (req,res) => {
	app.models.predict(Clarifai.GENERAL_MODEL,req.body.input)
	.then(data => {
		res.json(data)
	})
	.catch(err => res.status(123).json('niet goed'))
}


const handleApiFace = (req,res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
	.then(data => {
		res.json(data)
	})
	.catch(err => res.status(123).json('niet goed'))
}

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
	handleImage: handleImage,
	handleApi: handleApi,
	handleApiFace: handleApiFace
};