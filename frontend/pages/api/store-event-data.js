import {Web3Storage, File, getFilesFromPath } from "web3.storage"
const {resolve} = require ("path")

export default async function handler(req, res){
    if (req.method === "POST") {
        return await storeEventData(req, res)
    }else {
        return res.status(405).json({ message: "method not allowed", success: false})
    }
}

async function storeEventData(req, res){
    const body = req.body;
    try{
        const files = await makeFileObjects(body)
        const cid = await storeFiles(files)
        return res.status(200).json({success: true, cid, files, body})
    }catch(error){
        console.log('🚀 ~ file: store-event-data.js:17 ~ storeEventData ~ error', error)
        return res.status(500).json({ message: "error creating event", success: false})
    }
}

async function storeFiles(files){
    const client =  makeStorageClient()
    const cid = await client.put(files)
    return cid
}

async function makeFileObjects(body){
    const buffer = Buffer.from(JSON.stringify(body))

    const imageDirectory = resolve(process.cwd(), `public/images/${body.image}`)
    const files = await getFilesFromPath(imageDirectory)

    files.push(new File([buffer], "data.json"))
    return files;
}


function makeStorageClient(){
    return new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN})
}
