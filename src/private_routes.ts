/**
 * Pivate Routes are those API urls that require the user to be
 * logged in before they can be called from the front end.
 * 
 * Basically all HTTP requests to these endpoints must have an
 * Authorization header with the value "Bearer <token>"
 * being "<token>" a JWT token generated for the user using 
 * the POST /token endpoint
 * 
 * Please include in this file all your private URL endpoints.
 * 
 */

import { Router, Request, Response, NextFunction } from 'express';
import { safe } from './utils';
import * as actions from './actions';
import jwt from "jsonwebtoken"

// declare a new router to include all the endpoints
const router = Router();
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    //headers con el token
    const token = req.header('Authorization');
    if (!token) return res.status(400).json('ACCESS DENIED');

    const decoded = jwt.verify(token as string, process.env.JWT_KEY as string)
    req.user = decoded;

    next()
}

router.get('/user', verifyToken, safe(actions.getUsers));
router.post('/user/favourite/character/:id', verifyToken, safe(actions.addFavCharacter));
router.post('/user/favourite/planet/:id', verifyToken, safe(actions.addFavPlanets));
router.get('/users/favorites/character', verifyToken, safe(actions.getFavCharacter));
router.get('/users/favorites/planets', verifyToken, safe(actions.getFavFavPlanets));
router.delete('/users/favorites/character/:id', verifyToken, safe(actions.deleteFavCharacter));
router.delete('/users/favorites/planets/:id', verifyToken, safe(actions.deleteFavPlanets));
export default router;
