import {Request, Response, Router} from "express";
import {NoteRecord} from "../records/NoteRecord";
import {NoteEntity, NoteEntityResponse, NoteResponse} from "../utils/types";

export const noteRouter = Router();

noteRouter
    .get("/",async (req:Request, res:Response) => {
        const data=await NoteRecord.getAll();
        console.log(data);
        res.json(data);
    })
    .get("/:id",async (req:Request,res:Response)=>{
        const data=await NoteRecord.getOne(req.params.id);
        res.json(data);
    })
    .post("/",async(req:Request,res:Response)=>{
        console.log("Posting...")
        const resp : NoteResponse = req.body;
        const note = new NoteRecord(resp);
        await note.insert();
        res.status(200).send("OK");
    })
    .put("/",async(req:Request,res:Response)=>{
        const resp : NoteEntityResponse = req.body;
        const note = await NoteRecord.getOne(resp._id);
        note.title=resp.title;
        note.text=resp.text;
        await note.update();
        res.status(200).send("OK");
    })
    .delete("/",async(req:Request,res:Response)=>{
        const {_id} = req.body;
        console.log(_id);
        const note = await NoteRecord.getOne(_id);
        await note.delete();
        res.status(200).send("OK");
    })