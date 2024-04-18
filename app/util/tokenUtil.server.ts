import { createClient, type RedisClientType } from "redis";
import { refreshToken } from "~/util/refreshtoken.server";
import process from "node:process";

let client: RedisClientType;

if (process.env.NODE_ENV === "production") {
	client = createClient({
    url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  });
} else {
	client = createClient();
}

export async function getToken() {
	let token = await client.get("access_token");
	if (!token) {
		await refreshToken();
		token = await client.get("access_token");
	}
	console.log("Getting token");
	return token ?? "";
}

export async function setToken(token: string) {
	return client.set("access_token", token);
}
