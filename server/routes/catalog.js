const express = require('express');
const router = express.Router();
import request from 'request';

/* GET users listing. */
router.post('/', (req, res, next) => {
	request('https://yts.ag/api/v2/list_movies.json?limit=16&page=' + req.body.pages + '&sort_by=rating&query_term=' + req.body.searchField, function(error, response, body){
		if (error) {
			console.log(error);
			res.json({error: error})
		}
		let infos = JSON.parse(body);
		res.json(infos);
	})
});

module.exports = router;