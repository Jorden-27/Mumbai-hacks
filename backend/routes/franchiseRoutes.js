import express from 'express';
import { registerFranchise, loginFranchise } from '../controllers/franchiseController.js';

const router = express.Router();

// Route for registering a new franchise
router.post('/register', registerFranchise);

// Route for logging in an existing franchise
router.post('/login', loginFranchise);

// Export the router
export default router;
