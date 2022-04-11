import * as express from "express";
import {noteRouter} from "./routes/noteRouter";
import {NoteRecord} from "./records/NoteRecord";
import * as cors from "cors";

const app=express();

app.use(cors({
    origin:'http://localhost:3000'
}));


app.use(express.json());
app.get("/",(req,res)=>{
    res.redirect("/note");
})
app.use("/note",noteRouter);



app.listen(process.env.PORT,()=>{
    console.log("App is running on http://localhost:3001");
})