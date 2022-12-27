const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const routes = require('./routes')
const session = require('express-session');
const cookieParser = require('cookie-parser')
const MongoDBStore = require('connect-mongodb-session')(session);

const app = express()
const PORT = config.get('serverPort')

app.use(express.static('../client'));
app.use(express.json({extended: true, limit: '1mb'}))
app.use(cookieParser())

app.use(session({
    secret: config.get('session.secret'),
    key: config.get('session.key'),
    cookie: config.get('session.cookie'),
    saveUninitialized: false,
    resave: false,
    store: new MongoDBStore({
            uri: config.get('dbUrl'),
            databaseName: 'mydb',
            collection: 'usersSessions'
        },
        function(error) {
            console.log(error)
        })
}))

mongoose.set('strictQuery', true);

const start = async () => {
    try {
        await mongoose.connect(config.get('dbUrl'));
        app.listen(PORT, () => {
            console.log('Server started on port ', PORT)
        })
    } catch (e) {
        console.log(e)
    }
}

app.use('/', routes)
app.use('/login', routes)

start()


