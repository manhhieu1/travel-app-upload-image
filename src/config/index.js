import dotenv from "dotenv";
import Joi from "joi";

dotenv.config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  JWT_SECRET: Joi.string().required(),
  FILE_SIZE: Joi.number().required(),
  END_POINT: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_USER_NAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_PORT: Joi.string().required(),
  DB_TIMEZONE: Joi.string().required(),
  COMPRESS_FILE_SIZE: Joi.number().required(),
})
  .unknown()
  .required();

const { error, value: config } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default config;
