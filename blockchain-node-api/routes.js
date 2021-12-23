function routes(app, db, accounts, contactList) {
	app.get('/contacts', async (request, response) => {
		let cache = [];
		const COUNTER = await contactList.methods.count().call();

		for (let i = 1; i <= COUNTER; i++) {
      const contact = await contactList.methods.contacts(i).call();
      cache = [...cache, contact];
    }
    
    response.json(cache);
  });
}

module.exports = routes
