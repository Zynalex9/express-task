import connectDB from "./db/index.js";
import { app } from "./app.js";
connectDB();
const port = process.env.PORT;
app.get("/", (req, res) => {
  res.send("hellow");
});
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
