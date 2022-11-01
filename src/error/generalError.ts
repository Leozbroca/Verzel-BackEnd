import { BaseError } from "./baseError";

export class EmailExists extends BaseError {
    constructor(){
        super("This email already have an account registered" , 400);
    }
}

export class CarExists extends BaseError {
    constructor(){
        super("This car has already been created" , 400);
    }
}

export class Editing extends BaseError {
    constructor(){
        super("You can't edit this car" , 401);
    }
}

export class Deleting extends BaseError {
    constructor(){
        super("You can't delete this car" , 401);
    }
}

export class PasswordShort extends BaseError {
    constructor(){
        super("You need a stronger password, at least 6 digits" , 400);
    }
}