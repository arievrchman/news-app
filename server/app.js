const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes')
require('dotenv').config()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.set('port', process.env.PORT || 3000);
app.use('/', routes)

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
