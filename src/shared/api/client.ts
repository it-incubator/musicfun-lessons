import createClient, {type Middleware} from "openapi-fetch";
import type {paths} from "./schema.ts";

export const client = createClient<paths>({ baseUrl: "https://musicfun.it-incubator.app/api/1.0/" });

const myMiddleware: Middleware = {
    async onRequest({ request }) {
        request.headers.set("API-KEY", "64892ed0-0b57-4593-8bd3-2831b3352ea1");
        return request;
    }
};


client.use( myMiddleware )