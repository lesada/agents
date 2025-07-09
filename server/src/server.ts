import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastify from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "./env.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
	origin: "http://localhost:5173",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: "Agents Server API",
			description: "API documentation for the Agents NLW server",
			version: "1.0.0",
		},
	},
});

app.get("/health", () => {
	return { message: "Ok" };
});

app.listen({ port: env.PORT }, () => {
	console.log(`Server listening at http://localhost:${env.PORT} 🚀`);
});
