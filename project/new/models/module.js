const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moduleSchema = new Schema({
    moduleName: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    moduleStatus: {
        type: String,
        enum: ['pending', 'ongoing', 'complete'],
        default: 'pending',
        required: false
    },
    // Add reference to Quiz collection _id
    quizId: {
        type: Schema.Types.ObjectId, // Reference to Quiz collection's _id
        ref: 'Quiz' // Name of the referenced collection
    }
});

module.exports = mongoose.model('Module', moduleSchema);
