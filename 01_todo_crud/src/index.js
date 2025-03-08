/* eslint-disable no-console */
import app from "./app.js";
import connectDB from "./db/index.js";

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`⚙️  Server is Running at PORT :${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error("💀 MONGODB CONNECTION FAILED !!! ", error.message);
    });
