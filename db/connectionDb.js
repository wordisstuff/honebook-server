import { connect } from "mongoose";

const { DB_URL } = process.env
 const connectionDB = async () => { 
    try { 
        await connect(DB_URL);
        console.log("Data Base connected!")
    }
    catch (err) {
        console.log(err);
    }
 };
export default connectionDB;