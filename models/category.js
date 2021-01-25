const mongoose = require('mongoose');

const categoriesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
    },
    color: {
        type: String,
    },
})

exports.Category = mongoose.model('Category',categoriesSchema);