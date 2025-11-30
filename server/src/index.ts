import express from 'express';
import * as env from 'dotenv';
import { StatusCodes } from 'http-status-codes';
import cors from 'cors';
import swaggerUi from "swagger-ui-express";
import swaggerJson from "./swagger/swagger.json" with { type: "json" };
import { ErrorHandler } from './ui/middlewares/ErrorHandler.js';
import { mainRouter } from './ui/routes/mainRouter.js';

// import for swagger
import { VenueController } from './ui/controllers/VenueController.js';


async function bootstrap(prefix: string) {
  // init env
  env.config();

  console.log(`NODE_ENV = ${process.env.NODE_ENV}`);

  // init database
  await initDatabase();
  console.log('Database initialized');

  if (process.env.NODE_ENV === 'production') {
    // Init things that is for production only
  }

  const PORT = process.env.PORT || 3000;
  const app = express();


  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup({
      ...swaggerJson,
      info: {
        title: "Retreat API Documentation",
        version: "1.0.0",
        description:
          "Retreat API Documentation",
      },
      servers: [
        {
          url: process.env.SWAGGER_URL,
        },
      ],
    }, { explorer: true })
  );

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  app.use(`/${prefix}`, mainRouter);

  app.use((req, res) => {
    res.status(StatusCodes.NOT_FOUND).send('Endpoint Not Found');
  });

  app.use(ErrorHandler.handle);
  
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

const initDatabase = async () => {
  if (process.env.NODE_ENV === 'production') {
    // DBService.initialize({
    //   connectionString: String(process.env.POSTGRES_DB_CONNECTION_STRING_PRODUCTION),
    // });
  } else {
    console.log("TEST INIT DATABASE");
    // DBService.initialize({
    //   connectionString: String(process.env.POSTGRES_DB_CONNECTION_STRING),
    // });
  }
}

bootstrap('v1');