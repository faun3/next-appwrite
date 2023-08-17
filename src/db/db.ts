import mongoose from "mongoose";

export async function connect() {
  try {
    if (!process.env.MONGO_URL) {
      console.error("you forgot your .env MONGO key idiot");
      console.error("you forgot your .env MONGO key idiot");
    } else {
      mongoose.connect(process.env.MONGO_URL);
      const connection = mongoose.connection;

      connection.on("connected", () => {
        console.log("connected to mongodb");
      });

      connection.on("error", (err) => {
        console.error(
          "mongodb connection error -- make sure your stuff is set up right"
        );
        console.error(err);
        process.exit();
      });
    }
  } catch (err) {
    console.log("something bad", err);
  }
}
