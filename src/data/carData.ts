import { BaseDatabase } from "./connection";
import { car } from "../types";

class CarDatabase extends BaseDatabase {
    private static TABLE_NAME = "verzel_cars";

}

export default new CarDatabase();