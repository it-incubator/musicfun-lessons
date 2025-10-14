import createClient, {type Middleware} from "openapi-fetch";
import type {paths} from "./schema.ts";

export const client = createClient<paths>({ baseUrl: "https://musicfun.it-incubator.app/api/1.0/" });
//export const client = createClient<paths>({ baseUrl: "http://localhost:9001/api/1.0/" });

const myMiddleware: Middleware = {
    async onRequest({ request }) {
        request.headers.set("API-KEY", "xxx");

        const encoded = btoa(`dimych:xxx`);
        const authHeader = `Basic ${encoded}`;
        request.headers.set("Authorization", authHeader);
        return request;
    }
};

client.use( myMiddleware )