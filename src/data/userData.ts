import { BaseDatabase } from "./connection";
import { user } from "../types";

class UserDatabase extends BaseDatabase {
    private static TABLE_NAME = "verzel_users";

    public async signup(newUser: user): Promise<void> {
        try {
          await this.getConnection()
            .insert({
              id:newUser.id,
              nome:newUser.nome,
              email:newUser.email,
              senha:newUser.senha,
            })
            .into(UserDatabase.TABLE_NAME);
           
        } catch (error: any) {
          throw new Error(error.sqlMessage || error.message);
        }
      }

      public async login(email: string): Promise<any> {
        try {
          const user = await this.getConnection()
            .select()
            .from(UserDatabase.TABLE_NAME)
            .where({ email });
       
          return user;
        } catch (error: any) {
          throw new Error(error.sqlMessage || error.message);
        }
      }
      
      public async searchProfileByEmail(email: string): Promise<any> {
        try {
          const result = await this.getConnection()
            .select()
            .from(UserDatabase.TABLE_NAME)
            .where({ email });
    
          return result;
        } catch (error: any) {
          throw new Error(error.sqlMessage || error.message);
        }
      }

      public async searchProfileById(id: string): Promise<any> {
        try {
          const result = await this.getConnection()
            .select()
            .from(UserDatabase.TABLE_NAME)
            .where({ id });
    
          return result;
        } catch (error: any) {
          throw new Error(error.sqlMessage || error.message);
        }
      }
}

export default new UserDatabase();