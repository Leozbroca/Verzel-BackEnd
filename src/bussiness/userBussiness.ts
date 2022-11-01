import { user, authenticationData } from "../types";
import authenticator from "../services/authenticator";
import hashManager from "../services/hashManager";
import dotenv from "dotenv";
import generatorId from "../services/generatorId";
import userDatabase from "../data/userData";
import { MissingToken } from "../error/missingToken";
import { MissingFields } from "../error/missingFields";
import { InvalidCredentials, InvalidEmail } from "../error/invalidCredentials";
import { UserNotFound, EmailNotFound , UsersNotFound} from "../error/notFound";
import { EmailExists, PasswordShort } from "../error/generalError";

dotenv.config();

class UserBussiness {
  async signup(nome: string, email: string, senha: string, role:string) {
    if (!nome || !email || !senha) {
      throw new MissingFields();
    }

    const verification = /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/;
    const ok = verification.exec(email);

    if (!ok) {
      throw new InvalidEmail();
    }

    if (senha.length < 6) { 
      throw new PasswordShort();
    }

    const user = await userDatabase.searchProfileByEmail(email);
    if (user[0]) {
      throw new EmailExists();
    }

    const id: string = generatorId.generatedId();

    const cypherPassword: string = hashManager.createHash(senha);

    const newUser: user = {
      id,
      nome,
      email,
      senha: cypherPassword,
    };

    await userDatabase.signup(newUser);

    const token = authenticator.generateToken({ id, role });


    return token;
  }

  async login(email: string, senha: string) {
    if (!email || !senha) {
      throw new MissingFields();
    }

    const [user] = await userDatabase.login(email);

    const passwordIsCorrect: boolean =
      user && hashManager.compareHash(senha, user.senha);

    if (!user || !passwordIsCorrect) {
      throw new InvalidCredentials();
    }

    const token = authenticator.generateToken({
      id: user.id,
      role: user.role
    });

    return token;
  }
}

export default new UserBussiness();
