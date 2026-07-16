import app from "./src/app/index.js";
import { ENV } from "./src/lib/env.js";


app.listen(ENV.PORT,()=>{
    console.log("server is running on ",ENV.PORT)
})