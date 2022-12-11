import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRouter from "./routes/web";
import connectDB from "./config/connectDB";
import cors from 'cors';
require('dotenv').config();

let app = express();

//Cors
// app.use(cors({ credentials: true, origin: true }));
//Or
const corsOptions = {
    origin: process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

//port
let port = process.env.PORT || 6969;

//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRouter(app);

connectDB();

app.listen(port, () => {
    //call back
    console.log("http://localhost:" + port);
})