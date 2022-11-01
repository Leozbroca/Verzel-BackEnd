import app from "./app";
import userController from "./controller/userController"
import carController from "./controller/carController"

// Requisições usuário
app.post("/signup", userController.signup)
app.post("/login", userController.login)

//Requisições carros
app.post("/signupCar", carController.signupCar)
app.put("/editCar/:id", carController.editCar)
app.get("/allcars", carController.getAllCars)
app.get("/getMyCars", carController.getCarsByUser)
app.delete("/deleteCar/:id", carController.deleteCar)