import { car, authenticationData } from "../types";
import authenticator from "../services/authenticator";
import hashManager from "../services/hashManager";
import dotenv from "dotenv";
import generatorId from "../services/generatorId";
import carDatabase from "../data/carData";
import userDatabase from "../data/userData";
import { MissingToken, InvalidToken } from "../error/missingToken";
import { MissingFields } from "../error/missingFields";
import { InvalidCredentials, InvalidEmail } from "../error/invalidCredentials";
import {
  UserNotFound,
  EmailNotFound,
  UsersNotFound,
  CarNotFound,
  CarsNotFound,
} from "../error/notFound";
import { EmailExists, PasswordShort } from "../error/generalError";

dotenv.config();

class CarBussiness {
  async signupCar(nome:string, marca: string, modelo: string, ano:number, foto: string, token: string) {
    if (!marca || !modelo || !ano || !nome) {
      throw new MissingFields();
    }

    if (!token) {
      throw new MissingToken();
    }

    const authenticationData = authenticator.getTokenData(token);

    if (!authenticationData.id) {
      throw new InvalidToken();
    } else {
      const [user] = await userDatabase.searchProfileById(authenticationData.id);
      const id = user.id
   
      const newCar: car = {
        nome,
        id,
        marca,
        modelo,
        ano,
        foto,
      };

      await carDatabase.signupCar(newCar);
      return "Car offer created successfully!";
    } 

        
    

    // const user = await carDatabase.searchProfileByEmail(email);
    // if (user[0]) {
    //   throw new EmailExists();
    // }
  }

  async deleteCar(token: string, id: number) {
    if (!token) {
      throw new MissingToken();
    }

    const authenticationData = authenticator.getTokenData(token);
    if (!authenticationData) {
      throw new InvalidToken();
    }

    const [car] = await carDatabase.searchCarById(id);
    if (!car) {
      throw new CarNotFound();
    }

    await carDatabase.deleteCar(id);

    return "Car deleted successfully!";
  }

  async editCar(
    token: string,
    id: number,
    nome: string,
    modelo: string,
    marca: string,
    ano:number,
    foto: string
  ) {
    if (!token) {
      throw new MissingToken();
    }

    const authenticationData = authenticator.getTokenData(token);
    if (!authenticationData) {
      throw new InvalidToken();
    }

    const [car] = await carDatabase.searchCarById(id);
    if (!car) {
      throw new CarNotFound();
    }

    if (!modelo) {
      const modelo = car.modelo
    }
    if (!marca) {
        const marca = car.marca
      }
      if (!ano) {
        const ano = car.ano
      }
      if (!foto) {
        const foto = car.foto
      }

    await carDatabase.editCar(id, nome, modelo, marca, ano, foto);
    return "Car edited successfully!";
  }

  async getAllCars() {
    const cars = await carDatabase.getAllCars();
    if (!cars) {
      throw new CarsNotFound();
    }

    return cars;
  }

  async getCarsByUser(id:string) {
    const cars = await carDatabase.getCarsByUser(id);
    if (!cars) {
      throw new CarsNotFound();
    }

    return cars;
  }
}

export default new CarBussiness();
