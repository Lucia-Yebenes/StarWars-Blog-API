
/**
 * Public Routes are those API url's that anyone can request
 * whout having to be logged in, for example:
 * 
 * POST /user is the endpoint to create a new user or "sign up".
 * POST /token can be the endpoint to "log in" (generate a token)
 */
import { Router } from 'express';
import { safe } from './utils';
import { createUser, getCharacter, createCharacter, createPlanets, getPlanets } from './actions';

const router = Router();

// signup route, creates a new user in the DB
router.post('/user', safe(createUser));
// CHARACTER
router.get('/character', safe(getCharacter));
router.post('/character', safe(createCharacter));
//PLANETS
router.get('/planets', safe(getPlanets));
router.post('/planets', safe(createPlanets));
export default router;
