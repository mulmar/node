const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const signin = require('./controllers/signin');
const image = require('./controllers/image');

const db = knex ({
	client: 'pg',
	connection: {
	  host : '127.0.0.1',
	  user : 'postgres',
	  password : '0264',
	  database : 'smartbrain'
	}
  });

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res)=> {
	db.select('*').from('users')
	.then(users => {
			res.status(200).json(users)
	})
});	

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/signin', (req, res) => {signin.handleSignin(req, res, bcrypt, db)})
app.post('/register', (req, res) => {register.handleRegister(req, res, bcrypt, db)})

app.listen(3000, ()=>{
	console.log('Server listening on Port 3000...');
})