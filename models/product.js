const mongoose = require('mongoose');

const productSchema = new mongoose.Schema( {
    name: {type: String,
        required: true
    },
    year : {
        type: Number,
        required: true,
        min: 1800
    
    },
    category : { 
       type: String,
       lowercase: true,
       enum: ['penalty', 'kopgoal', 'afstandschot', 'solo', 'spelhervatting', 'overig'] 
    }
    
    })
    
    const Product = mongoose.model ('Product', productSchema);
    
    module.exports = Product;