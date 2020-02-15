const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const UsersRouter = require('./users/routes.config');

app.use(function (req, res, next) {
    // res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Credentials', 'true');
    // res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    // res.header('Access-Control-Expose-Headers', 'Content-Length');
    // res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});

app.use(bodyParser.json());
// for debugging
app.use(function (req, res, next) {
	console.log(req.body);
	return next();
});
UsersRouter.routesConfig(app);

app.listen(3600, function () {
	console.log('app listening on port 3600');
})