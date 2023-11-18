import mongoose from 'mongoose';

export const connectToDB = (dbhost?: string) => {
  const connect = () => {
    const db: any = dbhost || process.env.DB_HOST;

    mongoose
      .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .then(() => console.log(`Successfully connected to db`))
      .catch((error) => {
        console.log('Error connecting to database: ', error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};
