import { env } from "./env";
import { app } from "./app";

//npm i tsup -D - usado para compilar o projeto para produção, converter o código typescript para javascript

app.listen({ port: env.PORT }).then(() => {
    console.log(`Server is running on port ${env.PORT}`);
});

