import mongoose from 'mongoose'
import "dotenv/config";

// Connect to MongoDB
mongoose.connect(`mongodb+srv://jorden:jorden@cluster0.hqm8u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });