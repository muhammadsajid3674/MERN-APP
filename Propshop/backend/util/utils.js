import jwt from 'jsonwebtoken'
import envVars from '../config/env-vars.js';
import moment from 'moment';
import RefreshToken from '../models/refresh-token.js';

export const generateToken = (id) => {
    return jwt.sign({ id }, envVars.jwtSecret, {
        expiresIn: '30d'
    })
}

export const generateTokenResponse = (user, accessToken) => {
    const tokenType = 'Bearer';
    const refreshToken = RefreshToken.generate(user);
    const expiresIn = moment().add(envVars.jwtExpirationInterval, 'minutes');
    return {
        tokenType, accessToken, refreshToken, expiresIn,
    };
};
