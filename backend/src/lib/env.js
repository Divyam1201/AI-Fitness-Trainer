import dotenv from "dotenv"
dotenv.config()

export const ENV = {
    PORT:process.env.PORT,
    APP_ENV:process.env.APP_ENV
}