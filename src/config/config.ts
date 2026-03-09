import dotenv from "dotenv";
dotenv.config();

interface Config {
  mongourl: String;
}

console.log(process.env.MONGO_URI);
export const config: Config = {
  // console.log("dj");
  mongourl: process.env.MONGO_URI || "NA",
};
