import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { createServer } from "http";
import { handleSockets } from "./socket/index.js";
import path from "path";
import { fileURLToPath } from "url";
import createHttpError from "http-errors";
import roomsRouter from "./api/rooms/roomRoutes.js";
import journalRoutes from "./api/journal/journalRoutes.js";
import usersRouter from "./api/users/userRoutes.js";
import { badRequestHandler, genericErrorHandler, notFoundHandler } from "./errorHandlers.js";
import aiRoutes from "./api/ai/aiRoutes.js";
import blockRoutesTest from "./api/blockChain/blockRoutesTest.js";
import blockchainRoutes from "./api/blockChain/blockRoutes.js";

const expressServer = express();
const port = process.env.PORT || 3009;

// ************************************ SOCKET.IO ********************************
const httpServer = createServer(expressServer);
const io = new Server(httpServer);

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

const { FE_DEV_URL, FE_PROD_URL } = process.env;
const whitelist = [FE_DEV_URL, FE_PROD_URL];
const corsOpts = {
  origin: (origin, corsNext) => {
    console.log("CURRENT ORIGIN: ", origin);
    if (!origin || whitelist.indexOf(origin) !== -1) {
      corsNext(null, true);
    } else {
      corsNext(createHttpError(400, `Origin ${origin} is not in the whitelist!`));
    }
  },
};

// ******************************* MIDDLEWARES ****************************************

expressServer.use(cors(corsOpts));
expressServer.use(express.json());

// ******************************** ENDPOINTS *****************************************
expressServer.use("/rooms", roomsRouter);
expressServer.use("/journals", journalRoutes);
expressServer.use("/users", usersRouter);
expressServer.use("/api", aiRoutes);
expressServer.use("/blocks", blockRoutesTest);
expressServer.use("/blockchain", blockchainRoutes);
// ***************************** ERROR HANDLERS ***************************************
expressServer.use(badRequestHandler);
expressServer.use(notFoundHandler);
expressServer.use(genericErrorHandler);

const mongooseURL = process.env.MONGO_URL;

mongoose.connect(mongooseURL);
mongoose.connection.on("connected", () => {
  httpServer.listen(port, () => {
    console.table(listEndpoints(expressServer));
    console.log(`Server is running on port ${port}`);
  });
});
