const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require('./models');

const PORT = 3001;

// Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);


const MAX_RETRIES = 5;  // Max retry attempts
const RETRY_DELAY = 5000; // Delay in milliseconds (5 seconds)

async function startServer(retries = MAX_RETRIES) {
    try {
        await db.sequelize.authenticate(); // Ensure DB connection before syncing
        console.log('Database connection established.');

        // When starting the API, check the Models and if they don't exist, create the table
        db.sequelize.sync().then(() => {
            console.log('Database synchronized.');
                
            app.listen(PORT, () => { //Anonymous function:
                // Run when server launches:
                console.log("BANJ - Server: DEVELOPMENT MODE")
                console.log(`Server running on port ${PORT}`);
                console.log(` in development mode, not for production`)
            })
        })
    } catch (error) {
        console.error(`Database connection failed: ${error.message}`);
        if (retries > 0) {
            console.log(`Retrying in ${RETRY_DELAY / 1000} seconds... (${retries} attempts left)`);
            setTimeout(() => startServer(retries - 1), RETRY_DELAY);
        } else {
            console.error('Max retries reached. Could not connect to the database.');
            process.exit(1); // Exit the process if all retries fail
        }
    }
}



// Start the server with retry logic
startServer();