const mongoose = require('mongoose');

const GamesSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    totalWins: {
        type: Number,
        required: true
    },
    totalLoses: {
        type: Number,
        required: true
    },
    games: {
        type: [{
            user_id: String,
            username: String,
            wins: Number,
            loses: Number,
            timestamp: {
                type: Date,
                default: Date.now
            }
        }],
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports =  mongoose.model('Game', GamesSchema);