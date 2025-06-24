import  jwt from 'jsonwebtoken';
import {jwtSecret} from '../config/index.js';

export const createToken = async (payload, options) => {
    return await jwt.sign(payload, jwtSecret, options);
};

export const verifyToken = async (token) => {
    try {
        return await jwt.verify(token, jwtSecret);
    } catch (error) {
        throw error;
    }
};
