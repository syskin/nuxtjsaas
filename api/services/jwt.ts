import { auth } from 'express-oauth2-jwt-bearer';

export const checkJwt = auth({
    issuerBaseURL: process.env.AUTH0_ISSUERBASEURL,
    audience: process.env.AUTH0_AUDIENCE,
    tokenSigningAlg: 'RS256'
});
