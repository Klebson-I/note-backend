import {ObjectId} from "mongodb";

export interface NoteEntity {
    _id?:ObjectId;
    title:string;
    text:string;
}

export type NoteResponse = Omit<NoteEntity, "_id">

export interface NoteEntityResponse extends NoteResponse {
    _id:string;
}