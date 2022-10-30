import { BaseDatabase } from "./connection";
import { user } from "../types";

class UserDatabase extends BaseDatabase {
    private static TABLE_NAME = "verzel_users";

}

export default new UserDatabase();