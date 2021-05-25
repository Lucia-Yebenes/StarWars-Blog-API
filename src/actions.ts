import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Users } from './entities/Users'
import { Exception } from './utils'
import { Character } from './entities/Character'
import { Planets } from './entities/Planets'

export const createUser = async (req: Request, res:Response): Promise<Response> =>{

	// important validations to avoid ambiguos errors, the client needs to understand what went wrong
	if(!req.body.first_name) throw new Exception("Please provide a first_name")
	if(!req.body.last_name) throw new Exception("Please provide a last_name")
	if(!req.body.email) throw new Exception("Please provide an email")
	if(!req.body.password) throw new Exception("Please provide a password")

	const userRepo = getRepository(Users)
	// fetch for any user with this email
	const user = await userRepo.findOne({ where: {email: req.body.email }})
	if(user) throw new Exception("Users already exists with this email")

	const newUser = getRepository(Users).create(req.body);  //Creo un usuario
	const results = await getRepository(Users).save(newUser); //Grabo el nuevo usuario 
	return res.json(results);
}

export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
		const users = await getRepository(Users).find();
		return res.json(users);
}
// CHARACTER

//GET Character
export const getCharacter = async (req: Request, res: Response): Promise<Response> =>{
        const characters = await getRepository(Character).find();
        console.log("ruta personajes")
		return res.json(characters);
}

// POST Character 
export const createCharacter = async (req: Request, res:Response): Promise<Response> =>{

	// important validations para que ingresen todos los campos 
	if(!req.body.name) throw new Exception("Please provide a name")
	if(!req.body.height) throw new Exception("Please provide a height")
	if(!req.body.mass) throw new Exception("Please provide an mass")
    if(!req.body.hairColor) throw new Exception("Please provide a hairColor")
    if(!req.body.skinColor) throw new Exception("Please provide a skinColor")
    if(!req.body.eyeColor) throw new Exception("Please provide a eyeColor")
    if(!req.body.birthYear) throw new Exception("Please provide a birthYear")
    if(!req.body.gender) throw new Exception("Please provide a gender")

	const characterRepo = getRepository(Character)
	// fetch for any user with this email
	const character = await characterRepo.findOne({ where: {name: req.body.name }}) //para que no se repitan
	if(character) throw new Exception("character already exists with this name")

	const newCharacter = getRepository(Character).create(req.body);  //Creo un usuario
	const results = await getRepository(Character).save(newCharacter); //Grabo el nuevo usuario 
	return res.json(results);
}

//PLANETS

//GET Planets
export const getPlanets = async (req: Request, res: Response): Promise<Response> =>{
        const planets = await getRepository(Planets).find();
        console.log("ruta traigo planetas")
		return res.json(planets);
}

// POST Character 
export const createPlanets = async (req: Request, res:Response): Promise<Response> =>{

	// important validations para que ingresen todos los campos 
	if(!req.body.name) throw new Exception("Please provide a name")
	if(!req.body.diameter) throw new Exception("Please provide a diameter")
	if(!req.body.rotation) throw new Exception("Please provide an rotation")
    if(!req.body.orbital) throw new Exception("Please provide a orbital")
    if(!req.body.gravity) throw new Exception("Please provide a gravity")
    if(!req.body.population) throw new Exception("Please provide a population")
    if(!req.body.climate) throw new Exception("Please provide a climate")
    if(!req.body.terrain) throw new Exception("Please provide a terrain")
    if(!req.body.surfaceWater) throw new Exception("Please provide a surfaceWater")

	const planetsRepo = getRepository(Planets)
	// fetch for any user with this email
	const planets = await planetsRepo.findOne({ where: {name: req.body.name }}) //para que no se repitan
	if(planets) throw new Exception("character already exists with this name")

	const newPlanets = getRepository(Planets).create(req.body);  //Creo un usuario
	const results = await getRepository(Planets).save(newPlanets); //Grabo el nuevo usuario 
	return res.json(results);
}

