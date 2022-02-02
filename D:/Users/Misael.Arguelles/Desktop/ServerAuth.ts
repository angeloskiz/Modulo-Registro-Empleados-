import AppAuth from "./appAuthe";
import dotenv from "dotenv";
dotenv.config();
import AuthController from "./Controllers/AuthController";

const appAuth = new AppAuth([new AuthController()],Number(process.env.SERVER_PORT_Auth));

appAuth.listenn();