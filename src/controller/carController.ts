import { Request, Response } from "express";
import { BaseDatabase } from "../data/connection";
import carBussiness from "../bussiness/carBussiness";

class CarController {
  async signupCar(req: Request, res: Response): Promise<void> {
    try {
        const token = req.headers.authorization as string;
      const {nome, marca, modelo, ano, foto } = req.body;
      const message:any = await carBussiness.signupCar(nome, marca, modelo, ano, foto, token);

      res.status(201).send({ message });
    } catch (error: any) {
      res.status(400).send({
        message: error.message,
      });
    } finally {
      await BaseDatabase.destroyConnection();
    }
  }

  async deleteCar(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization as string;

      const id = Number(req.params.id)

      const message = await carBussiness.deleteCar(token, id);

      res.status(200).send({ message });
    } catch (error: any) {
      res.status(400).send({
        message: error.message,
      });
    } finally {
      await BaseDatabase.destroyConnection();
    }
  }

  async editCar(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization as string;
      const id = Number(req.params.id);
      const { nome, modelo, marca, ano, foto } = req.body;

      const message = await carBussiness.editCar(
        token,
        id,
        nome,
        marca,
        modelo,
        ano,
        foto
      );

      res.status(200).send({ message });
    } catch (error: any) {
      res.status(400).send({
        message: error.message,
      });
    } finally {
      await BaseDatabase.destroyConnection();
    }
  }

  async getAllCars(req: Request, res: Response): Promise<void> {
    try {
        
      const result = await carBussiness.getAllCars();
      
      res.status(200).send({ result });
    } catch (error: any) {
      res.status(400).send({
        message: error.message,
      });
    } finally {
      await BaseDatabase.destroyConnection();
    }
  }

  async getCarsByUser(req: Request, res: Response): Promise<void> {
    try {
        const { email } = req.body;
      const result = await carBussiness.getCarsByUser(email);
      
      res.status(200).send({ result });
    } catch (error: any) {
      res.status(400).send({
        message: error.message,
      });
    } finally {
      await BaseDatabase.destroyConnection();
    }
  }

  
}

export default new CarController();
