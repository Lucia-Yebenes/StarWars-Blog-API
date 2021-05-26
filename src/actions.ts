import { Request, Response } from 'express'
import { getRepository, ObjectLiteral } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Users } from './entities/Users'
import { Exception } from './utils'
import { Character } from './entities/Character'
import { Planets } from './entities/Planets'
import jwt from "jsonwebtoken"
import { FavCharacter } from './entities/FavCharacter'
import { FavPlanets } from './entities/FavPlanets'

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

export const createTokend = async (req: Request, res:Response): Promise<Response> =>{

	// important validations to avoid ambiguos errors, the client needs to understand what went wrong
	if(!req.body.email) throw new Exception("Please specify an email email")
	if(!req.body.password) throw new Exception("Please specify an email password")

	const userRepo = getRepository(Users)
	// fetch for any user with this email
	const user = await userRepo.findOne({ where: {email: req.body.email , password: req.body.password}})
	if(!user) throw new Exception("Invalid email or password")

	const token = jwt.sign({ user }, process.env.JWT_KEY as string,);

	return res.json({ user, token });
}

export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
    const userID = (req.user as ObjectLiteral).user.id; 
    console.log(userID)
		const users = await getRepository(Users).findOne(userID);
		return res.json(users);
}
// CHARACTER

//GET Character
export const getCharacter = async (req: Request, res: Response): Promise<Response> =>{
        const characters = await getRepository(Character).find();
        console.log("ruta personajes")
		return res.json(characters);
}

export const getOneCharacter = async (req: Request, res: Response): Promise<Response> =>{
        const characters = await getRepository(Character).findOne(req.params.id);
        console.log("ruta de un personajes")
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

//GET Planets
export const getOnePlanets = async (req: Request, res: Response): Promise<Response> =>{
        const planets = await getRepository(Planets).findOne(req.params.id);
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

// ADD FAVOURITE CHARACTER

export const addFavCharacter = async (req: Request, res: Response): Promise<Response> => {
    const user = (req.user as ObjectLiteral).user; //traigo usuario 
    const character = await getRepository(Character).findOne(req.params.id) //busco en el repo los persinajes y me traigo el q coincida con el id q le estoy pasando
    if (!character) throw new Exception ("character not found") //si el personaje no exisete devolverr msj 
    let newFavourite = new FavCharacter(); //traigo tabla 
    newFavourite.users= user // asigno valor a la "columna"
    newFavourite.character=character // asigno valor a la "columna"
    console.log(user)
    console.log(character)
    
    const results = await getRepository(FavCharacter).save(newFavourite);
    return res.json(results); 
}

// ADD FAVOURITE PLANETS
export const addFavPlanets = async (req: Request, res: Response): Promise<Response> => {
    const user = (req.user as ObjectLiteral).user; //traigo usuario 
    const planet = await getRepository(Planets).findOne(req.params.id) //busco en el repo los persinajes y me traigo el q coincida con el id q le estoy pasando
    if (!planet) throw new Exception ("planets not found") //si el personaje no exisete devolverr msj 
    let newFavouritePlanet = new FavPlanets(); //traigo tabla 
    newFavouritePlanet.users= user // asigno valor a la "columna"
    newFavouritePlanet.planets=planet // asigno valor a la "columna"
    
    const results = await getRepository(FavPlanets).save(newFavouritePlanet);
    return res.json(results); 
}
// get favourite character
export const getFavCharacter = async (req: Request, res: Response): Promise<Response> => {
    const user = (req.user as ObjectLiteral).user; //traigo usuario 
    if (!user) throw new Exception ("user not found") //si usuario no existe devolever msaje 
    const results = await getRepository(FavCharacter).find({ where: { users:user }, relations:["character"]});
    return res.json(results); 
}

// get favourite Planets
export const getFavFavPlanets = async (req: Request, res: Response): Promise<Response> => {
    const user = (req.user as ObjectLiteral).user; //traigo usuario 
    if (!user) throw new Exception ("user not found") //si usuario no existe devolever msaje 
    const results = await getRepository(FavPlanets).find({ where: { users:user }, relations:["planets"]});
    return res.json(results); 
}

//detete favorite 
export const deleteFavCharacter = async (req: Request, res: Response): Promise<Response> => {
    const userID = (req.user as ObjectLiteral).user;
    const favouriteCharacter = await getRepository(FavCharacter).findOne(
         {
            relations: ['character'],
            where:{
                users: userID,
                character: req.params.id 
            }
         });
         if(!favouriteCharacter){
            return res.json({"messager":"El favourite not found"})
        }else{
            const result = await getRepository(FavCharacter).delete(favouriteCharacter);
            return res.json(result);
        }
}
//detete Planets 
export const deleteFavPlanets = async (req: Request, res: Response): Promise<Response> => {
    const userID = (req.user as ObjectLiteral).user;
    const favouritePlanets = await getRepository(FavPlanets).findOne({relations: ['planets'],where:{users: userID,planets: req.params.id }});
         if(!favouritePlanets){
            return res.json({"messager":"El favourite not found"})
        }else{
            const result = await getRepository(FavPlanets).delete(favouritePlanets);
            return res.json(result);
        }
}

