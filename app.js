    /*
        ---------------------------------------------------------------------------
        @Basic Skeleton for any JS/Express application
        @v0.1
        @Toby Versteeg
        @CodeGorilla
        @december 2020

        This is a 'basic' skeleton (boilerplate) for any JS project.
        It uses Express, MongoDB, Mongoose and EJS templating and more libs.
        This boilerplate includes Bootstrap and jQuery as well to have a quick
        start on building responive websites.
        The folder structure is a basic setup to write clean code and seperates
        files into common folders like public/css, views, controllers, models etc.s
        ---------------------------------------------------------------------------
    */

    const express = require('express');
    const mongoose = require('mongoose');
    const ejsMate = require('ejs-mate');
    const session = require('express-session');
    const ExpressError = require('express-error');
    const mongoSanitize = require('express-mongo-sanitize');
    const MongoDBStore = require("connect-mongo")(session);
    const path = require('path');
    const router = express.Router();
    const bodyParser = require("body-parser");
    const assert = require('assert');
    const methodOverride = require('method-override');
    

    const app = express();

    const events = require('./models/events');
    const { captureRejectionSymbol } = require('events');

    const Product = require('./models/product');
    // using a database?
    // uncomment the code below and rename "myDB" into your own database
    mongoose.connect('mongodb://localhost:27017/voetbal', {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }).then(() => {
        console.log('db connected');
    }).catch(err => {
        console.log(err);
    });

    app.set('view engine', 'ejs')
    app.set('views', path.join(__dirname, '/views'))
    app.use(express.urlencoded({extended:true}));
    app.use(methodOverride('_method'))


    // set public folder to include CSS and JS in your main template
    // like href="css/main.css"
    // see index.ejs template
    app.use(express.static(__dirname + '/public'));

    // paths for including Bootstrap, jQuery and Popper
    // from the node_modules folder
    // and include them like href="/css/bootstrap.min.css"
    // or JS like src="/js/bootstrap.min.js"
    // see index.ejs template
    app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
    app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
    app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
    app.use('/popper', express.static(__dirname + '/node_modules/popper.js/dist/'));

    // retrieve data from posts in JSON format
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // const event = mongoose.model('event', eventsSchema);

    const fruits = [
        'apple',
        'strawberry',
        'banana',
    ]

    

    app.get('/form', function(req, res) {
        res.render('partials/form', 
        {
            fruitList: fruits,
            first_name: 'Anil',
            age: 23,
        })
    });

    // put your routes here
    app.get('/', (req, res) => {
        res.render('layouts/index')
    });

    app.get('/about', (req, res) => {
        res.render('layouts/index', {
            page: 'about',
        })
    });

    app.get('/products', async (req, res) => {
        const products = await Product.find({})
        res.render('products/index', { products })
    })

    app.get ('/products/new', (req, res) => {
       res.render('products/new') 
    })

    app.post('/products', async(req, res) => {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.redirect(`/products/${newProduct._id}`)
    })

    app.get('/products/:id', async (req, res) => {
        const { id } = req.params;
        const product = await Product.findById(id)
        console.log(product);
        res.render('products/show', {product})
    })

    app.get ('/products/:id/edit', async (req, res) => {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.render('products/edit', { product }) 
     })

    app.put('/products/:id', async (req,res) => {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new:true });
        res.redirect(`/products/${product._id}`);

    })

   app.delete('/products/:id', async (req, res) => {
    const {id} = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id)
    res.redirect('/products');
   })

    // set up a port for your localhost
    app.listen(8080, () => {
        console.log('Hi! :-) I\'m listening to port 8080')
    }); 