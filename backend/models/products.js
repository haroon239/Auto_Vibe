const mongoose = require('mongoose');

const product = mongoose.Schema({
    image: { type: String },
    vehicleName: { type: String, required: true },
    vehicleColor: { type: String },
    vehicleBrand: { type: String },          // was "category" in form
    vehicleCategory: { type: String },        // kept for backward compatibility
    vehiclePrice: { type: Number, required: true },
    registeredCity: { type: String },
    engineCapacity: { type: String },
    ContactNumber: { type: String },
    Description: { type: String },

    // ── New fields from updated Sellingform ──────────────
    condition: { type: String, enum: ['New', 'Used', 'Certified'], default: 'Used' },
    year: { type: Number },
    fuel: { type: String, enum: ['Petrol', 'Diesel', 'Hybrid', 'Electric'] },
    transmission: { type: String, enum: ['Manual', 'Automatic'] },
    mileage: { type: Number },

    sold: { type: Boolean, default: false },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
}, { timestamps: true }); // ✅ added timestamps so createdAt/updatedAt exist for dashboard sorting

module.exports = mongoose.model('products', product);