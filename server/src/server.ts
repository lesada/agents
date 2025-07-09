import fastifyCors from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import fastify from "fastify";
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { env } from "./env.ts";
import { createRoomRoute } from "./http/routes/create-room.ts";
import { getRoomsRoute } from "./http/routes/get-rooms.ts";

const app = fastify();

app.register(fastifyCors, {
	origin: "*",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: "Agents API",
			description:
				"API for managing rooms and questions in the Agents application.",
			version: "1.0.0",
		},
	},
	transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
	routePrefix: "/docs",
});

app.get("/health", () => {
	return { message: "Ok" };
});

app.register(getRoomsRoute);
app.register(createRoomRoute);

app.listen({ port: env.PORT }, () => {
	// biome-ignore lint/suspicious/noConsole: only used in dev
	console.log(`Server listening at http://localhost:${env.PORT} 🚀`);
});
