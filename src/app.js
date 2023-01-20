import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js"; 


const app = express();
app.use(cors());
app.use(express.json());



// records = db.collection("records")

app.use([authRouter])




const port = 5000;
app.listen(port, () => console.log(`Server running in port: ${port}`));