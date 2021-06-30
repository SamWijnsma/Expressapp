const mongoose = require('mongoose');
const Product = require('./models/product');


mongoose.connect('mongodb://localhost:27017/voetbal', {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }).then(() => {
        console.log('db connected');
    }).catch(err => {
        console.log(err);
    })

    const prachtGoal = [
        {
        name: 'Bergkamp',
        year: 1998,
        category: 'overig'
    },
    {
        name: 'Bronkhorst',
        year: 2010,
        category: 'afstandschot'
    },
    {
        name: 'de Boer',
        year: 1999,
        category: 'spelhervatting'
    },
    {
        name: 'Seedorf',
        year: 2002,
        category: 'overig'
    },
]

Product.insertMany(prachtGoal)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })