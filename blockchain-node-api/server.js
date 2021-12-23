const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const Web3 = require('web3');
const mongodb = require('mongodb').MongoClient;
const contract = require('@truffle/contract');
const artifacts = require('./build/contracts/Contacts.json');
const CONTACT_ABI = require('./config');
const CONTACT_ADDRESS = require('./config');

app.use(cors());
app.use(express.json());

if (typeof web3 !== 'undefined') {
	var web3 = new Web3(web3.currentProvider);
} else {
	var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
}

// const LMS = contract(artifacts);

// LMS.setProvider(web3.currentProvider);

mongodb.connect('mongodb://127.0.0.1:27017/blockchain-node-api',
	{
		useUnifiedTopology: true,
	}, async (err, client) => {
	const db =client.db('Cluster0');
	const accounts = await web3.eth.getAccounts();
	const contactList = new web3.eth.Contract(CONTACT_ABI.CONTACT_ABI, CONTACT_ADDRESS.CONTACT_ADDRESS);
	// const lms = await LMS.deployed();

	routes(app, db, accounts, contactList);
	app.listen(process.env.PORT || 3001, () => {
		console.log('listening on port '+ (process.env.PORT || 3001));
	});
});
