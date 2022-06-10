const mongoose = require('mongoose')
const grocerySchema = new mongoose.Schema({
    groceryItem: {
        type: String
    },
    isPurchased: {
        type: String,
        default: false
    },
},   
{    timestamps :true}
)
module.exports = mongoose.model('Grocery',grocerySchema)