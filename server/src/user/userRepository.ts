import { Request } from "express";
import { mongoDatabase } from "../mongoDatabase";
import { User } from "./userModel";

// TODO: Update by adding authentication with either tokens or sessions
export const userRepository = {

    // Start MongoDB connection
    startConnection: async () => {
        return await mongoDatabase.initConnection();
    },

    // Get all users
    findAllAsync: async (): Promise<User[] | null> => {
        try {
            await userRepository.startConnection();
            return await User.find();
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    // Get user by id
    findByIdAsync: async (id: string): Promise<User | null> => {
        try {
            await userRepository.startConnection();
            return await User.findById(id);
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    // Create user
    createAsync: async (req: Request): Promise<User | null> => {
        try {
            await userRepository.startConnection();
            const newUser = new User(req.body);
            await newUser.save();

            const findNewUser = userRepository.findByIdAsync(newUser._id.toString());
            return findNewUser;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    // Login user
    validateAsync: async (req: Request): Promise<User | null> => {
        try {
            const { email, password } = req.body;
            await userRepository.startConnection();
            const existingUser = await User.findOne({ email: email });
            if (!existingUser || existingUser.password !== password) {
                return null;
            }
            return existingUser;

        } catch (error) {
            console.error(error);
            return null;
        }
    },

    // Update user
    updateAsync: async (id: string, user: User): Promise<User | null> => {
        try {
            await userRepository.startConnection();
            const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
            if (!updatedUser) {
                throw new Error('No User Found');
            }
            const findUpdatedUser = userRepository.findByIdAsync(updatedUser._id.toString());
            return findUpdatedUser;
        } catch (error) {
            console.error(error);
            return null;
        }
    },
}