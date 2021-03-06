"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.deleteFavPlanets = exports.deleteFavCharacter = exports.getFavFavPlanets = exports.getFavCharacter = exports.addFavPlanets = exports.addFavCharacter = exports.createPlanets = exports.getOnePlanets = exports.getPlanets = exports.createCharacter = exports.getOneCharacter = exports.getCharacter = exports.getUsers = exports.createTokend = exports.createUser = void 0;
var typeorm_1 = require("typeorm"); // getRepository"  traer una tabla de la base de datos asociada al objeto
var Users_1 = require("./entities/Users");
var utils_1 = require("./utils");
var Character_1 = require("./entities/Character");
var Planets_1 = require("./entities/Planets");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var FavCharacter_1 = require("./entities/FavCharacter");
var FavPlanets_1 = require("./entities/FavPlanets");
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, newUser, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.first_name)
                    throw new utils_1.Exception("Please provide a first_name");
                if (!req.body.last_name)
                    throw new utils_1.Exception("Please provide a last_name");
                if (!req.body.email)
                    throw new utils_1.Exception("Please provide an email");
                if (!req.body.password)
                    throw new utils_1.Exception("Please provide a password");
                userRepo = typeorm_1.getRepository(Users_1.Users);
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email } })];
            case 1:
                user = _a.sent();
                if (user)
                    throw new utils_1.Exception("Users already exists with this email");
                newUser = typeorm_1.getRepository(Users_1.Users).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).save(newUser)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createUser = createUser;
var createTokend = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.email)
                    throw new utils_1.Exception("Please specify an email email");
                if (!req.body.password)
                    throw new utils_1.Exception("Please specify an email password");
                userRepo = typeorm_1.getRepository(Users_1.Users);
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email, password: req.body.password } })];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("Invalid email or password");
                token = jsonwebtoken_1["default"].sign({ user: user }, process.env.JWT_KEY);
                return [2 /*return*/, res.json({ user: user, token: token })];
        }
    });
}); };
exports.createTokend = createTokend;
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userID, users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userID = req.user.user.id;
                console.log(userID);
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne(userID)];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
        }
    });
}); };
exports.getUsers = getUsers;
// CHARACTER
//GET Character
var getCharacter = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var characters;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Character_1.Character).find()];
            case 1:
                characters = _a.sent();
                console.log("ruta personajes");
                return [2 /*return*/, res.json(characters)];
        }
    });
}); };
exports.getCharacter = getCharacter;
var getOneCharacter = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var characters;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Character_1.Character).findOne(req.params.id)];
            case 1:
                characters = _a.sent();
                console.log("ruta de un personajes");
                return [2 /*return*/, res.json(characters)];
        }
    });
}); };
exports.getOneCharacter = getOneCharacter;
// POST Character 
var createCharacter = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var characterRepo, character, newCharacter, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations para que ingresen todos los campos 
                if (!req.body.name)
                    throw new utils_1.Exception("Please provide a name");
                if (!req.body.height)
                    throw new utils_1.Exception("Please provide a height");
                if (!req.body.mass)
                    throw new utils_1.Exception("Please provide an mass");
                if (!req.body.hairColor)
                    throw new utils_1.Exception("Please provide a hairColor");
                if (!req.body.skinColor)
                    throw new utils_1.Exception("Please provide a skinColor");
                if (!req.body.eyeColor)
                    throw new utils_1.Exception("Please provide a eyeColor");
                if (!req.body.birthYear)
                    throw new utils_1.Exception("Please provide a birthYear");
                if (!req.body.gender)
                    throw new utils_1.Exception("Please provide a gender");
                characterRepo = typeorm_1.getRepository(Character_1.Character);
                return [4 /*yield*/, characterRepo.findOne({ where: { name: req.body.name } })]; //para que no se repitan
            case 1:
                character = _a.sent() //para que no se repitan
                ;
                if (character)
                    throw new utils_1.Exception("character already exists with this name");
                newCharacter = typeorm_1.getRepository(Character_1.Character).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Character_1.Character).save(newCharacter)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createCharacter = createCharacter;
//PLANETS
//GET Planets
var getPlanets = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planets;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).find()];
            case 1:
                planets = _a.sent();
                console.log("ruta traigo planetas");
                return [2 /*return*/, res.json(planets)];
        }
    });
}); };
exports.getPlanets = getPlanets;
//GET Planets
var getOnePlanets = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planets;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).findOne(req.params.id)];
            case 1:
                planets = _a.sent();
                console.log("ruta traigo planetas");
                return [2 /*return*/, res.json(planets)];
        }
    });
}); };
exports.getOnePlanets = getOnePlanets;
// POST Character 
var createPlanets = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planetsRepo, planets, newPlanets, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations para que ingresen todos los campos 
                if (!req.body.name)
                    throw new utils_1.Exception("Please provide a name");
                if (!req.body.diameter)
                    throw new utils_1.Exception("Please provide a diameter");
                if (!req.body.rotation)
                    throw new utils_1.Exception("Please provide an rotation");
                if (!req.body.orbital)
                    throw new utils_1.Exception("Please provide a orbital");
                if (!req.body.gravity)
                    throw new utils_1.Exception("Please provide a gravity");
                if (!req.body.population)
                    throw new utils_1.Exception("Please provide a population");
                if (!req.body.climate)
                    throw new utils_1.Exception("Please provide a climate");
                if (!req.body.terrain)
                    throw new utils_1.Exception("Please provide a terrain");
                if (!req.body.surfaceWater)
                    throw new utils_1.Exception("Please provide a surfaceWater");
                planetsRepo = typeorm_1.getRepository(Planets_1.Planets);
                return [4 /*yield*/, planetsRepo.findOne({ where: { name: req.body.name } })]; //para que no se repitan
            case 1:
                planets = _a.sent() //para que no se repitan
                ;
                if (planets)
                    throw new utils_1.Exception("character already exists with this name");
                newPlanets = typeorm_1.getRepository(Planets_1.Planets).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).save(newPlanets)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createPlanets = createPlanets;
// ADD FAVOURITE CHARACTER
var addFavCharacter = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, character, newFavourite, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user.user;
                return [4 /*yield*/, typeorm_1.getRepository(Character_1.Character).findOne(req.params.id)]; //busco en el repo los persinajes y me traigo el q coincida con el id q le estoy pasando
            case 1:
                character = _a.sent() //busco en el repo los persinajes y me traigo el q coincida con el id q le estoy pasando
                ;
                if (!character)
                    throw new utils_1.Exception("character not found"); //si el personaje no exisete devolverr msj 
                newFavourite = new FavCharacter_1.FavCharacter();
                newFavourite.users = user; // asigno valor a la "columna"
                newFavourite.character = character; // asigno valor a la "columna"
                console.log(user);
                console.log(character);
                return [4 /*yield*/, typeorm_1.getRepository(FavCharacter_1.FavCharacter).save(newFavourite)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.addFavCharacter = addFavCharacter;
// ADD FAVOURITE PLANETS
var addFavPlanets = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, planet, newFavouritePlanet, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user.user;
                return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).findOne(req.params.id)]; //busco en el repo los persinajes y me traigo el q coincida con el id q le estoy pasando
            case 1:
                planet = _a.sent() //busco en el repo los persinajes y me traigo el q coincida con el id q le estoy pasando
                ;
                if (!planet)
                    throw new utils_1.Exception("planets not found"); //si el personaje no exisete devolverr msj 
                newFavouritePlanet = new FavPlanets_1.FavPlanets();
                newFavouritePlanet.users = user; // asigno valor a la "columna"
                newFavouritePlanet.planets = planet; // asigno valor a la "columna"
                return [4 /*yield*/, typeorm_1.getRepository(FavPlanets_1.FavPlanets).save(newFavouritePlanet)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.addFavPlanets = addFavPlanets;
// get favourite character
var getFavCharacter = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user.user;
                if (!user)
                    throw new utils_1.Exception("user not found"); //si usuario no existe devolever msaje 
                return [4 /*yield*/, typeorm_1.getRepository(FavCharacter_1.FavCharacter).find({ where: { users: user }, relations: ["character"] })];
            case 1:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.getFavCharacter = getFavCharacter;
// get favourite Planets
var getFavFavPlanets = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user.user;
                if (!user)
                    throw new utils_1.Exception("user not found"); //si usuario no existe devolever msaje 
                return [4 /*yield*/, typeorm_1.getRepository(FavPlanets_1.FavPlanets).find({ where: { users: user }, relations: ["planets"] })];
            case 1:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.getFavFavPlanets = getFavFavPlanets;
//detete favorite 
var deleteFavCharacter = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userID, favouriteCharacter, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userID = req.user.user;
                return [4 /*yield*/, typeorm_1.getRepository(FavCharacter_1.FavCharacter).findOne({
                        relations: ['character'],
                        where: {
                            users: userID,
                            character: req.params.id
                        }
                    })];
            case 1:
                favouriteCharacter = _a.sent();
                if (!!favouriteCharacter) return [3 /*break*/, 2];
                return [2 /*return*/, res.json({ "messager": "El favourite not found" })];
            case 2: return [4 /*yield*/, typeorm_1.getRepository(FavCharacter_1.FavCharacter)["delete"](favouriteCharacter)];
            case 3:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
        }
    });
}); };
exports.deleteFavCharacter = deleteFavCharacter;
//detete Planets 
var deleteFavPlanets = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userID, favouritePlanets, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userID = req.user.user;
                return [4 /*yield*/, typeorm_1.getRepository(FavPlanets_1.FavPlanets).findOne({ relations: ['planets'], where: { users: userID, planets: req.params.id } })];
            case 1:
                favouritePlanets = _a.sent();
                if (!!favouritePlanets) return [3 /*break*/, 2];
                return [2 /*return*/, res.json({ "messager": "El favourite not found" })];
            case 2: return [4 /*yield*/, typeorm_1.getRepository(FavPlanets_1.FavPlanets)["delete"](favouritePlanets)];
            case 3:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
        }
    });
}); };
exports.deleteFavPlanets = deleteFavPlanets;
