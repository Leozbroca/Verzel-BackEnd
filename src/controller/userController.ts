import { Request, Response } from "express";
import { BaseDatabase } from "../data/connection";
import userBussiness from "../bussiness/userBussiness";

class UserController {
    async signup(req: Request, res: Response): Promise<void> {
        try {
          const { nome, email, senha } = req.body;
          const role = "ADMIN"
          const token:any = await userBussiness.signup(nome, email, senha, role);
    
          res.status(201).send({ message: "User created successfully!", token });
        } catch (error: any) {
          res.status(400).send({
            message: error.message,
          });
        } finally {
          await BaseDatabase.destroyConnection();
        }
      }
    
      async login(req: Request, res: Response): Promise<void> {
        try {
          const { email, senha } = req.body;
    
          const token = await userBussiness.login(email, senha);
    
          res.status(200).send({ token });
        } catch (error: any) {
          res.status(400).send({
            message: error.message,
          });
        } finally {
          await BaseDatabase.destroyConnection();
        }
      }
}

export default new UserController()