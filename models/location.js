const mongoose = require('mongoose');

const Location = mongoose.model('location', new mongoose.Schema({
                    locationName: {
                        type: String,
                        required:true,
                    },
                    fullAddress: {
                        type: String,
                        required:true
                    },
                    cityName: {
                        type: String,
                        required:true
                    },
                    pinCode: {
                        type: Number,
                        required:true,
                        min: 100000
                    }
                }));

module.exports = {Location};