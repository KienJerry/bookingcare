import express from "express";

//arrow ffc
let configviewEngine = (app) => {
    app.use(express.static("./src/public"))
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
}

module.exports = configviewEngine;