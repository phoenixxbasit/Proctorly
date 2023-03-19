import mongoose from "mongoose";
import getMAC from 'getmac'

export default async function connect(){
    await mongoose.connect(process.env.ATLAS_CRE)
    console.log("Database Connected")
    console.log(`The Mac Address Of Client Is ${getMAC()}`)
}