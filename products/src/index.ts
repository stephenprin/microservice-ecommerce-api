import express from 'express';
import { PORT } from './config/index';
import { databaseConnection } from './database';
import { expressApp } from './express-app';





const startServer = async () => { 
    const app = express();
   
    await expressApp(app);
    await databaseConnection();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`)).on('error', (error) => {
        console.log(error, ":Error starting server")
        process.exit(1)
    });
  
}
startServer();