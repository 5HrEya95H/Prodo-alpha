import app from "./app.js";
import connectDB from "./db/index.js";


try {
  connectDB();
  app.listen(3000, () => {
    console.log("server is listening on: ", "3000");
  });
} catch (error) {
  console.error("Error connecting to MongoDB", error);
}
