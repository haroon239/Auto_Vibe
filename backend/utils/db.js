// const url="mongodb+srv://haroon:27february@cluster0.gtkrfen.mongodb.net/autovibes?retryWrites=true&w=majority";
const url=process.env.MONGODB_URI ;
const mongoose=require("mongoose");

async function connectdb(){
    try {
        mongoose.connect(url);
        console.log("database connectt");
    } catch (error) {
        console.log("error in connection of database");
    }
}

connectdb();