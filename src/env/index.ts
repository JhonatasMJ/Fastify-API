import {config} from "dotenv";
import { z } from "zod";

//Verifica se o NODE_ENV é test, se for, carrega o arquivo .env.test, se não, carrega o arquivo .env
if(process.env.NODE_ENV === "test") {
  config({
    path: ".env.test",
  });
} else {
  config({
    path: ".env",
  });
}


const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("production"),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333),
});

//parse: transforma o process.env em um objeto
const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("Variáveis de ambiente inválidas", _env.error.format());

  throw new Error("Variáveis de ambiente inválidas");
}


export const env = _env.data;