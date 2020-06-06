import express from 'express';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import knex from 'knex';
import register from './controllers/register';
import profile  from'./controllers/profile';
import signin  from'./controllers/signin';
import image from'./controllers/image';

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
app.put('/image', (req, res) => {image.handleImageCount(req, res, db)})
app.post('/signin', (req, res) => {signin.handleSignin(req, res, bcrypt, db)})
app.post('/register', (req, res) => {register.handleRegister(req, res, bcrypt, db)})
app.post('/imageurl', (req, res) => {image.handleImageApi(req, res)})

app.listen(process.env.PORT || 3000, ()=>{
	if (process.env.PORT) {console.log(`Server listening on Port ${process.env.PORT}`);}
	else {console.log(`Server listening on Port 3000`);}
})