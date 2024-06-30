require('dotenv').config();

const mongoose = require('mongoose')

const connectDB = async () => {
    
    try {
        await mongoose.connect(
            process.env.MONGO_URI //|| 'mongodb://127.0.0.1/madrasa',
            // {
            //     useNewUrlParser: true,
            //     useUnifiedTopology: true,
            // }
            
        )
        console.log('DB Connection Success');
    } catch (error) {
        console.log(error);
        console.log('MongoDB Connection Failed ' + error);
        process.exit(1)
    }
}

module.exports = {connectDB}
