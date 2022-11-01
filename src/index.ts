import app from "./app";
import userController from "./controller/userController"
import carController from "./controller/carController"

app.post("/signup", userController.signup)
app.post("/login", userController.login)

app.post("/signupCar", carController.signupCar)
app.put("/editCar/:id", carController.editCar)
app.delete("/deleteCar/:id", carController.deleteCar)
app.get("/allcars", carController.getAllCars)
app.get("/getMyCars", carController.getCarsByUser)