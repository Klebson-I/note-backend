import {Collection, MongoClient, MongoClientOptions} from "mongodb";


const client = new MongoClient("mongodb+srv://lukaszkleba:direstraits99@cluster0.xerdy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
        useNewUrlParser:true
} as MongoClientOptions)

export const getCollection = async ():Promise<[Collection,MongoClient]> => {
    await client.connect();
    const collection= await client.db("note").collection("note");
    return [collection,client];
}

// mongodb+srv://lukaszkleba:direstraits99@cluster0.xerdy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority