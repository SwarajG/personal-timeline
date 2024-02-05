import express, { Express, Request, Response } from 'express';
import 'dotenv/config'
import { test } from 'utils/index';

const app: Express = express();
const port = process.env.PORT || 3000;

console.log('process.env: ', process.env.PORT);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});