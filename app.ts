import * as express from "express";
import {noteRouter} from "./routes/noteRouter";
import {NoteRecord} from "./records/NoteRecord";
import * as cors from "cors";

const app=express();

app.use(cors({
    origin:'http://localhost:3000'
}));

(async()=>{
    const data= await NoteRecord.getAll();
    console.log(data);
})();

app.use(express.json());
app.use("/note",noteRouter);



app.listen(3001,()=>{
    console.log("App is running on http://localhost:3001");
})