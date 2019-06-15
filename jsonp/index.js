var express = require('express');
var app = express();
var router = require('./router');
app.listen(3000,()=>{
	console.log("服务已开启，请访问localhost:3000")
})
app.use(express.static('./public'))
app.use(router)
