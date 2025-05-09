import mongoose from "mongoose"

export const ConnectDB = async () => {
    try {
        const res = await mongoose.connect(process.env.DB_URL)
        console.log(res.connection.host)
        
    } catch (error) {
        console.log(`error in ConnectDB: ${error.stack}`)
    }
}