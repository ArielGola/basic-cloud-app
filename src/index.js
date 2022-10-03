const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const path = require('path')

const contentRouter = require('./routes/content')
const uploadRouter = require('./routes/upload')
const downloadRouter = require('./routes/download')
const dirRouter = require('./routes/dir')
const destroyFile = require('./routes/destroy')

const enoent = require('./middlewares/enoent')
const eexist = require('./middlewares/eexist')
const err = require('./middlewares/err')


const port = process.env.PORT || 3300

const app = express();

// Settings
app.set('views', path.join(__dirname, './views'))
app.engine(
    '.hbs',
    exphbs.engine({
        defaultLayout: 'main',
        layoutsDir: path.join(app.get('views'), 'layouts'),
        partialsDir: path.join(app.get('views'), 'partials'),
        extname: '.hbs'
    })
)
app.set('view engine', '.hbs')

// Middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

// Routes
app.get('/', (req, res) => res.render('index'))
app.use('/content', contentRouter)
app.use('/upload', uploadRouter)
app.use('/download', downloadRouter)
app.use('/dir', dirRouter)
app.use('/destroy', destroyFile)

// Errors
app.use(enoent)
app.use(eexist)
app.use(err)

// Public
app.use('/public', express.static(path.join(__dirname, './public')))

// Server
app.listen(port, () => console.log('Server on port', port))