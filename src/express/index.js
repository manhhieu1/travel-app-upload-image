import express from "express";
import routers from "../api/routers.js";
import authCheck from "./middleware/authorization.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import cors from "cors";
import expressErrorHandler from "./middleware/error_handler.js";
import helmet from "helmet";
import config from "../config/index.js";
import compression from "compression";
import logger from "../extends/logger.js";
import fileUpload from "express-fileupload";

const app = express();

app.use(
  fileUpload({
    limits: {
      fileSize: config.FILE_SIZE,
    },
    abortOnLimit: true,
  })
);
// app.use(express.static("public"));
// app.use("/image", express.static("upload"));

const allowCors = config.ALLOW_CORS.split(",");
const corsOptions = {
  origin: allowCors,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};

app.use(cors(corsOptions));

app.use(helmet());

app.use(compression());

app.use(logger.logger);

app.get("/", (req, res) => {
  res.send("API");
});

// app.use(fileUpload());

// app.use("/static", express.static("public"));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

//invalid json
app.use((err, req, res, next) => {
  if (err.status === 400) {
    res.status(err.status).json({
      meta: {
        message: "Invalid json",
      },
    });
    return;
  }
  next();
});

//Swagger Configuration
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "BE API",
      version: "1.0.0",
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        in: "header",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  openapi: "3.0.0",
};

const option = {
  swaggerDefinition: swaggerOptions,
  apis: ["./src/api/*/router.js"],
};

const swaggerDocs = swaggerJSDoc(option);

app.use("/api", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(authCheck);

app.use("/", routers);

app.use(logger.errorLogger);

app.use(expressErrorHandler);

export default app;
