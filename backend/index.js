import Express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import administrator_router from "./routes/administrator.js";
import seeker_router from './routes/seekers.js'
import provider_router from "./routes/providers.js";
import company_router from "./routes/company.js";
import job_router from "./routes/jobs.js";
import notification_router from "./routes/notiification.js";

const server = Express();
const PORT = process.env.PORT || 3333;
const uri = "mongodb://localhost:27017/red_tie";

server.use(cors({ origin: "http://localhost:3000", credentials: true }));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());
server.use("/administrator", administrator_router);
server.use("/seekers", seeker_router);
server.use("/providers", provider_router);
server.use("/company", company_router);
server.use("/job", job_router);
server.use("/notifications", notification_router)

mongoose
  .connect(uri)
  .then(() => console.log("successfully connected to database"))
  .catch(() => console.log("Error connecting to database"));

server.listen(PORT, () => {
  console.log("Server active on port:3333");
});
