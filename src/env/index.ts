import 'dotenv/config'
import { z } from 'zod'


const envSchema = z.object({
    DATABASE_URL: z.string(),
})


//parse: transforma o process.env em um objeto
const env = envSchema.parse(process.env)

