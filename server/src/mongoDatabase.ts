import mongoose, { Mongoose } from 'mongoose';

export const mongoDatabase = {
    initConnection: async (): Promise<Mongoose> => {
        try {
            const { MONGODB_CONNECTION_STRING } = process.env;
            console.log("Mongo DB Connection String: ", MONGODB_CONNECTION_STRING);
            if (!MONGODB_CONNECTION_STRING) {
                throw new Error('MONGODB_CONNECTION_STRING is undefined');
            }
            return await mongoose.connect(MONGODB_CONNECTION_STRING);
        } catch (err) {
            console.error('Error connecting to db: ', err);
            throw err;
        }
    },
};