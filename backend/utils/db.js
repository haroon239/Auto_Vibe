const url = process.env.MONGODB_URI;
const mongoose = require("mongoose");
 
async function connectdb() {
    try {
        await mongoose.connect(url);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Error connecting to database:", error.message);
        process.exit(1); // ✅ stop server if DB fails — better than running broken silently
    }
}
 
connectdb();
 
module.exports = connectdb;