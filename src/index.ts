import 'dotenv/config';
import app from './app';
import { AppDataSource } from "@database/data-source";

AppDataSource.initialize().then(async () => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });

}).catch(error => console.log(error))
