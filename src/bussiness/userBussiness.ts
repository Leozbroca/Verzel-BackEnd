import { USER_ROLES, user, authenticationData } from "../types";
import authenticator from "../services/authenticator";
import hashManager from "../services/hashManager";
import dotenv from "dotenv";
import generatorId from "../services/generatorId";
import userDatabase from "../data/userData";


dotenv.config();

class UserBussiness {}

export default new UserBussiness();