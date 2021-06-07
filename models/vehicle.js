const mongoose = require('mongoose');
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");
const { CAR, BIKE,SEDAN,SUV,HATCHBACK,DIRTBIKE,SPORTSBIKE,CRUISER, PETROL, CNG, DIESEL } = require('../constants');

const Vehicle = mongoose.model('vehicle', new mongoose.Schema({
                    vehicleModel: {
                        type: String,
                        required:true,
                    },
                    vehicleNumber: {
                        type: String,
                        required:true,
                        unique: true
                    },
                    vehicleOwner: {
                        type: String,
                        required:true,
                    },
                    vehicleType: {
                        type: String,
                        enum: [CAR, BIKE]
                    },
                    fuelType: {
                        type: String,
                        enum: [PETROL, CNG, DIESEL]
                    },
                    vehicleColor: {
                        type: String,
                        required:true,
                    },
                    vehicleImage: {
                        type: String,
                        required:true,
                    },
                    vehicleSubcategory: {
                        validate: {
                            validator: function(value) {
                                if(this.vehicleType === CAR) {
                                    return [SEDAN, SUV, HATCHBACK].includes(value)
                                } else if(this.vehicleType === BIKE) {
                                    return [DIRTBIKE, CRUISER, SPORTSBIKE].includes(value)
                                }
                            },
                
                        }
                    },
                    location: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'location'
                    },
                    pricePerHour: {
                        type: Number,
                        required:true,
                    }
                }));

module.exports = {Vehicle};