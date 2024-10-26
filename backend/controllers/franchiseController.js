import jwt from 'jsonwebtoken';
import Franchise from '../models/User.js'; // Ensure this path is correct

const JWT_SECRET = process.env.JWT_SECRET || "supersecretjwtkey";

// Register function
export const registerFranchise = async (req, res) => {
  const { name, password } = req.body;

  // Validate input
  if (!name || !password) {
    return res.status(400).json({ message: 'Name and password are required' });
  }

  try {
    // Check if franchise already exists
    const existingFranchise = await Franchise.findOne({ name });
    if (existingFranchise) {
      return res.status(409).json({ message: 'Franchise already exists' });
    }

    // Create new franchise
    const newFranchise = new Franchise({
      name,
      password, // Store the password as plain text (consider hashing for production)
    });

    await newFranchise.save(); // Save the new franchise to the database

    return res.status(201).json({
      message: 'Franchise registered successfully',
      franchise: newFranchise,
    });
  } catch (error) {
    console.error('Error registering franchise:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Login function
export const loginFranchise = async (req, res) => {
  const { franchiseName, password } = req.body;

  try {
    // Find franchise in the database
    const franchise = await Franchise.findOne({ name: franchiseName });

    if (!franchise) {
      return res.status(404).json({ message: "Franchise not found" });
    }

    // Check if password is correct
    if (franchise.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Create JWT token
    const token = jwt.sign({ franchiseName: franchise.name, franchiseId: franchise.id }, JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({
      message: "Login successful",
      franchiseName: franchise.name,
      franchiseId: franchise.id,
      token,
    });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
