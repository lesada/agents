import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod/v4";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";

export const getRoomsRoute: FastifyPluginCallbackZod = (app) => {
	app.get(
		"/rooms",
		{
			schema: {
				response: {
					200: z.array(
						z.object({
							id: z.string(),
							name: z.string(),
						}),
					),
				},
				tags: ["Rooms"],
				description: "Get all rooms",
			},
		},
		async () => {
			const results = await db
				.select({
					id: schema.rooms.id,
					name: schema.rooms.name,
				})
				.from(schema.rooms)
				.orderBy(schema.rooms.createdAt);

			return results;
		},
	);
};
