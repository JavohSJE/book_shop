import express from 'express'
import {create} from 'express-handlebars'
import mongoose from 'mongoose'
import flash from 'connect-flash'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import * as dotenv from 'dotenv'

import varMiddleware from './middleware/var.js'
import userMiddleware from './middleware/user.js'
import hbsHelper from './utils/index.js'

// ROUTES
import AuthRoutes from './routes/auth.js'
import ProductsRoutes from './routes/products.js'

dotenv.config()

const app = express()

const hbs = create({defaultLayout: 'main', extname: 'hbs', helpers: hbsHelper})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', './views')

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
app.use(session({secret: 'KEY kiriting', resave: false, saveUninitialized: false}))
app.use(flash())
app.use(varMiddleware)
app.use(userMiddleware)

app.use(AuthRoutes)
app.use(ProductsRoutes)

const startApp = () => {
	try {
		mongoose.set('strictQuery', false)
		mongoose.connect("Bazadagi manzilni kiriting", {useNewUrlParser: true}, () => console.log('Mongo DB connected'))

		const PORT = process.env.PORT || 5000
		app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
	} catch (error) {
		console.log(error)
	}
}

startApp()
