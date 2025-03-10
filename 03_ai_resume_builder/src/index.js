/* eslint-disable no-console */
import app from "./app.js";

app.listen(process.env.PORT, () => {
    console.log(`⚙️  Server is Running at PORT : ${process.env.PORT}`);
});