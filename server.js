import app from "./app.js"
import connectionDb from './db/connectionDb.js'

const {PORT} = process.env

const startServer = async () => {
    
    await connectionDb()

    app.listen(PORT, () => console.log(`Server is runing on port ${PORT}`));

}

startServer();
