import { StatusCodes } from "http-status-codes";
import { ResponseStatus, ServiceResponse } from "../common/models/serviceResponse";
import { User } from "./userModel";
import { userRepository } from "./userRepository";
import { Request } from 'express';

export const userService = {

    // Get all users
    findAll: async (): Promise<ServiceResponse<User[] | null>> => {
        try {
            const users = await userRepository.findAllAsync();
            if (!users) {
                return new ServiceResponse(ResponseStatus.Failed, 'No Users found', null, StatusCodes.NOT_FOUND);
            }
            return new ServiceResponse<User[]>(ResponseStatus.Success, 'Users found', users, StatusCodes.OK);
        } catch (error) {
            const errorMessage = `Error finding all users: $${(error as Error).message}`;
            console.error(error);
            return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },

    // Get user by id
    findById: async (id: string): Promise<ServiceResponse<User | null>> => {
        try {
            const user = await userRepository.findByIdAsync(id);
            if (!user) {
                return new ServiceResponse(ResponseStatus.Failed, 'No User found', null, StatusCodes.NOT_FOUND);
            }
            return new ServiceResponse<User>(ResponseStatus.Success, 'User found', user, StatusCodes.OK);
        } catch (error) {
            const errorMessage = `Error finding user: $${(error as Error).message}`;
            console.error(error);
            return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },

    // Create user
    create: async (req: Request): Promise<ServiceResponse<User | null>> => {
        try {
            const createdUser = await userRepository.createAsync(req);
            if (!createdUser) {
                return new ServiceResponse(ResponseStatus.Failed, 'No User created', null, StatusCodes.NOT_FOUND);
            }
            return new ServiceResponse<User>(ResponseStatus.Success, 'User created', createdUser, StatusCodes.OK);
        } catch (error) {
            const errorMessage = `Error creating user: $${(error as Error).message}`;
            console.error(error);
            return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },

    // Login user
    validate: async (req: Request): Promise<ServiceResponse<User | null>> => {
        try {
            const validatedUser = await userRepository.validateAsync(req);
            if (!validatedUser) {
                return new ServiceResponse(ResponseStatus.Failed, 'No user with those credentials', null, StatusCodes.NOT_FOUND);
            }
            return new ServiceResponse<User>(ResponseStatus.Success, 'User logged in successfully', validatedUser, StatusCodes.OK);
        } catch (error) {
            const errorMessage = `Error validating user: $${(error as Error).message}`;
            console.error(error);
            return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },

    // Update user
    update: async (id: string, user: User): Promise<ServiceResponse<User | null>> => {
        try {
            const updatedUser = await userRepository.updateAsync(id, user);
            if (!updatedUser) {
                return new ServiceResponse(ResponseStatus.Failed, 'No User found', null, StatusCodes.NOT_FOUND);
            }
            return new ServiceResponse<User>(ResponseStatus.Success, 'Users updated successfully', updatedUser, StatusCodes.OK);
        } catch (error) {
            const errorMessage = `Error updating user: $${(error as Error).message}`;
            console.error(error);
            return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },
}