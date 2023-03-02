import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { createServer } from "http"; // CORE MODULE
import { handleSockets } from "./socket/index.js";
import path from "path";
import { fileURLToPath } from "url";
import roomsRouter from "./api/rooms/roomRoutes.js";
import journalRoutes from "./api/journal/journalRoutes.js";
import usersRouter from "./api/users/userRoutes.js";
import { badRequestHandler, genericErrorHandler, notFoundHandler } from "./errorHandlers.js";

const expressServer = express();
const port = process.env.PORT || 3009;

// ************************************ SOCKET.IO ********************************
const httpServer = createServer(expressServer);
const io = new Server(httpServer);
// this constructor is expecting to receive an HTTP-SERVER as parameter not an EXPRESS SERVER!!!

const _filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(_filename);

io.on("connection", handleSockets);

expressServer.get("/", (req, res) => {
  try {
    res.sendFile(__dirname + "/");
  } catch (error) {
    console.log(error);
    next(error);
  }
});
// "connection" is NOT a custom event! This is a socket.io event, triggered every time a new client connects!

// ******************************* ENDPOINT TEST **************************************
/*
in your example, the main difference between 
res.send({ message: "Testing the socket project" })
and res.json({ message: "Testing the socket project" });
is that the former can send various types of data, 
whereas the latter is specifically used to send JSON data.
*/
// expressServer.get("/", (req, res, next) => {
//   try {
//     // res.send({ message: "Testing the socket project" });
//     res.json({ message: "Testing the socket project" });
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// });

// ******************************* MIDDLEWARES ****************************************
expressServer.use(cors());
expressServer.use(express.json());

// ******************************** ENDPOINTS *****************************************
expressServer.use("/rooms", roomsRouter);
expressServer.use("/journals", journalRoutes);
expressServer.use("/users", usersRouter);

// ***************************** ERROR HANDLERS ***************************************
expressServer.use(badRequestHandler);
expressServer.use(notFoundHandler);
expressServer.use(genericErrorHandler);

const mongooseURL = process.env.MONGO_URL;

mongoose.connect(mongooseURL);
mongoose.connection.on("connected", () => {
  httpServer.listen(port, () => {
    // DO NOT FORGET TO LISTEN WITH HTTPSERVER HERE, NOT EXPRESS SERVER!!
    console.table(listEndpoints(expressServer));
    console.log(`Server is running on port ${port}`);
  });
});
