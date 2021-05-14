import mongoose from 'mongoose';
require('dotenv').config();

function connectDB() {
  mongoose.connect(
    // `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-vuauc.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`,
    `mongodb://localhost/${process.env.DB}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  ).then(() => {
    console.log('Connection to database established...');
  }).catch(err => {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  });
}

export default connectDB;