import express from "express";
import cors from 'cors'
import 'dotenv/config.js'
import bodyParser from "body-parser";
import franchiseRoutes from '../routes/franchiseRoutes.js';
const PORT = process.env.PORT || 9002;
const router = express.Router();

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
app.use('/api/franchise', franchiseRoutes);

app.use(cors({
    origin: 'http://localhost:5173', // Change this to your frontend URL
    methods: ['GET', 'POST'], // Adjust methods as needed
    credentials: true, // Enable set cookie
  }));
// Mount the router on the /api/v1 prefix
app.use('/api/v1', router);
app.use(bodyParser.json());


router.get('/', async (req, res) => {
    res.status(200).send("Root route");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default router;
