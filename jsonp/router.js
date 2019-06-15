var express = require('express')
var router = express.Router();
router.get('/jsonp',(req,res)=>{
	var data = {
		name: 'xiaoming',
		age: 3,
		sex: '男'
	}
	res.send(req.query.callback + '(' + JSON.stringify(data) + ')' )
})
module.exports = router;
