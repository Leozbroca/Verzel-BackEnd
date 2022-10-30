import { USER_ROLES, user, authenticationData } from "../types";
import authenticator from "../services/authenticator";
import hashManager from "../services/hashManager";
import dotenv from "dotenv";
import generatorId from "../services/generatorId";
import carDatabase from "../data/userData";


dotenv.config();

class CarBussiness {}

export default new CarBussiness();