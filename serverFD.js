import express from 'express';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import knex from 'knex';

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

const saltRounds = 10;

//To check a password:
// Load hash from your password DB.

app.get('/profile/:id', (req, res)=> {
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
})

app.put('/image', (req,res)=>{
	const { id } = req.body;
	db('users').where('id','=',req.body.id)
	.increment('entries',1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0])
	})
	.catch(err => res.status(400).json('cannot update entries'))
})


app.post('/signin', (req, res)=> {
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


})


app.post('/register', (req, res)=> {
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
})

app.listen(3000, ()=>{
	console.log('Server listening on Port 3000...');
})