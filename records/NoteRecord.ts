import {NoteEntity} from "../utils/types";
import {FindCursor, ObjectId, WithId} from "mongodb";
import {getCollection} from "../utils/connection";



export class NoteRecord{
    _id?:ObjectId;
    title:string;
    text:string;

    constructor({_id,title,text}:NoteEntity) {
        this._id=_id??new ObjectId();
        this.title=title;
        this.text=text;
    }

    async insert () {
        const [collection,client]=await getCollection();

        try{
            await collection.insertOne({
                _id:this._id,
                title:this.title,
                text:this.text
            } as NoteEntity)
        }
        catch (e) {
            console.log(e);
        }
    }

    async delete () {
        const [collection,client] = await getCollection();
        try{
            await collection.deleteOne({
                _id:new ObjectId(this._id)
            })
        }
        catch (e) {
            console.log(e);
        }
    }

    async update ():Promise<void> {
        const [collection,client] = await getCollection();
        try{
            await collection.updateOne({
                _id:new ObjectId(this._id)
            },{
                $set : {
                    title:this.title,
                    text:this.text
                }
            })
        }
        catch (e) {
            console.log(e);
        }
    }

    static async getOne (id:string):Promise<NoteRecord|null> {
        const [collection,client] = await getCollection();
        try{
            const note=await collection.findOne({
                _id:new ObjectId(`${id}`)
            }) as WithId<NoteEntity>
            return new NoteRecord(note);
        }
        catch (e) {
            console.log(e);
        }
    }

    static async getAll ():Promise<NoteEntity[]> {
        const [collection,client] = await getCollection();
        try{
            return await (await collection.find() as FindCursor<WithId<NoteEntity>>).toArray();
        }
        catch (e) {
            console.log(e);
        }
    }
}