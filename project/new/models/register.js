const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    role: {
        type: String,
        enum: ['Intern', 'Employee'],
        required: true
    },
    checkreset: {
        type: Boolean,
        default: false
    },
    results: [{
        module_id: {
            type: mongoose.Schema.Types.ObjectId, // Corrected type to mongoose.Schema.Types.ObjectId
            ref: 'Module', // Reference to another schema, replace 'Module' with your actual module schema name
            required: false
        },
        marks: {
            type: Number,
            required: false
        }
    }],
    modules: [{
        module_id: {
            type: mongoose.Schema.Types.ObjectId, // Corrected type to mongoose.Schema.Types.ObjectId
            ref: 'Module', // Reference to another schema, replace 'Module' with your actual module schema name
            required: false
        }
    }]

});

module.exports = mongoose.model('Register', userSchema);
