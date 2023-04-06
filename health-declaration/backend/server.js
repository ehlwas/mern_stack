const express =require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const HealthRouter = require('./routes/health');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// MONGODB CONNECTION
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection has been established.')
})

connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

app.use('/health', HealthRouter);

app.listen(port, () => {
    console.log(`Server is running in port: ${port}`);
});