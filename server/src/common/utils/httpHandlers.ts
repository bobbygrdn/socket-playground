import { ServiceResponse, ResponseStatus } from "../models/serviceResponse";
import { StatusCodes } from 'http-status-codes';
import { Response } from 'express';

export const handleServiceResponse = (serviceResponse: ServiceResponse<any>, response: Response) => {
    return response.status(serviceResponse.statusCode).send(serviceResponse);
};