import mongoose from 'mongoose';

// Define the Franchise schema
const franchiseSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    default: () => Math.random().toString(36).substr(2, 8), // Generates a random 8-character alphanumeric ID
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Export the model
const Franchise = mongoose.model('Franchise', franchiseSchema);
export default Franchise;
