const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const routes = require('./routes')
require('dotenv').config()

mongoose.connect('mongodb://localhost:27017/news_app',{ useNewUrlParser: true })

const userRoute = require('./routes/route_user')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.set('port', process.env.PORT || 3000);

app.use('/user', userRoute)

app.use('/', routes)

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});