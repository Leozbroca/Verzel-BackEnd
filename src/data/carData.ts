import { BaseDatabase } from "./connection";
import { car } from "../types";

class CarDatabase extends BaseDatabase {
    private static TABLE_NAME = "verzel_cars";

    public async signupCar(newCar: car): Promise<void> {
        try {
            console.log(newCar)
          await this.getConnection()
            .insert({
              nome:newCar.nome,
              id_seller:newCar.id,
              marca:newCar.marca,
              modelo:newCar.modelo,
              ano:newCar.ano,
              foto:newCar.foto,
            })
            .into(CarDatabase.TABLE_NAME);
        } catch (error: any) {
          throw new Error(error.sqlMessage || error.message);
        }
      }

      public async deleteCar(id: number): Promise<void> {
        try {
          await this.getConnection()
            .del()
            .from(CarDatabase.TABLE_NAME)
            .where({ id });
        } catch (error: any) {
          throw new Error(error.sqlMessage || error.message);
        }
      }

      public async editCar(
        id: number,
        nome: string,
        modelo: string,
        marca: string,
        ano:number,
        foto: string
      ): Promise<void> {
        try {
          await this.getConnection()
            .update({
              nome: nome,
              modelo: modelo,
              marca: marca,
              ano: ano,
              foto: foto
            })
            .from(CarDatabase.TABLE_NAME)
            .where({ id });
        } catch (error: any) {
          throw new Error(error.sqlMessage || error.message);
        }
      }

      public async getAllCars(): Promise<any> {
        try {
          const result = await this.getConnection()
            .select()
            .from(CarDatabase.TABLE_NAME)
          return result;
        } catch (error: any) {
          throw new Error(error.sqlMessage || error.message);
        }
      }

      public async searchCarById(id: number): Promise<any> {
        try {
          const result = await this.getConnection()
            .select()
            .from(CarDatabase.TABLE_NAME)
            .where({ id });
    
          return result;
        } catch (error: any) {
          throw new Error(error.sqlMessage || error.message);
        }
      }

      public async getCarsByUser(id: string): Promise<any> {
        try {
          const result = await this.getConnection()
            .select()
            .from(CarDatabase.TABLE_NAME)
            .where({ id_seller: id });
    
          return result;
        } catch (error: any) {
          throw new Error(error.sqlMessage || error.message);
        }
      }
    
    
    

}

export default new CarDatabase();