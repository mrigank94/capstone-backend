const mongoose = require('mongoose');

const Booking = mongoose.model('booking', new mongoose.Schema({
                    pickUpDate: {
                        type: Date,
                        reuired: true
                    },
                    dropOffDate: {
                        type: Date,
                        reuired: true
                    },
                    bookingDate: {
                        type: Date,
                        reuired: true
                    },
                    location: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'location'
                    },
                    user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'user'
                    },
                    vehicle: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'vehicle'
                    },
                    amount: {
                        type: Number,
                        required: true
                    }
                }));

module.exports = {Booking};